import { createElement } from "./html";
import "./modal.css";

export default function modal({ children, noButtons = false }) {
  const block = createElement("div", { class: "overlay" });
  const m = createElement("div", { class: "modal", children });
  document.body.appendChild(block);
  document.body.appendChild(m);
  const cleanUp = () => {
    m.remove();
    block.remove();
  };
  if (!noButtons) {
    // allow clicking away from modal to dismiss
    block.addEventListener("click", cleanUp);
    m.appendChild(
      createElement("button", {
        textContent: "Close",
        onClick: cleanUp,
      })
    );
  }
  return cleanUp;
}
