import { Config } from "./stateContainer";
export default function executeErrorCallback(message) {
  if (typeof Config.errorCallback !== "function") {
    return;
  }
  Config.errorCallback(message || "");
  console.debug.apply(this, message || "");
}
