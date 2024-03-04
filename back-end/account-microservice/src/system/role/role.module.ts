import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRole } from './entities/admin-role.entity';
import { Role } from './entities/role.entity';
import { AdminRoleService } from './services/admin-role.service';
import { RoleService } from './services/role.service';
import { RoleController } from './controller/role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role, AdminRole])],
  providers: [RoleService, AdminRoleService],
  controllers: [RoleController],
  exports: [RoleService, AdminRoleService],
})
export class RoleModule {}
