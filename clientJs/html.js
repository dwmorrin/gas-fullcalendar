export { createElement };

function createElement(tagName = "div", attr = {}) {
  return attributes(document.createElement(tagName), attr);
}

function attributes(el, attr = {}) {
  // TODO check that el is HTMLElement
  if (typeof attr.textContent === "string") el.textContent = attr.textContent;

  // TODO handle adding multiple classes
  if (typeof attr.class === "string") el.classList.add(attr.class);
  return el;
}
