import modal from "./modal";
import { heading, paragraph } from "./html";
import formatDate from "./formatDate";

export default function eventModal({ title, start, end }) {
  return modal({
    children: [
      heading(title),
      paragraph(`${formatDate(start)} - ${formatDate(end)}`),
    ],
  });
}
