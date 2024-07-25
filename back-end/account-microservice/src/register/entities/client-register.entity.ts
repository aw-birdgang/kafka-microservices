import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientRegisterDto } from '../dto/client-register.dto';
import { ClientAccessType } from '../../enum/account.enum';

@Entity('client_register')
@Index('uk1_client_register', ['accessUserId', 'accessType'], { unique: true })
export class ClientRegister {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'access_user_id', type: 'int', nullable: true })
  accessUserId: number;

  @Column({
    name: 'access_type',
    type: 'enum',
    enum: ClientAccessType,
    default: ClientAccessType.PLAYER_USER,
  })
  accessType: ClientAccessType;

  @Column({ name: 'device_type', type: 'varchar', nullable: true })
  deviceType: string;

  @Column({ name: 'os', type: 'varchar', nullable: true })
  os: string;

  @Column({ name: 'browser', type: 'varchar', nullable: true })
  browser: string;

  @Column({
    name: 'jwt_refresh_token',
    type: 'varchar',
    nullable: true,
    length: 512,
  })
  jwtRefreshToken: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  static from(
    id: number,
    accessUserId: number,
    accessType: ClientAccessType,
    deviceType: string,
    os: string,
    browser: string,
    jwtRefreshToken: string,
  ) {
    const clientRegister = new ClientRegister();
    clientRegister.id = id;
    clientRegister.accessUserId = accessUserId;
    clientRegister.accessType = accessType;
    clientRegister.deviceType = deviceType;
    clientRegister.os = os;
    clientRegister.browser = browser;
    clientRegister.jwtRefreshToken = jwtRefreshToken;
    return clientRegister;
  }

  toClientRegisterDto() {
    const clientDto = new ClientRegisterDto();
    clientDto.id = this.id;
    clientDto.accessUserId = this.accessUserId;
    clientDto.accessType = this.accessType;
    clientDto.deviceType = this.deviceType;
    clientDto.os = this.os;
    clientDto.browser = this.browser;
    clientDto.jwtRefreshToken = this.jwtRefreshToken;
    return clientDto;
  }
}
