import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import "./main.css";
import { createElement } from "./html";

document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const calendar = new Calendar(calendarEl, {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    eventSources: [
      {
        events: function (info, successCallback, failureCallback) {
          const { startStr, endStr } = info;
          const cleanup = modal({ heading: "Loading..." });
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
            .getEvents({ startStr, endStr });
        },
      },
    ],
  });

  calendar.render();
});

function modal({ heading = "", paragraph = "" }) {
  const block = createElement("div", { class: "overlay" });
  const m = createElement("div", { class: "modal" });
  const h1 = createElement("h1", { textContent: heading });
  const p = createElement("p", { textContent: paragraph });
  m.appendChild(h1);
  m.appendChild(p);
  document.body.appendChild(block);
  document.body.appendChild(m);
  return () => {
    m.remove();
    block.remove();
  };
}
