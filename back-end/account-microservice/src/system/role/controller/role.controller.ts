import {Controller} from '@nestjs/common';
import {RoleService} from "../services/role.service";
import {MessagePattern, Transport} from "@nestjs/microservices";
import {RolePermissionTcpCommands} from "@birdgang/lib-common";
import {SetRoleDto} from "../dto/setRole.dto";

@Controller()
export class RoleController {
    constructor(private roleService: RoleService) {}

    @MessagePattern({ cmd: RolePermissionTcpCommands.LOTTO_ROLE_SET }, Transport.TCP)
    async setRole(payload: SetRoleDto): Promise<string> {
        const result = await this.roleService.setRole(payload["data"]);
        return result;
    }

}
