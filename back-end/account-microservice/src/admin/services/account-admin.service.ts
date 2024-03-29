import {Injectable, Logger} from '@nestjs/common';
import {EntityManager, Like, Repository} from 'typeorm';
import {InjectEntityManager, InjectRepository} from '@nestjs/typeorm';
import {AdminUser} from '../entities/admin-user.entity';
import {PaginationMeta, TcpPaginationRequest, TcpPaginationResponse,} from '@birdgang/lib-common';
import {isEmpty, isNotEmpty} from 'class-validator';
import {AdminUserDetailResponseDto} from '../dto/admin-user-detail-response.dto';
import {AdminRoleService} from '../../system/role/services/admin-role.service';
import {RoleService} from '../../system/role/services/role.service';
import {AdminRole} from '../../system/role/entities/admin-role.entity';
import {Role} from '../../system/role/entities/role.entity';
import {MenuRolePermission} from '../../system/role/entities/menu-role-permisstion.entity';
import {Menu} from '../../system/role/entities/menu.entity';
import {AdminUserFiltersParameter} from "../../enum/account.parameter";

@Injectable()
export class AccountAdminService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
    private readonly adminRoleService: AdminRoleService,
    private readonly roleService: RoleService,
  ) {}

  private readonly logger = new Logger(AccountAdminService.name);

  findById(id: number): Promise<AdminUser> {
    return this.adminUserRepository.findOneBy({ id: id });
  }

  findByUsername(username: string): Promise<AdminUser> {
    return this.adminUserRepository.findOne({ where: { username } });
  }

  findByEmail(email: string): Promise<AdminUser> {
    return this.adminUserRepository.findOne({ where: { email } });
  }

  async findListByFilters(
    request: TcpPaginationRequest<AdminUserFiltersParameter>,
  ): Promise<TcpPaginationResponse<AdminUser[]>> {
    const orWhere = [];
    if (isNotEmpty(request.data.email)) {
      orWhere.push({ email: Like(`%${request.data.email}%`) });
    }
    if (isNotEmpty(request.data.fullName)) {
      orWhere.push({ fullName: Like(`%${request.data.fullName}%`) });
    }

    if (isEmpty(orWhere)) {
      const [adminUserList, total] =
        await this.adminUserRepository.findAndCount({
          take: request.pagination.offset,
          skip: (request.pagination.page - 1) * request.pagination.offset,
        });
      return TcpPaginationResponse.from<AdminUser[]>(
        adminUserList,
        PaginationMeta.from(
          total,
          request.pagination.page,
          Math.ceil(total / request.pagination.offset),
        ),
      );
    } else {
      const [adminUserList, total] =
        await this.adminUserRepository.findAndCount({
          where: orWhere,
          take: request.pagination.offset,
          skip: (request.pagination.page - 1) * request.pagination.offset,
        });
      return TcpPaginationResponse.from<AdminUser[]>(
        adminUserList,
        PaginationMeta.from(
          total,
          request.pagination.page,
          Math.ceil(total / request.pagination.offset),
        ),
      );
    }
  }

  async findAdminUserDetailById(id: number) {
    const adminUser = await this.findById(id);
    const roleList = await this.adminRoleService.findRolesByAdminUserId(
      adminUser.id,
    );
    return AdminUserDetailResponseDto.from(adminUser, roleList);
  }

  async findAdminInfoById(id: number) {
    const query = await this.entityManager
      .createQueryBuilder(AdminUser, 'au')
      .leftJoinAndSelect(AdminRole, 'ar', 'ar.admin_user_id = au.id')
      .select('au.id', 'id')
      .addSelect('au.username', 'username')
      .addSelect('au.company_id', 'company_id')
      .addSelect('au.email', 'email')
      .addSelect('au.email_verified', 'emailVerified')
      .addSelect('au.phone_number', 'phoneNumber')
      .addSelect('au.phone_verified', 'phoneVerified')
      .addSelect('au.full_name', 'fullName')
      .addSelect((subQuery) => {
        return subQuery
          .select(
            "GROUP_CONCAT(DISTINCT role.id, ',', role.name, ',', role.description SEPARATOR ';')",
            'roleList',
          )
          .from(Role, 'role')
          .where('role.id = ar.role_id');
      }, 'roleList')
      .where('au.id = :id', { id: id })
      .getRawMany();
    const combinedResults = query.reduce((accumulator, current) => {
      if (!accumulator.id) {
        accumulator.id = current.id;
        accumulator.username = current.username;
        accumulator.email = current.email;
        accumulator.company_id = current.company_id;
        accumulator.emailVerified = current.emailVerified;
        accumulator.phoneNumber = current.phoneNumber;
        accumulator.phoneVerified = current.phoneVerified;
        accumulator.fullName = current.fullName;
        accumulator.roleList = [];
        accumulator.menuRolePermissions = [];
      }

      if (current.roleList) {
        const roles = current.roleList.split(';').map((role) => {
          const [id, name, description] = role.split(',');
          return { id, name, description };
        });
        accumulator.roleList = [...accumulator.roleList, ...roles];
      }
      return accumulator;
    }, {});

    const menuRolePermissions = await this.entityManager
      .createQueryBuilder(MenuRolePermission, 'mrp')
      .leftJoinAndSelect(Menu, 'menu', 'menu.id = mrp.menu_id')
      .select('mrp.id', 'id')
      .addSelect('mrp.menu_id', 'menuId')
      .addSelect('mrp.role_id', 'roleId')
      .addSelect('mrp.permission_ids', 'permissionIds')
      .addSelect('menu.code', 'code')
      .addSelect('menu.parent_id', 'parentId')
      .addSelect('menu.sort', 'sort')
      .addSelect('menu.url', 'url')
      .where('mrp.role_id = :roleId', {
        roleId: combinedResults.roleList[0].id,
      })
      .getRawMany();

    combinedResults.menuRolePermissions = menuRolePermissions;

    return combinedResults;
  }

  async findAdminUserDetailsByFilters(
    request: TcpPaginationRequest<AdminUserFiltersParameter>,
  ): Promise<TcpPaginationResponse<AdminUserDetailResponseDto[]>> {
    const response = await this.findListByFilters(request);
    if (isEmpty(response) || isEmpty(response.data)) {
      return TcpPaginationResponse.from(null, response.pagination);
    }
    const adminUserRoleList = await Promise.all(
      response.data.map(async (adminUser) => {
        const roleList = await this.adminRoleService.findRolesByAdminUserId(
          adminUser.id,
        );
        return AdminUserDetailResponseDto.from(
          adminUser.toAdminUserDto(),
          roleList,
        );
      }),
    );
    return TcpPaginationResponse.from<AdminUserDetailResponseDto[]>(
      adminUserRoleList,
      response.pagination,
    );
  }

  private async mailExists(email: string): Promise<boolean> {
    email = email.toLowerCase();
    const adminUser = await this.findByEmail(email);
    return isNotEmpty(adminUser);
  }

}
