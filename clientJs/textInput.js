import { createElement } from "./html";
import "./textInput.css";

export default function textInput({
  value = "",
  pattern = "",
  title = "",
  onKeyup = () => undefined,
}) {
  return createElement("input", {
    type: "text",
    class: "textInput",
    pattern,
    value,
    title,
    onKeyup,
  });
}
