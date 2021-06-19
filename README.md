# Timer53
Timer53 is an extension of `setTimeout/setinterval` method, and provides with following functionalities:
- Can change config on the go!
- Timer will ony start once callback and interval is provided.
- Can define interval in milliseconds(ms), seconds(s), minutes(m) and hours(h).
- Can `stop`, `pause`, `resume`, `restart` or `destroy` the timer.
- Can get `remainingTime` and `interval` values.

## Install
`npm i -D Timer53`

## Import
`import Timer53 from 'Timer53'`

## Usage

### Methods
- `changeConfig`
- `start`
- `pause`
- `resume`
- `stop`
- `restart`
- `getConfig`
- `callback`
- `errorCallback`

### Properties

- `remainingTime`
- `interval`

## Example
```
var timer53 = new Timer53({
  callback: exampleFunction,
  interval: 2.5,
  use: "seconds",
  loop: true,
});

function exampleFunction() {
  console.log("Hello!!");
}
```
