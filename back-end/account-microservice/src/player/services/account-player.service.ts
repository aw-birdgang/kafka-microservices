import {Injectable, Logger} from '@nestjs/common';
import {PlayerUser} from '../entities/player-user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {isNotEmpty} from 'class-validator';

@Injectable()
export class AccountPlayerService {
  constructor(
      @InjectRepository(PlayerUser) private readonly userRepository: Repository<PlayerUser>,
  ) {}

  private readonly logger = new Logger(AccountPlayerService.name);

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

}
