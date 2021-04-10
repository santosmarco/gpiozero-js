import Events from "events";

class DeviceEvents extends Events {}

export default abstract class Device<
  EventMap extends { [key: string]: { [key: string]: any } }
> {
  protected readonly controller: Gpio;
  protected readonly events: DeviceEvents;

  constructor(pin: number, direction: "in" | "out") {
    this.controller = new Gpio(pin, direction);
    this.events = new DeviceEvents();
  }

  protected abstract registerDefaultListeners: () => void;

  abstract on: <T extends keyof EventMap>(
    ev: T,
    listener: (payload: EventMap[T]) => void
  ) => void;
}
