/**
 * FullCalendar Event interface
 */
export default class FCEvent {
  constructor(gCalEvent) {
    this.title = gCalEvent.getTitle();
    this.start = gCalEvent.getStartTime().toJSON();
    this.end = gCalEvent.getEndTime().toJSON();
    this.allDay = gCalEvent.isAllDayEvent();
    // temporarily tying together Calendar ID and FC resource ID
    this.resourceId = gCalEvent.getOriginalCalendarId();
  }
}
