/**
 * Interface to FC resource object
 * https://fullcalendar.io/docs/resource-object
 */
export default class FCResource {
  /**
   * Translates Google's data structure to FullCalendar
   * @param {Object} calInfo data passed from Google Calendar APIs
   */
  constructor({ id, name, order = 0 }) {
    this.id = id;
    this.title = name;
    // extendedProps; get with resourceObjectInstance.extendedProps.order
    this.order = order;
  }
}
