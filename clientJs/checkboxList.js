import { createElement } from "./html";
import "./checkBoxList.css";

/**
 *
 * @param {{name: string; id: string, checked: boolean}[]} calendarInfo
 * @returns {HTMLElement}
 */
export default function checkboxList(calendarInfo, setCalendarInfo) {
  return createElement("div", {
    class: "checkboxList",
    children: calendarInfo.map(({ name, id, checked }) =>
      createElement("label", {
        textContent: name,
        children: [
          createElement("input", {
            type: "checkbox",
            checked,
            onChange: ({ target: { checked } }) =>
              setCalendarInfo({ id, checked }),
          }),
        ],
      })
    ),
  });
}
