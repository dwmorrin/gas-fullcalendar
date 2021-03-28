export { createElement, heading, paragraph };

function heading(textContent) {
  return createElement("h1", { textContent });
}

function paragraph(textContent) {
  return createElement("p", { textContent });
}

function createElement(tagName = "div", attr = {}) {
  return attributes(document.createElement(tagName), attr);
}

function attributes(el, attr = {}) {
  // TODO check that el is HTMLElement
  if (typeof attr.textContent === "string") el.textContent = attr.textContent;

  // TODO handle adding multiple classes
  if (typeof attr.class === "string") el.classList.add(attr.class);

  if (typeof attr.onClick === "function")
    el.addEventListener("click", attr.onClick);

  if (typeof attr.onChange === "function")
    el.addEventListener("change", attr.onChange);

  if (typeof attr.checked === "boolean" && attr.checked)
    el.setAttribute("checked", "true");

  if (typeof attr.type === "string") el.setAttribute("type", attr.type);

  if (typeof attr.value === "string") el.setAttribute("value", attr.type);

  if (Array.isArray(attr.children)) {
    attr.children.forEach((child) => child && el.appendChild(child));
  }
  return el;
}
