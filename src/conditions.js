import { State, Config } from "./stateContainer";

export function isObject(obj) {
  /**
   * Check if the given argument is an Object
   */
  return typeof obj === "object" && obj instanceof Object;
}

export function isPausedOrCompleted() {
  return State.paused === true || State.completed === true;
}

// export function hasNotCompleted() {
//   return State.completed === false;
// }

export function hasManuallyStarted() {
  /**
   * (1) Check if "auto" start is disabled and has not been started
   * (2) Or Timer has been "stopped" or "completed"
   */
  return (
    (Config.startImmediately === false && State.manuallyStarted === true) ||
    State.completed === false
  );
}
