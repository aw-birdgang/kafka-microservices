import { Global, Module, OnApplicationShutdown, Scope } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Redis } from 'ioredis';

import { IORedisKey } from './redis-cache.constants';
import {RedisCacheService} from "./redis-cache.service";
import {ConfigModule, ConfigService} from "../config";

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: IORedisKey,
            useFactory: async (configService: ConfigService) => {
                // return new Redis(configService.get('redis'));
                return new Redis(configService.get('redis'));
            },
            inject: [ConfigService],
        },
        RedisCacheService,
    ],
    exports: [RedisCacheService],
})
export class RedisModule implements OnApplicationShutdown {
    constructor(private readonly moduleRef: ModuleRef) {}

    async onApplicationShutdown(signal?: string): Promise<void> {
        return new Promise<void>((resolve) => {
            const redis = this.moduleRef.get(IORedisKey);
            redis.quit();
            redis.on('end', () => {
                resolve();
            });
        });
    }
}
