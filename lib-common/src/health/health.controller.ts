import { Controller, Get } from '@nestjs/common';
import {HealthCheck, HealthCheckService, HttpHealthIndicator, MicroserviceHealthIndicator} from '@nestjs/terminus';
import {Transport} from "@nestjs/microservices";

@Controller("api/health")
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private http: HttpHealthIndicator,
        private microservice: MicroserviceHealthIndicator,
    ) {}

    @Get('ping')
    @HealthCheck()
    checkPing() {
        // HTTP 체크 예시: 외부 API가 정상적으로 응답하는지 확인
        return this.health.check([
            () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
        ]);
    }


    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
            () => {
                let microserviceOptions = {
                    transport: Transport.KAFKA,
                    timeout: 100000,
                    options: {
                        client: {
                            clientId: process.env.KAFKA_CLIENT_PREFIX,
                            brokers: process.env.KAFKA_BROKER_URL.split(",").sort(() => Math.random() - 0.5),
                            // ssl: true,
                            // sasl: {
                            //   mechanism: "oauthbearer",
                            //   oauthBearerProvider: () => oauthBearerTokenProvider("ap-southeast-1")
                            // }
                        },
                        consumer: {
                            groupId: process.env.KAFKA_CONSUMER_GROUP_PREFIX
                        }
                    }
                }
                return this.microservice.pingCheck("kafka", microserviceOptions);
            },
        ]);
    }

}
