import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import "./main.css";

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
    events: function(info, successCalback, failureCallback) {
      const {startStr, endStr} = info;
      const cleanup = modal();
      google.script.run
        .withFailureHandler(failureCallback)
        .withSuccessHandler(events => {
          successCalback(JSON.parse(events))
          cleanup();
        })
        .getEvents({startStr, endStr});
        },
  });

  calendar.render();
});

function modal() {
  const block = document.createElement("div");
  block.classList.add("overlay");
  document.body.appendChild(block);
  const m = document.createElement("div");
  m.classList.add("modal");
  const h1 = document.createElement("h1");
  h1.textContent = "Loading...";
  m.appendChild(h1);
  document.body.appendChild(m);
  return () => {
    m.remove();
    block.remove();
  };
}