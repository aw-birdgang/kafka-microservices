import { Controller } from '@nestjs/common';
import { AccountAdminService } from './account-admin.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  AccountMessagePatterns,
  TcpPaginationRequest,
  TcpRequest,
  TcpResponse,
} from '@birdgang/lib-common';
import { isEmpty } from 'class-validator';
import { AdminUserResponseDto } from './dto/admin-user-response.dto';
import { AdminUserFiltersParameter } from '../account.parameter';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { AdminUser } from './entities/admin-user.entity';
import { CreateAdminUserRoleDto } from './dto/create-admin-user-role.dto';
import { AdminUserDetailResponseDto } from './dto/admin-user-detail-response.dto';

@Controller()
export class AccountAdminController {
  constructor(private readonly accountAdminService: AccountAdminService) {}

  @MessagePattern(AccountMessagePatterns.ACCOUNT_findAdminUserById)
  async findById(request: TcpRequest<number>) {
    const adminUser = await this.accountAdminService.findById(request.data);
    const data = isEmpty(adminUser) ? null : adminUser.toAdminUserDto();
    return TcpResponse.from<AdminUserResponseDto>(data).toString();
  }

  @MessagePattern(AccountMessagePatterns.ACCOUNT_findAdminUserByUsername)
  async findByUsername(request: TcpRequest<string>) {
    const adminUser = await this.accountAdminService.findByUsername(
      request.data,
    );
    const data = isEmpty(adminUser) ? null : adminUser.toAdminUserDto();
    return TcpResponse.from<AdminUserResponseDto>(data).toString();
  }

  @MessagePattern(AccountMessagePatterns.ACCOUNT_findAdminUserByEmail)
  async findByEmail(request: TcpRequest<string>) {
    const adminUser = await this.accountAdminService.findByEmail(request.data);
    const data = isEmpty(adminUser) ? null : adminUser.toAdminUserDto();
    return TcpResponse.from<AdminUserResponseDto>(data).toString();
  }

  @MessagePattern(AccountMessagePatterns.ACCOUNT_findAdminUserPasswordHashById)
  async findPasswordHashById(request: TcpRequest<number>) {
    const user = await this.accountAdminService.findById(request.data);
    return TcpResponse.from<string>(user.passwordHash).toString();
  }

  @MessagePattern(AccountMessagePatterns.ACCOUNT_findAdminUserListByFilters)
  async findByFilters(
    request: TcpPaginationRequest<AdminUserFiltersParameter>,
  ) {
    const response =
      await this.accountAdminService.findAdminUserDetailsByFilters(request);
    return response.toString();
  }

  @MessagePattern(AccountMessagePatterns.ACCOUNT_findAdminUserDetailById)
  async findAdminUserDetailById(request: TcpRequest<number>) {
    const response = await this.accountAdminService.findAdminUserDetailById(
      request.data,
    );
    return response.toString();
  }

  @MessagePattern(AccountMessagePatterns.ACCOUNT_findAdminUserInfoById)
  async findAdminInfoById(request: TcpRequest<number>) {
    const response = await this.accountAdminService.findAdminInfoById(
      Number(request.data),
    );
    return response.toString();
  }

  @MessagePattern(AccountMessagePatterns.ACCOUNT_createAdminUser)
  async createAdminUser(request: TcpPaginationRequest<CreateAdminUserDto>) {
    const adminUser = await this.accountAdminService.create(request.data);
    const data = isEmpty(adminUser) ? null : adminUser.toAdminUserDto();
    return TcpResponse.from<AdminUserResponseDto>(data).toString();
  }

  @MessagePattern(AccountMessagePatterns.ACCOUNT_editAdminUser)
  async editAdminUser(request: TcpPaginationRequest<AdminUserResponseDto>) {
    const adminUserDto = request.data;
    let adminUser = AdminUser.from(
      adminUserDto.id,
      adminUserDto.username,
      null,
      adminUserDto.companyId,
      adminUserDto.email,
      adminUserDto.fullName,
    );
    adminUser = await this.accountAdminService.edit(adminUser);
    const data = isEmpty(adminUser) ? null : adminUser.toAdminUserDto();
    return TcpResponse.from<AdminUserResponseDto>(data).toString();
  }

  @MessagePattern(AccountMessagePatterns.ACCOUNT_createAdminUserRole)
  async createAdminUserRole(
    request: TcpPaginationRequest<CreateAdminUserRoleDto>,
  ) {
    const adminUserDetailDto =
      await this.accountAdminService.createAdminUserRole(request.data);
    return TcpResponse.from<AdminUserDetailResponseDto>(
      adminUserDetailDto,
    ).toString();
  }
}
