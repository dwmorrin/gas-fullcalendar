import Calendar from "./Calendar";
import SelectedCalendars from "./SelectedCalendars";

function doGet() {
  const html = HtmlService.createTemplateFromFile("index");
  const selected = SelectedCalendars();
  html.calendars = CalendarApp.getAllCalendars().map((cal) =>
    selected.getStoredProperties(Calendar.getInfo(cal))
  );
  return html
    .evaluate()
    .setTitle("Calendar")
    .addMetaTag("viewport", "width=device-width");
}

function getEvents({ id, startStr, endStr }) {
  return JSON.stringify(new Calendar(id, startStr, endStr).events);
}

function setSelected(calendar) {
  SelectedCalendars().setSelected(calendar);
}

function setOrder(calendar) {
  SelectedCalendars().setOrder(calendar);
}

// assign to globalThis as a way of declaring exports for rollup
globalThis.doGet = doGet;
globalThis.getEvents = getEvents;
globalThis.setSelected = setSelected;
globalThis.setOrder = setOrder;
