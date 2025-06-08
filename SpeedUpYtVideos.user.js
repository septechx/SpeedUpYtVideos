// ==UserScript==
// @name         Speed Up Youtube Videos
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Speed up all youtube videos to a custom speed
// @author       septech
// @match        https://*.youtube.com/*
// @match        https://*.youtube-nocookie.com/*
// @updateURL    https://github.com/septechx/SpeedUpYtVideos/raw/main/SpeedUpYtVideos.user.js
// @downloadURL  https://github.com/septechx/SpeedUpYtVideos/raw/main/SpeedUpYtVideos.user.js
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(() => {
  "use strict";

  // Configuration
  const default_speed = 3;
  const default_enable = true;

  // This class is used to share state between the main script instance and the player script instance when using Remove Adblock Thing
  class State {
    constructor(key, defaultState) {
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

  function log(string) {
    console.log(`[SUYV | ${id}] ${string}`);
  }

  const app = document.querySelector("ytd-app");
  const input = document.createElement("input");
  input.style =
    "position: absolute; z-index: 2021; background: #181818; border: #181818; color: #fff;";
  input.placeholder = "SUYV";
  document.body.insertBefore(input, app);

  log("Created input");

  const speed = new State("speed", default_speed);
  const enable = new State("enable", default_enable);

  log("Created state>");

  input.value = speed.state;

  input.addEventListener("input", () => {
    if (!input.value) return;

    try {
      const requestedSpeed = parseFloat(input.value);
      speed.state = requestedSpeed;
      log(`Set speed to ${speed.state}`);

      speedUpVideos();
    } catch (e) {
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
})();
