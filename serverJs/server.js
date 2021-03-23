import env from "./env";

function doGet() {
  return HtmlService.createHtmlOutputFromFile("index");
}

function getEvents({startStr, endStr}) {
  return JSON.stringify(
    CalendarApp.getCalendarById(env.defaultCalendarId)
      .getEvents(new Date(startStr), new Date(endStr))
      .map(CalEventToFCEvent)
  );
}

function CalEventToFCEvent(calEvent) {
  return {
    title: calEvent.getTitle(),
    start: calEvent.getStartTime().toJSON(),
    end: calEvent.getEndTime().toJSON(),
  };
}

// assign to globalThis as a way of declaring exports for rollup
globalThis.doGet = doGet;
globalThis.getEvents = getEvents;