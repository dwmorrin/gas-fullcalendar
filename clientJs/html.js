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
  const warn = (message) => console.warn(message, { el, attr });
  for (const key in attr) {
    switch (key) {
      case "textContent":
        if (typeof attr.textContent === "string")
          el.textContent = attr.textContent;
        else warn("Ignored non-string textContent");
        break;
      case "class":
        // for multiple classes, use white space as separator: "classA classB"
        if (typeof attr.class === "string")
          el.classList.add(...attr.class.trim().split(/\s+/));
        else warn("Ignored non-string class");
        break;
      case "onClick":
        if (typeof attr.onClick === "function")
          el.addEventListener("click", attr.onClick);
        else warn("Ignored non-function onClick");
        break;
      case "onChange":
        if (typeof attr.onChange === "function")
          el.addEventListener("change", attr.onChange);
        else warn("Ignored non-function onClick");
        break;
      case "onKeyup":
        if (typeof attr.onKeyup === "function")
          el.addEventListener("keyup", attr.onKeyup);
        else warn("Ignored non-function onKeyup");
        break;
      case "checked":
        if (typeof attr.checked === "boolean")
          attr.checked && el.setAttribute("checked", "true");
        else warn("Ignored non-boolean checked");
        break;
      case "type":
        if (typeof attr.type === "string") el.setAttribute("type", attr.type);
        else warn("Ignored non-string input type");
        break;
      case "value":
        if (typeof attr.value === "string")
          el.setAttribute("value", attr.value);
        else warn("Ignored non-string input value");
        break;
      case "pattern":
        if (typeof attr.pattern === "string")
          el.setAttribute("pattern", attr.pattern);
        else warn("Ignored non-string input pattern");
        break;
      case "title":
        if (typeof attr.title === "string")
          el.setAttribute("title", attr.title);
        else warn("Ignored non-string input title");
        break;
      case "children":
        if (Array.isArray(attr.children))
          attr.children.forEach((child) => child && el.appendChild(child));
        else warn("Ignored non-array children");
        break;
      default:
        warn(`Ignored HTMLElement attribute: ${key}`);
    }
  }

  return el;
}
