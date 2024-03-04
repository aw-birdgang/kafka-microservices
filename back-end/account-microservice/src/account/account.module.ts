import { forwardRef, Module } from '@nestjs/common';
import { AccountAdminService } from './admin/account-admin.service';
import { AccountPlayerService } from './player/account-player.service';
import { AccountRegisterService } from './register/account-register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './admin/entities/admin-user.entity';
import { PlayerUser } from './player/entities/player-user.entity';
import { ClientRegister } from './register/entities/client-register.entity';
import { PlayerUserSocial } from './player/entities/player-user-social.entity';
import { AccountPlayerController } from './player/account-player.controller';
import { AccountRegisterController } from './register/account-register.controller';
import { AccountAdminController } from './admin/account-admin.controller';
import { RoleModule } from '../system/role/role.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdminUser,
      PlayerUser,
      ClientRegister,
      PlayerUserSocial,
    ]),
    forwardRef(() => RoleModule),
    AdminModule,
  ],
  providers: [
    AccountAdminService,
    AccountPlayerService,
    AccountRegisterService,
  ],
  controllers: [
    AccountAdminController,
    AccountPlayerController,
    AccountRegisterController,
  ],
  exports: [AccountAdminService, AccountPlayerService, AccountRegisterService],
})
export class AccountModule {}
