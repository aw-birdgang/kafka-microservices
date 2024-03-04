import { Controller } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { MessagePattern } from '@nestjs/microservices';
import { AccountMessagePatterns } from '@birdgang/lib-common';

@Controller()
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @MessagePattern(AccountMessagePatterns.SYSTEM_findPermissionList)
  findPermissionList(): Promise<object> {
    return this.permissionService.findPermissionList();
  }
}
