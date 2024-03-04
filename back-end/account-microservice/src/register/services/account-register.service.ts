import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientRegister } from '../entities/client-register.entity';
import { Repository } from 'typeorm';
import { CreateClientRegisterDto } from '../dto/create-client-register.dto';
import {ClientAccessType} from "../../enum/account.enum";

@Injectable()
export class AccountRegisterService {
  constructor(
    @InjectRepository(ClientRegister)
    private readonly clientRegisterRepository: Repository<ClientRegister>,
  ) {}

  findById(id: number) {
    return this.clientRegisterRepository.findOneBy({ id: id });
  }

  findByAccessUserIdAndAccessType(
    accessUserId: number,
    accessType: ClientAccessType,
  ) {
    return this.clientRegisterRepository.findOne({
      where: { accessUserId, accessType },
    });
  }

  async create(client: CreateClientRegisterDto) {
    const clientRegister = ClientRegister.from(
      null,
      client.accessUserId,
      client.accessType,
      client.deviceType,
      client.os,
      client.browser,
      client.jwtRefreshToken,
    );
    return this.clientRegisterRepository.save(clientRegister);
  }

  async editToken(
    accessUserId: number,
    accessType: ClientAccessType,
    jwtRefreshToken: string,
  ) {
    const clientRegister = await this.findByAccessUserIdAndAccessType(
      accessUserId,
      accessType,
    );
    if (clientRegister) {
      const result = await this.clientRegisterRepository.update(
        { id: clientRegister.id, accessType: clientRegister.accessType },
        { jwtRefreshToken },
      );
      return result.affected > 0;
    } else {
      const clientUser = ClientRegister.from(
        null,
        accessUserId,
        accessType,
        '',
        '',
        '',
        jwtRefreshToken,
      );
      const userData = this.clientRegisterRepository.create(clientUser);
      await this.clientRegisterRepository.save(userData);
      return true;
    }
  }
}
