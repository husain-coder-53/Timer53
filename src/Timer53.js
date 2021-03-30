import { State, Config } from "./stateContainer";
import { clearTimer, startTimer } from "./startTimer";
import getInterval from "./getInterval";
import {
  isObject,
  isPausedOrCompleted,
  hasManuallyStarted,
} from "./conditions";
import executeErrorCallback from "./executeErrorCallback";

export default class Timer53 {
  constructor(config = {}) {
    this.changeConfig(config);
    console.log(
      `%cTimer53`,
      `font-size:2em; color: #824300; font-family: Arial`
    );
    console.debug("--- Timer53: Debug mode ---");
  }

  changeConfig(config = {}) {
    if (!isObject(config)) {
      executeErrorCallback("(Timer53) Config is not a proper json object!");
      return;
    }
    Config.set(config);
    if (Config.startImmediately === true) {
      startTimer();
    }
    return this;
  }

  start() {
    if (hasManuallyStarted()) {
      executeErrorCallback(
        "Timer already started. You can use resume or restart methods!"
      );
      return;
    }
    startTimer();
    State.manuallyStarted = true;
    return this;
  }

  pause() {
    if (isPausedOrCompleted()) {
      executeErrorCallback("Timer already paused or completed!");
      return;
    }
    const getTime = Date.now() || new Date.getTime();
    State.remainingTime = getInterval() - (getTime - State.startTime);
    clearTimer();
    State.paused = true;
    return this;
  }

  resume() {
    if (!isPausedOrCompleted()) {
      executeErrorCallback("Timer has not been paused or completed!");
      return;
    }
    startTimer();
    return this;
  }

  restart() {
    State.remainingTime = 0;
    State.completed = false;
    State.startTime = 0;
    startTimer();
    return this;
  }

  stop() {
    clearTimer();
    State.completed = true;
    State.startTime = 0;
    return this;
  }

  getConfig() {
    return Config.get();
    return this;
  }

  callback(fn) {
    if (typeof fn !== "function") {
      executeErrorCallback("(Timer53)Error! Argument is not a function!");
    }
    Config.callback = fn;
    if (Config.startImmediately === true) {
      startTimer();
    }
    return this;
  }

  errorCallback(fn) {
    if (typeof fn !== "function") {
      executeErrorCallback("(Timer53)Error! Argument is not a function!");
    }
    Config.errorCallback = fn;
    return this;
  }

  get remainingTime() {
    const getTime = Date.now() || new Date.getTime();
    return getInterval() - (getTime - State.startTime);
  }

  get interval() {
    return Config.get("interval");
  }

  set interval(number) {
    this.changeConfig({ interval: number });
    this.stop();
    this.start();
  }
}
