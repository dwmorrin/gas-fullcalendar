import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import "./main.css";
import modal from "./modal";

document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const calendar = new Calendar(calendarEl, {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    initialView: "timeGridWeek",
    nowIndicator: true,
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    eventClick: function (info) {
      modal({
        heading: info.event.title,
        paragraph: `${info.event.startStr} to ${info.event.endStr}`,
      });
    },
    eventSources: [
      {
        events: function (info, successCallback, failureCallback) {
          const { startStr, endStr } = info;
          const cleanup = modal({ heading: "Loading...", noButtons: true });
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
            .getEvents({ id: defaultCalendarId, startStr, endStr });
        },
      },
    ],
  });

  calendar.render();
});
