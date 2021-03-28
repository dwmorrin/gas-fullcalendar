import { createElement } from "./html";
import "./spinner.css";

/**
 * Loading indicator.
 * Use the .loading CSS class to stylize the indicator when showing (animation, etc)
 * Many asynchronous events can request the indicator with the `wait(id)` method.
 * Anyone calling `wait` is responsible for also calling `release(id)` when the
 * indicator should disappear.
 * It is the caller's responsibility to provide a unique id.
 */
export default function makeSpinner() {
  const queue = [];
  const el = createElement("div", { class: "spinner" });
  document.body.appendChild(el);
  return {
    /**
     * Request a loading indicator to show.  Must call `release(id)` to end indicator.
     * @param {string} id unique id to identify this request
     * @returns {string}
     */
    wait(id) {
      if (queue.length === 0) el.classList.add("loading");
      queue.push(id);
      return id;
    },
    /**
     * Indicate you no longer need a loading indicator to show.
     * @param {string} id unique id to identify which request to release
     */
    release(id) {
      const index = id ? queue.indexOf(id) : -1;
      if (index < 0) return console.error(`bad spinner ID: ${id}`);
      queue.splice(queue.indexOf(id), 1);
      if (queue.length === 0) el.classList.remove("loading");
    },
  };
}
