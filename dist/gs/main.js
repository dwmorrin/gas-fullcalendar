function doGet() {
  const template = HtmlService.createTemplateFromFile("html/index");
  const webpage = template.evaluate();
  return webpage;
}

function include_(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
