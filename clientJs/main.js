import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import "./main.css";
import modal from "./modal";
import EventSourceFactory from "./EventSourceFactory";
import checkboxList from "./checkboxList";
import { heading } from "./html";
import makeSpinner from "./spinner";
import eventModal from "./eventModal";

document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const spinner = makeSpinner();
  const EventSource = EventSourceFactory(spinner);

  const calendar = new Calendar(calendarEl, {
    customButtons: {
      calendarPicker: {
        text: "Calendars",
        click: () =>
          modal({
            children: [
              heading("Select calendars"),
              checkboxList(calendarInfo, ({ checked, id }) => {
                const cal = calendarInfo.find((c) => c.id === id);
                if (!cal.checked && checked) {
                  // checking calendar
                  cal.checked = true;
                  addCalendarSource(cal);
                } else {
                  // removing calendar
                  cal.checked = false;
                  removeCalendarSource(cal);
                }
              }),
            ],
          }),
      },
    },
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: "prev,next today calendarPicker",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    initialView: "timeGridWeek",
    nowIndicator: true,
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    eventClick: function (info) {
      eventModal(info.event);
    },
    eventSources: [
      EventSource({
        ...calendarInfo.find(({ checked }) => checked), // first one checked is default
      }),
    ],
  });

  calendar.render();

  function addCalendarSource(cal) {
    calendar.addEventSource(EventSource(cal));
  }

  function removeCalendarSource({ id }) {
    calendar.getEventSourceById(id).remove();
  }
});
