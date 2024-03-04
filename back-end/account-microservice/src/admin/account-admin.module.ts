import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AdminUser} from "./entities/admin-user.entity";
import {AccountAdminService} from "./services/account-admin.service";
import {AccountAdminController} from "./controller/account-admin.controller";
import {RoleModule} from "../system/role/role.module";
import {PermissionModule} from "../system/permission/permission.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([AdminUser]),
        forwardRef(() => PermissionModule),
        forwardRef(() => RoleModule),
    ],
    providers: [AccountAdminService],
    controllers: [AccountAdminController],
    exports: [AccountAdminService],
})
export class AccountAdminModule {}
