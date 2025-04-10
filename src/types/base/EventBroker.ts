export type BrokerEvent = {
  eventName: string;
  data?: unknown
}

export type EventName = string | RegExp;

export interface IEvents {
  on<T extends object>(event: EventName, callback: (data: T) => void): void;
  off(event: EventName, callback: Function): void;
  emit<T extends object>(eventName: string, data?: T): void;
  trigger<T extends object>(eventName: string, context?: Partial<T>): (data: T) => void;
}

