import { Module } from '@nestjs/common';
import { KafkaService } from './kafka/kafka.service';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';

@Module({
  providers: [KafkaService, RabbitMQService],
  exports: [KafkaService, RabbitMQService],
})
export class MessagingModule {}
