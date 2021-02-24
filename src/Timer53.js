var Timer53 = function (options) {
  //Declare
  // Timer instance
  var state = {
    timer: false,
    remainingTime: 0,
    startTime: 0,
    completed: true,
  };
  //State Container
  var config = {
    callback: false,
    interval: false,
    use: "ms", //Possible values ms(milliseconds), seconds(s), m(minutes), h(hour)
    loop: false,
  };
  //Validation rules
  var configValidation = {
    callback: function () {
      return typeof this === "function";
    },
    interval: function () {
      return this % 1 == 0;
    },
  };
  /**After declaration, store config */
  sanitizeAndStoreConfig(options);
  // Instance
  var Timer53InstanceObject = {
    /**APIs */
    //change
    change: sanitizeAndStoreConfig,
    //pause
    pause: pause,
    //resume
    resume: resume,
    // restart
    restart: restart,
    //getConfig
    getConfig: getConfig,
    // stop
    stop: stop,
    destroy: destroy.bind(this),
  };

  /**Methods(getter and setter methods) */
  //remainingTime -> In ms
  Object.defineProperty(Timer53InstanceObject, "remainingTime", {
    get: function () {
      return (
        getInterval() - ((Date.now() || new Date.getTime()) - state.startTime)
      );
    },
  });
  // Interval
  Object.defineProperty(Timer53InstanceObject, "interval", {
    get: function () {
      return config.interval;
    },
    set: function (newInterval) {
      config.interval = newInterval;
      restart();
      return true;
    },
  });
  //repeat -> -1 means loop, and 0 means it will not execute(under any conditions), and > 1 means loop that many times

  // Decalre instace of this object
  var self = this;

  return Timer53InstanceObject;

  //Helper Functions
  function getConfig() {
    return config;
  }

  function pause() {
    if (state.remainingTime > 0 || state.completed === true) {
      console.warn("Timer already paused or completed!");
      return;
    }
    if (state.startTime === 0) return;
    state.remainingTime =
      getInterval() - ((Date.now() || new Date.getTime()) - state.startTime);
    clearInterval(state.timer);
    console.log(state.remainingTime);
  }

  function resume() {
    if (state.remainingTime === 0 || state.completed === true) {
      console.warn("Timer has not been paused or completed!");
      return;
    }
    startTimer();
  }

  function restart() {
    state.remainingTime = 0;
    state.completed = false;
    state.startTime = 0;
    startTimer();
  }

  function stop() {
    clearInterval(state.timer);
    state.completed = true;
    state.startTime = 0;
  }

  function destroy() {
    stop();
    delete Timer53InstanceObject.change;
    delete Timer53InstanceObject.pause;
    delete Timer53InstanceObject.resume;
    delete Timer53InstanceObject.restart;
    delete Timer53InstanceObject.getConfig;
    delete Timer53InstanceObject.stop;
    delete Timer53InstanceObject.destroy;
    Timer53InstanceObject = null;
  }

  function startTimer() {
    try {
      /**
       * If callback or timer are not set, the timer will not start
       * and execution will go to catch.
       * More info: If "change" method is called, then timer will reinitialize
       */
      clearInterval(state.timer);
      var interval = state.remainingTime || getInterval();
      if (!interval || interval <= 0) return;
      console.log("Interval", interval);
      state.timer = window[config.loop ? "setInterval" : "setTimeout"](
        function () {
          console.log("Instance", config);
          config.callback(), !config.loop && stop();
          if (config.loop) {
            state.startTime = Date.now() || new Date.geTime();
          }
        },
        interval
      );
      if (state.startTime === 0) {
        state.startTime = Date.now() || new Date.geTime();
      }
      state.remainingTime = 0;
      state.completed = false;
    } catch (err) {
      console.warn("Interval or callback not defined!");
    }
  }

  function sanitizeAndStoreConfig(options) {
    try {
      // Type-checking if fails in any part of "try" block
      // Empty {} object will be returned.
      // Get keys from state object, where options will be stored
      if (!options) return;
      var checkKeys = Object.keys(config);
      // Loop through options object
      for (var key in options) {
        var setting = options[key];
        // only valid values from object will be accepted.
        // validation will be done from configValidation object
        // Rest will be ignored
        if (
          checkKeys.indexOf(key) === -1 &&
          !configValidation[key].call(setting)
        )
          continue;
        // Store
        config[key] = setting;
      }
      // Start timer -> If callback and interval are present
      startTimer();
    } catch (err) {
      throw new Error(err);
    }
  }

  function getInterval() {
    var interval = config.interval;
    var using = config.use;
    if (/^(ms|millisecond(s)?)$/i.test(using)) {
      return interval;
    }
    if (/^(s|second(s)?)$/i.test(using)) {
      return interval * 1e3;
    }
    if (/^(m|minute(s)?)$/i.test(using)) {
      return interval * (1e3 * 60);
    }
    if (/^(h|hour(s)?)$/i.test(using)) {
      return interval * (1e3 * 60 * 60);
    }
    return false;
  }
};

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports.Timer53 = Timer53;
}
