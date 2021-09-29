export class Products {
  createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (tagName) element.className += className
    if (text) element.innerHTML = text;
    return element;
  }
}