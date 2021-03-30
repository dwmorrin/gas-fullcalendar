import withFailureHandlerHelper from "./withFailureHandlerHelper";

/**
 * https://fullcalendar.io/docs/event-source-object
 *
 * Returns a function for creating event sources.
 *
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
            withFailureHandlerHelper(error);
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
