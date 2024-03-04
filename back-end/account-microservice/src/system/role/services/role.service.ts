import {Injectable} from '@nestjs/common';
import {InjectDataSource, InjectEntityManager, InjectRepository,} from '@nestjs/typeorm';
import {DataSource, EntityManager, Repository} from 'typeorm';
import {Role} from '../entities/role.entity';
import {MenuRolePermission} from '../entities/menu-role-permisstion.entity';
import {DeleteRoleParameter,} from '../params/role.parameter';
import {Menu} from '../entities/menu.entity';
import {CustomRpcException, ErrorCodes} from '@birdgang/lib-common';
import {SetRoleDto} from "../dto/setRole.dto";

@Injectable()
export class RoleService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  findById(id: number): Promise<Role> {
    return this.roleRepository.findOneBy({ id: id });
  }


  /**
   * 역할 생성
   * @param payload
   * @returns ok status
   */
  async setRole(payload: SetRoleDto): Promise<string> {
    const { roleName, desc, permissionTable } = payload;

    const roleSaveResult = await this.roleRepository
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values({
          name: roleName,
          description: desc,
        })
        .execute();

    const roleId = roleSaveResult.generatedMaps[0].id;

    const menuPermissionValues = Object.entries(permissionTable).map(([menuId, permissionIds]) => ({
      menuId,
      roleId,
      permissionIds,
    }));

    // const mrpResult = await this.mrpRepository
    //     .createQueryBuilder()
    //     .insert()
    //     .into(MenuRolePermission)
    //     .values(menuPermissionValues)
    //     .execute();
    //
    // if (mrpResult == null) throw new CustomRpcException(ErrorCodes.SYS_ERROR_001);

    return "ok";
  }


  /**
   * roleId로 검색 및 정보 얻기
   * @param roleId
   * @returns 특정 역할 반환
   */
  async findRole(roleId: number): Promise<object> {
    const mrpData = await this.entityManager
      .createQueryBuilder(MenuRolePermission, 'mrp')
      .leftJoinAndSelect(Menu, 'menu', 'menu.id = mrp.menu_id')
      .leftJoinAndSelect(Role, 'role', 'role.id = mrp.role_id')
      .select('mrp.id', 'id')
      .addSelect('mrp.menu_id', 'menuId')
      .addSelect('mrp.role_id', 'roleId')
      .addSelect('mrp.permission_ids', 'permissionIds')
      .addSelect('menu.code', 'code')
      .addSelect('menu.parent_id', 'parentId')
      .addSelect('menu.sort', 'sort')
      .addSelect('menu.url', 'url')
      .where('mrp.role_id = :id', { id: roleId })
      .getRawMany();

    const roleData = await this.entityManager
      .createQueryBuilder(Role, 'role')
      .select('role.name', 'roleName')
      .addSelect('role.description', 'roleDiscription')
      .where('role.id = :id', { id: roleId })
      .getRawMany();

    const result = {
      roleData: roleData[0],
      mrpData,
    };

    return result;
  }

  /**
   * 전체 역할 목록 얻기
   * @returns 전체 역할 목록
   */
  async findRoleList(): Promise<object> {
    const result = await this.roleRepository
      .createQueryBuilder()
      .select()
      .getMany();
    return result;
  }

  /**
   * roleId로 특정 역할 삭제
   * @param payload
   * @returns ok status
   */
  async deleteRole(payload: DeleteRoleParameter): Promise<string> {
    const { roleId } = payload;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');
    try {
      const roleResult = await queryRunner.manager.delete(Role, { id: roleId });
      if (roleResult == null)
        throw new CustomRpcException(ErrorCodes.SYS_ERROR_003);
      const mrpResult = await queryRunner.manager.delete(MenuRolePermission, {
        roleId: roleId,
      });
      if (mrpResult == null)
        throw new CustomRpcException(ErrorCodes.SYS_ERROR_003);
      await queryRunner.commitTransaction();
      return 'ok';
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      await queryRunner.release();
    }
  }
}
