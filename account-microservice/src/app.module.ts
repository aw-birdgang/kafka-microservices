import { forwardRef, Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { PermissionModule } from './system/permission/permission.module';
import { RoleModule } from './system/role/role.module';

@Module({
  imports: [
    forwardRef(() => RoleModule),
    forwardRef(() => AccountModule),
    forwardRef(() => PermissionModule),
  ],
})
export class AppModule {}
