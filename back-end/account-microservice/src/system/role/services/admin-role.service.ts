import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { AdminRole } from '../entities/admin-role.entity';
import { Role } from '../entities/role.entity';
import { AdminRoleDto } from '../dto/admin-role.dto';
import { isEmpty } from 'class-validator';

@Injectable()
export class AdminRoleService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @InjectRepository(AdminRole)
    private readonly adminRoleRepository: Repository<AdminRole>,
  ) {}

  findByAdminUserId(adminUserId: number): Promise<AdminRole[]> {
    return this.adminRoleRepository.findBy({ adminUserId });
  }

  findRolesByAdminUserId(adminUserId: number): Promise<Role[]> {
    return this.entityManager
      .createQueryBuilder(AdminRole, 'ar')
      .innerJoinAndSelect(Role, 'ro', 'ro.id = ar.role_id')
      .select('ro.id', 'id')
      .addSelect('ro.name', 'name')
      .addSelect('ro.description', 'description')
      .where('ar.admin_user_id = :adminUserId', { adminUserId })
      .getRawMany();
  }

  async create(adminRoleDto: AdminRoleDto): Promise<AdminRole> {
    const newAdminRole = new AdminRole();
    newAdminRole.adminUserId = adminRoleDto.adminUserId;
    newAdminRole.roleId = adminRoleDto.roleId;

    const adminRole = await this.adminRoleRepository.save(newAdminRole);
    if (isEmpty(adminRole)) {
      //throw new BusinessRpcException(ErrorCodes.BUS_ERROR_008);
    }
    return adminRole;
  }

  async deleteByAdminUserId(adminUserId: number): Promise<boolean> {
    const result = await this.adminRoleRepository.delete({ adminUserId });
    return result.affected > 0;
  }
}
