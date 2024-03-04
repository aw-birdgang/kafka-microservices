import { Injectable } from '@nestjs/common';
import { Permission } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async findPermissionList(): Promise<object> {
    const result = await this.permissionRepository
      .createQueryBuilder('permission')
      .select(['permission.name'])
      .getMany();

    return result.map((v) => {
      return v.name;
    });
  }
}
