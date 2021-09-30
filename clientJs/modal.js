import { createElement } from "./html";
import "./modal.css";

/**
 * Attaches a blocking pop up display to the document.
 *
 * Can be used as an alert or dialog.
 *
 * The contents are user defined by passing in an array of HTMLElements as
 * the children property.
 *
 * The function returned will remove the modal from the document.
 *
 * By default there will be a button to close the modal and clicking outside
 * the modal will also dismiss it.  This can be disabled to prevent the user
 * from dismissing the dialog.
 *
 * If the timeoutSeconds property is a number greater than 0, then the modal
 * will remove itself after timeoutSeconds seconds.
 *
 * @param {Object} modalProps
 * @returns {() => void} function to remove the modal
 */
export default function modal({
  children,
  noButtons = false,
  timeoutSeconds = 0,
  escapeCanDismiss = true,
}) {
  const block = createElement("div", { class: "overlay" });
  const m = createElement("div", { class: "modal", children });
  document.body.appendChild(block);
  document.body.appendChild(m);

  let cleanUpRan = false;

  const cleanUp = () => {
    if (!cleanUpRan) {
      m.remove();
      block.remove();
      cleanUpRan = true;
    }
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

  if (timeoutSeconds && !isNaN(timeoutSeconds) && timeoutSeconds > 0)
    window.setTimeout(() => cleanUp(), timeoutSeconds * 1000);

  if (escapeCanDismiss)
    window.addEventListener("keyup", ({ key }) => {
      if (key === "Escape") cleanUp();
    });

  return cleanUp;
}
