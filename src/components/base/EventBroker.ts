import {BrokerEvent, EventName, IEvents} from '../../types/base/EventBroker';

export class EventBroker implements IEvents {
  private events: Map<EventName, Set<Function>>;

  constructor() {
    this.events = new Map<EventName, Set<Function>>();
  }

  on<T extends object>(eventName: EventName, callback: Function) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Set<Function>());
    }
    this.events.get(eventName)?.add(callback);
  };

  off(eventName: string, callback: Function) {
    if (this.events.has(eventName)) {
      this.events.get(eventName)!.delete(callback);
      if (this.events.get(eventName).size === 0) {
        this.events.delete(eventName);
      }
    }
  }

  emit<T extends object>(eventName: string, data?: T) {
    this.events.forEach((subscribers, name) => {
      if (name instanceof RegExp && name.test(eventName) || name === eventName) {
        subscribers.forEach(callback => callback(data));
      }
    })
    if (this.events.has('*')) {
      this.events.get('*').forEach(callback => callback({eventName, data}));
    }
  }

  onAll(callback: (data: BrokerEvent) => void) {
    this.on('*', callback);
  }

  offAll() {
    this.events = new Map<EventName, Set<Function>>();
  }

  trigger<T extends object>(eventName:string, context?: Partial<T>) {
    return (event: object = {}) => {
      this.emit(eventName, {
        ...(event || {}),
        ...(context || {})
      });
    }
  }
}
