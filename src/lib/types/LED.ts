export type LEDEventMap = {
  turnOn: { led: LED };
  turnOff: { led: LED };
};

export type LEDEvent = keyof LEDEventMap;

export type LEDListener<T extends LEDEvent> = (payload: LEDEventMap[T]) => void;

export interface LED {
  isOn: () => boolean;
  turnOn: () => void;
  turnOff: () => void;
  toggle: () => void;
  on: <T extends LEDEvent>(ev: T, listener: LEDListener<T>) => () => void;
}
