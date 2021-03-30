import { Config } from "./stateContainer";

export default function getInterval() {
  const interval = Config.interval;
  const using = Config.use;
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
