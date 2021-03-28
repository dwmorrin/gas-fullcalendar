import modal from "./modal";
import { heading, paragraph } from "./html";

/**
 * https://fullcalendar.io/docs/event-source-object
 */
export default function EventSource({ color = "blue", id, withModal = false }) {
  return {
    id,
    color,
    events: function (info, successCallback, failureCallback) {
      const { startStr, endStr } = info;
      const cleanup = withModal
        ? modal({ children: [heading("Loading...")], noButtons: true }) //! side-effect: displays modal
        : () => undefined;
      google.script.run
        .withFailureHandler((error) => {
          failureCallback(error);
          cleanup();
          modal({
            children: [heading("Server error"), paragraph(error.message)],
          });
        })
        .withSuccessHandler((events) => {
          successCallback(JSON.parse(events));
          cleanup();
        })
        .getEvents({ id, startStr, endStr });
    },
  };
}
