import "./style.css";
import { GM_getValue, GM_setValue } from "$";

const default_speed = 3;
const default_enable = true;

// This class is used to share state between the main script instance and the player script instance when using Remove Adblock Thing
class State<T> {
  private key: string;
  constructor(key: string, defaultState: T) {
    this.key = key;
    this.state ??= defaultState;
  }

  get state() {
    return GM_getValue(this.key);
  }

  set state(newState) {
    GM_setValue(this.key, newState);
  }
}

// Generate an id using the URL to identify the script instances
const id = window.location.href
  .split("")
  .map((char) => char.charCodeAt(0))
  .reduce((x, y) => x + y)
  .toString(16);

function log(str: string) {
  console.log(`[SUYV | ${id}] ${str}`);
}

log(`Running in ${window.location.href}`);

const app = document.querySelector("ytd-app");
const input = document.createElement("input");
input.classList.add("suyv-input");
input.placeholder = "SUYV";
input.type = "number";
document.body.insertBefore(input, app);

log("Created input");

const speed = new State<number>("speed", default_speed);
const enable = new State<boolean>("enable", default_enable);

log("Created state");

input.value = speed.state;

input.addEventListener("input", () => {
  if (!input.value) return;

  try {
    const requestedSpeed = parseFloat(input.value);
    speed.state = requestedSpeed;
    log(`Set speed to ${speed.state}`);

    speedUpVideos();
  } catch (e: any) {
    log(e);
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "s") {
    enable.state = !enable.state;
    log(`Set enabled to ${enable.state}`);

    speedUpVideos();
  }
});

function speedUpVideos() {
  const videos = document.querySelectorAll("video");
  videos.forEach((video) => {
    video.playbackRate = enable.state ? speed.state : 1;
  });
}

window.addEventListener("load", speedUpVideos);
setInterval(speedUpVideos, 1000);
