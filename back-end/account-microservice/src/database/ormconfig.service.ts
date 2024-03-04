import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from 'src/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  private readonly logger = new Logger(TypeOrmConfigService.name);

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const type = this.configService.get('DB_TYPE') as any;
    const host = this.configService.get('MYSQL_HOST');
    const port = parseInt(this.configService.get('MYSQL_PORT')) || 5432;
    const username = this.configService.get('MYSQL_USERNAME');
    const password = this.configService.get('MYSQL_PASSWORD');
    const database = this.configService.get('MYSQL_DATABASE');
    // const entities = [__dirname + '/../../**/*.entity{.ts,.js}'];
    // const entities2 = this.configService.get('ENTITIES');
    // // const synchronize = this.configService.isEnv('development');
    // const synchronize = this.configService.get('MYSQL_SYNCHRONIZE');
    const synchronize = true;
    // // const logging = this.configService.isEnv('development');
    const logging = false;

    this.logger.log('type : ' + type);
    this.logger.log('host : ' + host);
    this.logger.log('port : ' + port);
    this.logger.log('username : ' + username);
    this.logger.log('password : ' + password);
    this.logger.log('database : ' + database);
    // this.logger.log('entities : ' + entities);
    // this.logger.log('entities2 : ' + entities2);
    this.logger.log('synchronize : ' + synchronize);
    this.logger.log('logging : ' + logging);

    return {
      type: type,
      host: host,
      port: port,
      username: username,
      password: password,
      database: database,
      // entities: entities,
      synchronize: synchronize,
      logging: logging,
    };
  }
}
