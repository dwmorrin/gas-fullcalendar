import FCEvent from "./FCEvent";

/**
 * CalendarApp Calendar interface
 */
export default class Calendar {
  constructor(id, startStr, endStr) {
    this.calendar = CalendarApp.getCalendarById(id);
    this.start = new Date(startStr);
    this.end = new Date(endStr);
  }

  get events() {
    return this.calendar
      .getEvents(this.start, this.end)
      .map((gCalEvent) => new FCEvent(gCalEvent));
  }
}
