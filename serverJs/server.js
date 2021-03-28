import Calendar from "./Calendar";

function doGet() {
  const html = HtmlService.createTemplateFromFile("index");
  html.defaultCalendarId = CalendarApp.getDefaultCalendar().getId();
  html.calendars = CalendarApp.getAllCalendars();
  return html.evaluate().setTitle("Calendar");
}

function getEvents({ id, startStr, endStr }) {
  return JSON.stringify(new Calendar(id, startStr, endStr).events);
}

// assign to globalThis as a way of declaring exports for rollup
globalThis.doGet = doGet;
globalThis.getEvents = getEvents;
