import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AccountService } from './account.service';
import { UserProfileDto } from './dto/user-profile.dto';

@ApiTags('account/me')
@Controller('private/me')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    // private readonly ticketMsService: TicketMsService,
    // private readonly assetMsService: AssetMsService,
    // private readonly assetTransactionMsService: AssetTransactionMsService,
    // private readonly winningTicketMsService: WinningTicketMsService,
  ) {}

  @ApiOperation({ summary: '내정보 보기' })
  @ApiUnauthorizedResponse({ description: '401. UnauthorizedException.' })
  @ApiForbiddenResponse({ description: '403. ForbiddenException.' })
  @ApiOkResponse({
    type: [UserProfileDto],
    description: '200. Success. Returns a user profile info',
  })
  @HttpCode(HttpStatus.OK)
  @ApiHeader({
    name: 'x_session_user_id',
    required: false,
    description: 'userId',
  })
  @Get('info')
  findAdminProfileById(@Req() request: Request): Promise<UserProfileDto> {
    const { sub: userId } = request['user'];
    return this.accountService.findUserProfileById(userId);
  }
}
