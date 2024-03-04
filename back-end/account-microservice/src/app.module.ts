import { forwardRef, Module } from '@nestjs/common';
import { PermissionModule } from './system/permission/permission.module';
import { RoleModule } from './system/role/role.module';
import { AccountPlayerModule } from './player/account-player.module';
import {AccountAdminModule} from "./admin/account-admin.module";
import {MySQLModule} from "./database/mysql.module";
import {ConfigModule} from "./config";

@Module({
  imports: [
    forwardRef(() => MySQLModule),
    forwardRef(() => ConfigModule),
    forwardRef(() => AccountAdminModule),
    forwardRef(() => AccountPlayerModule),
    forwardRef(() => RoleModule),
    forwardRef(() => PermissionModule),
  ],
})
export class AppModule {}
