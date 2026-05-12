import $ from "jquery";
import "./style.css";

window.$ = $;
window.jQuery = $;

const pinButton = document.querySelector("#pin-button");
const minimizeButton = document.querySelector("#minimize-button");
const closeButton = document.querySelector("#close-button");

function setPinnedState(isPinned) {
  pinButton?.classList.toggle("is-pinned", isPinned);
  pinButton?.setAttribute("aria-pressed", String(isPinned));
  pinButton?.setAttribute("title", isPinned ? "Disable always on top" : "Keep always on top");
}

minimizeButton?.addEventListener("click", () => {
  window.catCalculator.minimize();
});

closeButton?.addEventListener("click", () => {
  window.catCalculator.close();
});

pinButton?.addEventListener("click", async () => {
  setPinnedState(await window.catCalculator.toggleAlwaysOnTop());
});

window.catCalculator.isAlwaysOnTop().then(setPinnedState).catch(() => setPinnedState(true));

function resizeWindowToCalculator() {
  const shell = document.querySelector(".window-shell");
  if (!shell) return;

  const rect = shell.getBoundingClientRect();
  window.catCalculator.resizeToContent(rect.width, rect.height);
}

window.addEventListener("load", resizeWindowToCalculator);
window.addEventListener("resize", resizeWindowToCalculator);

import("./calciLogic.js");
