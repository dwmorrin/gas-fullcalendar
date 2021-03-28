/**
 * Utility interface functions for CalendarApp
 */
export { getCalendars };

function getCalendars() {
  return JSON.stringify(CalendarApp.getAllCalendars().map(CalToCalInfo));
}

function CalToCalInfo(cal) {
  return {
    name: cal.getName(),
    id: cal.getId(),
  };
}
