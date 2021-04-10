import { LED as ILED, LEDEventMap } from "../../types/LED";
import Device from "../base/device";

export default class LED extends Device<LEDEventMap> implements ILED {
  constructor(pin: number) {
    super(pin, "out");
    this.registerDefaultListeners();
  }

  protected registerDefaultListeners = () => {
    this.on("turnOn", () => {
      this.controller.writeSync(1);
    });
    this.on("turnOff", () => {
      this.controller.writeSync(0);
    });
  };

  isOn: ILED["isOn"] = () => {
    return this.controller.readSync() === 1;
  };

  turnOn: ILED["turnOn"] = () => {
    this.events.emit("turnOn");
  };

  turnOff: ILED["turnOff"] = () => {
    this.events.emit("turnOff");
  };

  toggle: ILED["toggle"] = () => {
    if (this.isOn()) {
      this.events.emit("turnOff");
    } else {
      this.events.emit("turnOn");
    }
  };

  on: ILED["on"] = (ev, listener) => {
    this.events.addListener(ev, listener);
    return () => {
      this.events.removeListener(ev, listener);
    };
  };
}
