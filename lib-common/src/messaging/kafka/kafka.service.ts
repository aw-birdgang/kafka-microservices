import {Injectable} from '@nestjs/common';
import {Kafka} from 'kafkajs';
import {IMessagingService} from "../interfaces/messaging.interface";

@Injectable()
export class KafkaService implements IMessagingService {
    private kafka = new Kafka({
        clientId: 'app',
        brokers: ['localhost:9092'],
    });

    async publish(message: any, topic: string): Promise<void> {
        const producer = this.kafka.producer();
        await producer.connect();
        await producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }],
        });
        await producer.disconnect();
    }

    subscribe(topic: string, callback: (message: any) => void): void {
        const consumer = this.kafka.consumer({ groupId: 'group' });
        consumer.connect();
        consumer.subscribe({ topic, fromBeginning: true });
        consumer.run({
            eachMessage: async ({ message }) => {
                callback(JSON.parse(message.value.toString()));
            },
        });
    }
}
