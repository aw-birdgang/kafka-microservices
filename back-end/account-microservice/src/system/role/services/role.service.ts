import { Injectable } from '@nestjs/common';
import {
  InjectDataSource,
  InjectEntityManager,
  InjectRepository,
} from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { MenuRolePermission } from '../entities/menu-role-permisstion.entity';
import { SetRoleDto } from '../dto/setRole.dto';
import {
  DeleteRoleParameter,
  EditRoleParameter,
} from '../params/role.parameter';
import { Menu } from '../entities/menu.entity';
import { CustomRpcException, ErrorCodes } from '@birdgang/lib-common';

@Injectable()
export class RoleService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(MenuRolePermission)
    private mrpRepository: Repository<MenuRolePermission>,
  ) {}

  findById(id: number): Promise<Role> {
    return this.roleRepository.findOneBy({ id: id });
  }

  /**
   * 역할 생성
   * @param payload
   * @returns ok status
   */
  async saveRole(payload: SetRoleDto): Promise<string> {
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

    const menuPermissionValues = Object.entries(permissionTable).map(
      ([menuId, permissionIds]) => ({
        menuId,
        roleId,
        permissionIds,
      }),
    );

    const mrpResult = await this.mrpRepository
      .createQueryBuilder()
      .insert()
      .into(MenuRolePermission)
      .values(menuPermissionValues)
      .execute();

    if (mrpResult == null)
      throw new CustomRpcException(ErrorCodes.SYS_ERROR_001);

    return 'ok';
  }

  /**
   * 역할 수정
   * @param payload
   * @returns ok status
   */
  async editRole(payload: EditRoleParameter): Promise<string> {
    const { roleId, roleName, desc, permissionTable } = payload;
    await this.roleRepository
      .createQueryBuilder()
      .update(Role)
      .set({
        name: roleName,
        description: desc,
      })
      .where({
        id: roleId,
      })
      .execute();

    //role 삭제 시 대응
    const currentMenuIds = await this.mrpRepository
      .createQueryBuilder()
      .select()
      .where('role_id = :roleId', { roleId: roleId })
      .getMany();

    for (const currentMenuId of currentMenuIds) {
      if (!permissionTable[currentMenuId.menuId]) {
        await this.mrpRepository.delete({
          roleId: roleId,
          menuId: currentMenuId.menuId,
        });
      }
    }

    for (const menuId of Object.keys(permissionTable)) {
      const permission = permissionTable[menuId];

      let menuToUpdate = await this.mrpRepository.findOne({
        where: { roleId: roleId, menuId: menuId },
      });

      if (!menuToUpdate) {
        menuToUpdate = new MenuRolePermission();
        menuToUpdate.roleId = roleId;
        menuToUpdate.menuId = menuId;
      }

      menuToUpdate.permissionIds = permission;
      await this.mrpRepository.save(menuToUpdate);
    }

    return 'ok';
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
