var timer53 = new Timer53({
  callback: exampleFunction,
  interval: 100,
  use: "seconds",
  loop: true,
  startImmediately: true
});

function exampleFunction(options) {
  document.querySelector("#messageFromTimer").innerHTML += "Callback from timer. Current Interval: "+options.interval+"<br>";
}
