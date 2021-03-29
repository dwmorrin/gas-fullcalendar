import modal from "./modal";
import { createElement, heading, paragraph } from "./html";
import textInput from "./textInput";
import "./resourceModal.css";

/**
 * @param {FCResource} resource
 */
export default function resourceModal({ resource, calendarInfo }) {
  let inputTouched = false;

  const updateButton = createElement("button", {
    class: "resourceModalHidden",
    textContent: "Update",
  });

  const orderInput = textInput({
    pattern: "[0-9]+",
    value: String(resource.extendedProps.order),
    title: "whole number for ordering",
    onKeyup: () => {
      if (!inputTouched) {
        inputTouched = true;
        updateButton.classList.remove("resourceModalHidden");
      }
    },
  });

  const cleanUp = modal({
    children: [
      heading(resource.title),
      createElement("label", {
        textContent: "Order",
        children: [orderInput, updateButton],
      }),
    ],
  });

  updateButton.addEventListener("click", () => {
    const order = Number(orderInput.value);
    if (isNaN(order) || order < 0)
      return modal({
        children: [paragraph("Invalid order.  Must be whole number.")],
      });
    google.script.run.setOrder({ id: resource.id, order });
    const cal = calendarInfo.find((c) => c.id === resource.id);
    cal.order = order;
    resource.setExtendedProp("order", order);
    cleanUp();
  });
}
