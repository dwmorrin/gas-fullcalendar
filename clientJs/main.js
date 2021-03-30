import { Calendar } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import "./main.css";
import EventSourceFactory from "./EventSourceFactory";
import makeSpinner from "./spinner";
import eventModal from "./eventModal";
import resourceModal from "./resourceModal";
import selectCalendars from "./selectCalendars";
import FCResource from "./FCResource";

document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  const spinner = makeSpinner();
  const EventSource = EventSourceFactory(spinner);

  const eventSources = calendarInfo.reduce(
    (sources, cal) => (cal.checked ? [...sources, EventSource(cal)] : sources),
    []
  );

  const resources = calendarInfo.reduce(
    (sources, cal) =>
      cal.checked ? [...sources, new FCResource(cal)] : sources,
    []
  );

  const calendar = new Calendar(calendarEl, {
    customButtons: {
      calendarPicker: {
        text: "Calendars",
        click: () =>
          selectCalendars({
            calendarInfo,
            addCalendarSource,
            removeCalendarSource,
          }),
      },
    },
    plugins: [interactionPlugin, resourceTimelinePlugin],
    headerToolbar: {
      left: "prev,next today calendarPicker",
      center: "title",
      right: "resourceTimelineMonth,resourceTimelineWeek,resourceTimelineDay",
    },
    initialView: "resourceTimelineDay",
    nowIndicator: true,
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    dayMaxEvents: true, // allow "more" link when too many events
    eventClick: function (info) {
      eventModal(info.event);
    },
    eventSources,
    resources,
    resourceLabelDidMount: function ({ resource, el }) {
      el.classList.add("clickable");
      el.addEventListener("click", () =>
        resourceModal({ resource, calendarInfo })
      );
    },
    resourceOrder: "order",
    schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",
  });

  calendar.render();

  window.setInterval(() => calendar.refetchEvents(), 3 * 60 * 1000);

  function addCalendarSource(cal) {
    calendar.addEventSource(EventSource(cal));
    calendar.addResource(new FCResource(cal));
  }

  function removeCalendarSource({ id }) {
    calendar.getEventSourceById(id).remove();
    calendar.getResourceById(id).remove();
  }
});
