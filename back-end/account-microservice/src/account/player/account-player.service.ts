import { Injectable } from '@nestjs/common';
import { PlayerUser } from './entities/player-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerUserSocial } from './entities/player-user-social.entity';
import { Repository } from 'typeorm';
import { AccountRegisterService } from '../register/account-register.service';
import { isEmpty, isNotEmpty } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientRegister } from '../register/entities/client-register.entity';
import { ClientAccessType } from '../account.enum';
import {
  CustomRpcException,
  ErrorCodes,
  TcpRequest,
} from '@birdgang/lib-common';
import { PlayerUserSocialDto } from './dto/player-user-social.dto';

@Injectable()
export class AccountPlayerService {
  constructor(
    @InjectRepository(PlayerUser)
    private readonly userRepository: Repository<PlayerUser>,
    @InjectRepository(PlayerUserSocial)
    private readonly playerUserSocialRepository: Repository<PlayerUserSocial>,
    private readonly clientRegisterService: AccountRegisterService,
  ) {}

  findById(id: number): Promise<PlayerUser> {
    return this.userRepository.findOneBy({ id: id });
  }

  findByUsername(username: string): Promise<PlayerUser> {
    return this.userRepository.findOne({ where: { username } });
  }

  findByEmail(email: string): Promise<PlayerUser> {
    return this.userRepository.findOne({ where: { email } });
  }

  private async mailExists(email: string): Promise<boolean> {
    email = email.toLowerCase();
    const user = await this.findByEmail(email);
    return isNotEmpty(user);
  }

  async create(createUserDto: CreateUserDto): Promise<PlayerUser> {
    const checkUser = await this.findByUsername(createUserDto.username);
    if (isNotEmpty(checkUser)) {
      throw new CustomRpcException(ErrorCodes.BUS_ERROR_007);
    }
    const passwordHash = createUserDto.password;
    const newUser = PlayerUser.from(
      null,
      createUserDto.username,
      passwordHash,
      createUserDto.email,
      createUserDto.fullName,
    );
    const user = await this.userRepository.save(newUser);
    console.log('create user -> ', user);

    const clientRegister = await this.clientRegisterService.create(
      ClientRegister.from(
        null,
        user.id,
        ClientAccessType.PLAYER_USER,
        null,
        null,
        null,
        null,
      ),
    );
    if (isEmpty(clientRegister)) {
      throw new CustomRpcException(ErrorCodes.BUS_ERROR_006);
    }

    return user;
  }

  async playerUserGoogleLogin(userData: TcpRequest<PlayerUserSocialDto>) {
    const user = await this.playerUserSocialRepository.findOne({
      where: { email: userData['email'] },
    });
    if (user) {
      user.updatedAt = new Date();
      await this.playerUserSocialRepository.save(user);
    } else {
      const result = this.playerUserSocialRepository.create({
        email: userData['email'],
        username: userData['name'],
        socialType: userData['socialType'],
        accessToken: userData['googleAccessToken'],
      });
      await this.playerUserSocialRepository.save(result);
    }

    return 'ok';
  }
}
