import { urls } from './module/requesturl';
import { $ } from './module/domwork';
import { Product } from './module/product.js';


class ProductsWork {
  constructor() {
    this.productsWrap = $('.section-products--inner').element;
  }
  
  removeChilds(parent) {
    while (parent.firstChild) parent.removeChild(parent.firstChild);
  }

  createProduct(product) {
    let readyRroduct = new Product(`${location.href}${product.imgurl}`, product.name, product.description, product.cost, product.pageurl)
    readyRroduct.append();
    return readyRroduct;
  }
  
  append(products) {
    products.forEach(product => {
      this.productsWrap.append(this.createProduct(product).product);
    });
  }

  renderer(products) {
    this.removeChilds(this.productsWrap);
    this.append(products);
  }
}


class Requests extends ProductsWork {
  constructor() {
    super();
  }

  readyResponce(url, type, responceHandler, errorHandler = (error) => console.error(error)) {
    this.request(url, type)
      .then(responce => {
        responceHandler(responce)
      })
      .catch(error => {
        errorHandler(error);
      })
  }

  request (url, type = 'GET') {
    const xhr = new XMLHttpRequest();
    
    return new Promise((resolve, reject) => {
      xhr.open(type, url);
  
      xhr.addEventListener('readystatechange', () =>  {
        if(xhr.readyState === 4 && xhr.status === 200) {
          resolve(JSON.parse(xhr.response));
        } else if (xhr.status !== 200) {
          reject(xhr.status, xhr);
        }
      })
  
      xhr.send();
    })
  }
}

class Screening extends Requests {
  constructor() {
    super();

    this.buttonFlagPosition = true;
    this.constLength = 6
    this.length = this.constLength;
    this.products = {
      allData: [],
      changeData: [],
      currentData: []
    }
  }

  getButtonFlagPosition() {
    return this.buttonFlagPosition;
  }
  
  init() {
    this.zeroing()

    super.readyResponce(urls.main, 'GET', (products) => {
      let all = products.flat(Infinity);
      this.products.allData = all;
      this.products.currentData = all;

      this.partRenderer();
    })
  }
  
  sidebar(url) {
    this.zeroing()

    super.readyResponce(url, 'GET', (products) => {
      this.products.currentData = products.flat(Infinity);

      this.partRenderer();
    });
  }

  search(searchstring) {
    this.zeroing()

    const pattern = new RegExp(searchstring, 'gim');

    this.products.allData.forEach(item => {
      if(item.name.search(pattern) != -1) {

        this.products.currentData.push(item);
        
      }
    })

    this.partRenderer();
  }

  partRenderer() {
    this.products.changeData = [];

    this.products.currentData.forEach((currentData, i) => {
      if (this.length > i) {
        this.products.changeData.push(currentData);
      }
    })

    super.renderer(this.products.changeData);
  }

  addLenth() {
    this.length += this.constLength;

    if (this.length >= this.products.currentData.length) {
      this.buttonFlagPosition = false;
    }

    this.partRenderer()
    // console.log(this.length);
  }

  zeroing() {
    $('.add-product__button').css("display: block;")

    this.buttonFlagPosition = true;
    this.products.currentData = [];
    this.length = this.constLength;
    console.log(this.buttonFlagPosition);
  }
  
}


class Handler extends Screening {
  constructor() {
    super();

    this.items = $('.sidebar__item', true);
    this.input = $('.search');
    this.button = $('.add-product__button');
  }

  sidebarClick() {
    this.items.elements.forEach((item, i) => {
      item.on('click', (e) => {
        let urlRequest = urls[Object.keys(urls)[i]];
        super.sidebar(urlRequest);
      })
    })
  }

  windowLoaded() {
    window.addEventListener('DOMContentLoaded', () => {
      super.init();
    })
  }

  searchInput() {
    this.input.on('input', () => {
      super.search(this.input.element.value);
    })
  }

  add() {
    this.button.on('click', () => {

      if (super.getButtonFlagPosition()) {
        super.addLenth();
      } else {
        this.button.css('display: none');
      }
    })
  }
}

const handler = new Handler();

handler.sidebarClick();
handler.searchInput();
handler.windowLoaded();
handler.add();

$('.del-sidebar').on('click', () => {
 $('.del-sidebar').element.classList.toggle('block')

 if ($('.del-sidebar').element.classList.contains('block')) {
  $('.sidebar').css('display: block;');
 } else {
  $('.sidebar').css('display: none;');
 }
})

$(".gdz__link").on('click', () => {
  $('.gdz').element.classList.toggle('block')
console.log($('.gdz'))
 if ($('.gdz').element.classList.contains('block')) {
  $('.gdz').css('display: block;');

  let timerId = setInterval(() => {
    let counter = $('.gdz__counter').element.innerHTML;
    $('.gdz__counter').element.innerHTML = (counter - 1);

    if (parseInt($('.gdz__counter').element.innerHTML) == 0) {
      clearInterval(timerId);

      $('.gdz__counter').css('font-size: 16px;')
      $('.gdz__counter').element.innerHTML = 'С вашего счета снято 40 рублей'
    }
  }, 1000);

 } else {
  $('.gdz').css('display: none;');
 }
})

