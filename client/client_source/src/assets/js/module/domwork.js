class ElementWork {
  constructor (selector, flag) {
    if (flag) this.element = selector;
    else this.element = document.querySelector(selector);
  }

  css(style) {
    this.element.style = `${style}`;
  }

  html(html, flag) {
    if (flag) this.element.innerHTML += html;
    else this.element.innerHTML = html;
  }

  on(event, callback) {
    this.element.addEventListener(event, (e) => {
      callback(e);
    });
  }
}

class ElementsWork {
  constructor (selector) {
    this.elements = [...document.querySelectorAll(selector)];
    this.createMethods();
  }

  createMethods() {
    this.elements = this.elements.map(element => {
      return new ElementWork(element, true)
    })
  }
}

const $ = (selector, flag) => {
  if (flag) return new ElementsWork(selector)
  else return new ElementWork(selector)
}

export { $ }