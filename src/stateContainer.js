function StateContainer(obj) {
  if (typeof obj !== "object" && !obj instanceof Object) {
    console.warn("Cannot initiate state container class!");
    return false;
  }
  let state = obj;
  const returnObject = {
    get: function (key) {
      return typeof key !== "undefined"
        ? state.hasOwnProperty(key) && state[key]
        : state;
    },
    set: function (obj) {
      try {
        // Only set values which match keys from the "state" object
        const stateKeys = Object.keys(state);
        for (const key in obj) {
          if (stateKeys.indexOf(key) === -1) delete obj[key];
        }
        state = { ...state, ...obj };
        return true;
      } catch (err) {
        console.debug(err);
        return false;
      }
    },
  };
  // Each Key can be accessed independently
  for (const key in state) {
    Object.defineProperty(returnObject, key, {
      get: function () {
        return state[key];
      },
      set: function (value) {
        state[key] = value;
      },
    });
  }
  return returnObject;
}

export const State = new StateContainer({
  timer: false,
  remainingTime: 0,
  startTime: 0,
  completed: true,
  paused: false,
  manuallyStarted: false
});

export const Config = new StateContainer({
  callback: false,
  errorCallback: false,
  interval: false,
  use: "ms", //Possible values ms(milliseconds), seconds(s), m(minutes), h(hour)
  loop: false,
  startImmediately: true
});

export const Validation = new StateContainer({
  callback: function () {
    return typeof this === "function";
  },
  interval: function () {
    return this % 1 === 0;
  },
});
