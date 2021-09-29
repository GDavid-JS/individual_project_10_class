import { Products } from './products.js';

export class Product extends Products {
  constructor(url, title, description, cost, pageurl) {
    super();

    this.product = super.createElement('div', 'product');
    this.img = super.createElement('div', 'product__img');
    this.title = super.createElement('h3', 'product__title', title);
    this.description = super.createElement('h3', 'product__description', description);
    this.productInner = super.createElement('div', 'product--inner');
    this.link = super.createElement('a', 'product__link', 'Подробнее');
    this.paragraph = super.createElement('p', 'product__cost', cost);
    
    this.img.style = `background-image: url('${url}');`;
    this.img.title = title;

    this.link.href = pageurl;
  }
  append() {
    this.product.append(this.img)
    this.product.append(this.title)
    this.product.append(this.description)
    this.product.append(this.productInner)

    this.productInner.append(this.link)
    this.productInner.append(this.paragraph)
  }
}
