import modal from "./modal";
import { heading, paragraph } from "./html";

/**
 * Only for use a google.script.run.withFailureHandler callback function.
 *
 * Screens for known errors and handles accordingly.
 *
 * If an unknown error occurs, a modal (with timeout) is displayed to the
 * user.
 *
 * @param {Error} error
 */
export default function withFailureHandlerHelper(error) {
  if (error && typeof error.message === "string") {
    // known errors that can be ignored
    if (/DEADLINE_EXCEEDED/.test(error.message)) {
      return console.warn("Caught DEADLINE_EXCEEDED error. Ignoring.");
    }
    console.error("unhandled error", error);
    displayServerError(error.message);
  } else {
    // either error is falsy or error.message is not a string
    console.error("unknown error, no error message", error);
    displayServerError("The server did not give a message.");
  }
}

function displayServerError(message) {
  modal({
    children: [heading("Server error"), paragraph(message)],
    timeoutSeconds: 15,
  });
}
