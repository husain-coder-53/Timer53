import { State, Config } from "./stateContainer";
import getInterval from "./getInterval";

export function startTimer() {
  try {
    /**
     * If callback or timer are not set, the timer will not start
     * and execution will go to catch.
     * More info: If "change" method is called, then timer will reinitialize
     */
    clearTimer();
    const useSetIntervalOrTimeout = Config.loop ? "setInterval" : "setTimeout";
    if (State.startTime === 0) {
      State.startTime = Date.now() || new Date.geTime();
    }
    Timer(useSetIntervalOrTimeout);
    State.completed = false;
    State.paused = false;
  } catch (err) {
    console.debug("Interval or callback not defined!");
  }
}

function Timer(useSetIntervalOrTimeout) {
  var interval = State.remainingTime || getInterval();
  if (!interval || interval <= 0) return;
  console.debug(`(Timer53) Iteration complete on: ${interval}`);
  State.timer = window[useSetIntervalOrTimeout](function () {
    Config.callback(Config.get());
    if (Config.loop) {
      State.startTime = Date.now() || new Date.geTime();
    }
    if (Config.loop && State.remainingTime > 0) {
      clearTimer();
      Timer(useSetIntervalOrTimeout);
    }
    // Irrespective of loop is true or not, set "remainingTime" as 0
    State.remainingTime = 0;
  }, interval);
}

export function clearTimer() {
  clearInterval(State.timer);
  State.timer = false;
}
