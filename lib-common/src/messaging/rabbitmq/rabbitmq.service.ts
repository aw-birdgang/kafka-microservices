import { Injectable } from '@nestjs/common';
import { connect } from 'amqplib';
import { IMessagingService } from '../interfaces/messaging.interface';

@Injectable()
export class RabbitMQService implements IMessagingService {
  async publish(message: any, queue: string): Promise<void> {
    const conn = await connect('amqp://localhost');
    const channel = await conn.createChannel();
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  async subscribe(
    queue: string,
    callback: (message: any) => void,
  ): Promise<void> {
    const conn = await connect('amqp://localhost');
    const channel = await conn.createChannel();
    await channel.assertQueue(queue);
    channel.consume(queue, (msg) => {
      if (msg) {
        callback(JSON.parse(msg.content.toString()));
        channel.ack(msg);
      }
    });
  }
}
