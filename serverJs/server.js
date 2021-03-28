import Calendar from "./Calendar";
import { getCalendars } from "./CalendarAppUtils";

function doGet() {
  const html = HtmlService.createTemplateFromFile("index");
  html.defaultCalendarId = CalendarApp.getDefaultCalendar().getId();
  return html.evaluate().setTitle("Calendar");
}

function getEvents({ id, startStr, endStr }) {
  return JSON.stringify(new Calendar(id, startStr, endStr).events);
}

// assign to globalThis as a way of declaring exports for rollup
globalThis.doGet = doGet;
globalThis.getCalendars = getCalendars;
globalThis.getEvents = getEvents;
