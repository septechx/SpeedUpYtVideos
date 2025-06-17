// ==UserScript==
// @name         Speed Up Yt Videos
// @namespace    seps-scripts
// @version      2.0.1
// @author       septech
// @license      Unlicense
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @downloadURL  https://raw.githubusercontent.com/septechx/SpeedUpYtVideos/refs/heads/master/dist/speedupytvideos.user.js
// @updateURL    https://raw.githubusercontent.com/septechx/SpeedUpYtVideos/refs/heads/master/dist/speedupytvideos.user.js
// @match        https://*.youtube.com/*
// @match        https://*.youtube-nocookie.com/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(e=>{if(typeof GM_addStyle=="function"){GM_addStyle(e);return}const t=document.createElement("style");t.textContent=e,document.head.append(t)})(" .suyv-input{-moz-appearance:textfield;position:fixed;z-index:2021;background:#181818;border:#181818;color:#fff}.suyv-input::-webkit-inner-spin-button,.suyv-input::-webkit-outer-spin-button{-webkit-appearance:none;margin:0} ");

(function () {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  const default_speed = 3;
  const default_enable = true;
  class State {
    constructor(key, defaultState) {
      __publicField(this, "key");
      this.key = key;
      this.state ?? (this.state = defaultState);
    }
    get state() {
      return _GM_getValue(this.key);
    }
    set state(newState) {
      _GM_setValue(this.key, newState);
    }
  }
  const id = window.location.href.split("").map((char) => char.charCodeAt(0)).reduce((x, y) => x + y).toString(16);
  function log(str) {
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
  const speed = new State("speed", default_speed);
  const enable = new State("enable", default_enable);
  log("Created state");
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
  setInterval(speedUpVideos, 1e3);

})();