import modal from "./modal";
import checkboxList from "./checkboxList";
import { heading } from "./html";

export default function selectCalendars({
  calendarInfo,
  addCalendarSource,
  removeCalendarSource,
}) {
  return modal({
    children: [
      heading("Select calendars"),
      checkboxList(calendarInfo, ({ checked, id }) => {
        const cal = calendarInfo.find((c) => c.id === id);
        if (!cal.checked && checked) {
          // checking calendar
          cal.checked = true;
          addCalendarSource(cal);
        } else {
          // removing calendar
          cal.checked = false;
          removeCalendarSource(cal);
        }
        google.script.run.setSelected(cal);
      }),
    ],
  });
}
