import modal from "./modal";

/**
 * https://fullcalendar.io/docs/event-source-object
 */
export default function EventSource({ color, id, withModal = false }) {
  return {
    color,
    events: function (info, successCallback, failureCallback) {
      const { startStr, endStr } = info;
      const cleanup = withModal
        ? modal({ heading: "Loading...", noButtons: true }) //! side-effect: displays modal
        : () => undefined;
      google.script.run
        .withFailureHandler((error) => {
          failureCallback(error);
          cleanup();
          modal({ heading: "Server error", paragraph: error.message });
        })
        .withSuccessHandler((events) => {
          successCallback(JSON.parse(events));
          cleanup();
        })
        .getEvents({ id, startStr, endStr });
    },
  };
}
