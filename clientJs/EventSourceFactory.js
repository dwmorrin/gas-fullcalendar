import modal from "./modal";
import { heading, paragraph } from "./html";

/**
 * https://fullcalendar.io/docs/event-source-object
 * @param {Object} spinner see "spinner.js", passed in so it can be shared
 */
export default function EventSourceFactory(spinner) {
  return ({ color = "blue", id = "" }) => {
    return {
      id,
      color,
      events: function (info, successCallback, failureCallback) {
        const { startStr, endStr } = info;
        spinner.wait(id);
        google.script.run
          .withFailureHandler((error) => {
            spinner.release(id);
            failureCallback(error);
            modal({
              children: [heading("Server error"), paragraph(error.message)],
            });
          })
          .withSuccessHandler((events) => {
            spinner.release(id);
            successCallback(JSON.parse(events));
          })
          .getEvents({ id, startStr, endStr });
      },
    };
  };
}
