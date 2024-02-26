export interface IMessagingService {
    publish(message: any, topic: string): Promise<void>;
    subscribe(topic: string, callback: (message: any) => void): void;
}
