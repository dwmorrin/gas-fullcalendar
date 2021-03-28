function doGet() {
  const html = HtmlService.createTemplateFromFile("index");
  html.defaultCalendarId = CalendarApp.getDefaultCalendar().getId();
  return html.evaluate().setTitle("Calendar");
}

function getCalendars() {
  return JSON.stringify(CalendarApp.getAllCalendars().map(CalToCalInfo));
}

function CalToCalInfo(cal) {
  return {
    name: cal.getName(),
    id: cal.getId(),
  };
}

function getEvents({ id, startStr, endStr }) {
  return JSON.stringify(
    CalendarApp.getCalendarById(id)
      .getEvents(new Date(startStr), new Date(endStr))
      .map(CalEventToFCEvent)
  );
}

function CalEventToFCEvent(calEvent) {
  return {
    title: calEvent.getTitle(),
    start: calEvent.getStartTime().toJSON(),
    end: calEvent.getEndTime().toJSON(),
    allDay: calEvent.isAllDayEvent(),
  };
}

// assign to globalThis as a way of declaring exports for rollup
globalThis.doGet = doGet;
globalThis.getCalendars = getCalendars;
globalThis.getEvents = getEvents;
