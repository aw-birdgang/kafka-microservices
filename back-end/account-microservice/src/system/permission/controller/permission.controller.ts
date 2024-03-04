import {Controller} from '@nestjs/common';
import {PermissionService} from '../services/permission.service';
import {MessagePattern} from '@nestjs/microservices';
import {SystemMessagePatterns} from "@birdgang/lib-common/dist/enums/system-message-pattern.enum";

@Controller()
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @MessagePattern(SystemMessagePatterns.SYSTEM_findPermissionList)
  findPermissionList(): Promise<object> {
    return this.permissionService.findPermissionList();
  }
}
