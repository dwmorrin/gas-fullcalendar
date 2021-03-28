import { createElement } from "./html";

export default function modal({
  heading = "",
  paragraph = "",
  noButtons = false,
}) {
  const block = createElement("div", { class: "overlay" });
  const m = createElement("div", {
    class: "modal",
    children: [
      createElement("h1", { textContent: heading }),
      createElement("p", { textContent: paragraph }),
    ],
  });
  document.body.appendChild(block);
  document.body.appendChild(m);
  const cleanUp = () => {
    m.remove();
    block.remove();
  };
  if (!noButtons) {
    m.appendChild(
      createElement("button", {
        textContent: "Close",
        onClick: cleanUp,
      })
    );
  }
  return cleanUp;
}
