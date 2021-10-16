// Функция запроса / ответа на промисах
function makeGETRequest(url, callback) {
  return new Promise((resolve, reject) => {
    console.log('Работает промис');
    let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
    xhr.open("GET", url, true);
    xhr.onload = () => resolve(callback(xhr.responseText));
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

function addBasket(id) {
  cart.addToBasket(id);
};

function deleteItem(id) {
  cart.deleteFromBasket(id);
};

function viewCart() {
  cart.render();
};

class GoodsItem {
  constructor(id, title = 'Товар', price = 'Звоните!', img = 'no_photo.jpg') {
    this.id = id;
    this.title = title;
    this.price = price;
    this.img = img;
  }
  render() {
    return `<div class="goods-item">
                <div class="goods-info">
                  <img class="goods-photo" src="${this.img}" alt="${this.title}">
                  <h3>${this.title}</h3>
                  <p>${this.price}</p>
                </div>
              <button class='addClick' onclick='addBasket(${this.id})'>Добавить</button>
              </div>`;
  }
}


class GoodsList {
  constructor() { this.goods = []; }

  fetchGoods() {
    this.goods = [
      { id: 1, title: 'Shirt', price: 150 },
      { id: 2, title: 'Socks', price: 50 },
      { id: 3, title: 'Jacket', price: 350 },
      { id: 4, title: 'Shoes', price: 250 },
      { id: 5, title: 'Shoes', price: 250 },
      { id: 6, title: 'Shoes', price: 250 },
      { id: 7, title: 'Shoes', price: 250 },
      { id: 8, title: 'Shoes', price: 250 },
    ];
  }

  calcAllGoods() {
    let totalPrice = 0;
    this.goods.forEach((good) => {
      if (good.price !== undefined) {
        totalPrice += good.price;
      }
    });
    let totalGoodsAnswer = "Все товары на сумму $" + totalPrice;
    document.querySelector('.goods-total').innerHTML = totalGoodsAnswer;
  }

  fullPrice() {
    return this.goods.reduce((prev, { price }) => prev + price, 0)
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.id, good.title, good.price, good.img);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}

// Класс элемента корзины
class BasketItem {
  constructor(id, title = 'Товар', price = 'Звоните!', img = 'no_photo.jpg') {
    this.id = id;
    this.title = title;
    this.price = price;
    this.img = img;
  }
  render() {
    return `<div class="basket-item">
                <img src="${this.img}" alt="${this.title}">
                <div class="basket-info">
                  <h3>${this.title}</h3>
                  <p>${this.price}</p>
                </div>
                <button class='deleteItem' onclick='deleteItem(${this.id})'>&times;</button>
              </div>`;
  }
}

class Basket {
  constructor() {
    this.cartGoods = []; // При создании объекта, корзина пустая
  }
  // Добавление товара в корзину (привязываем на нажатие кнопки)
  addToBasket(id) {
    let toBasket;
    list.goods.forEach(function (item) {
      if (id == item.id) {
        toBasket = {
          id: item.id,
          title: item.title,
          price: item.price,
          img: item.img
        }
      }
    });
    this.cartGoods.push(toBasket);
    this.basketCount();
  }

  // Удаление товара из корзины (привязываем на нажатие кнопки)
  deleteFromBasket(id) {
    let getIdElemen;
    this.cartGoods.forEach(function (item, i) {
      let thisId = item.id;
      if (id == thisId) {
        getIdElemen = i;
      }

    });
    this.cartGoods.splice(getIdElemen, 1);
    this.basketCount();
    this.render();
  }

  // Считаем стоимость товаров в корзине
  calcAllGoods() {
    let totalPrice = 0;
    this.cartGoods.forEach((good) => {
      if (good.price !== undefined) {
        totalPrice += good.price;
      }
    });
    let totalGoodsAnswer = "Общая сумма товаров в корзине: $" + totalPrice;
    document.querySelector('.goods-total').innerHTML = totalGoodsAnswer;
  }

  // Считаем количество товаров в корзине и выводим на кнопку
  basketCount() {
    let count = this.cartGoods.length;
    document.getElementById('cartcoint').innerHTML = ' (' + count + ')';
  }

  // Рендер динамического содержимого корзины
  render() {
    let readHtml = '';
    this.cartGoods.forEach((good) => {
      const goodItem = new BasketItem(good.id, good.title, good.price, good.img);
      readHtml += goodItem.render();
    })
    document.querySelector('.goods-list').innerHTML = readHtml;

    if (document.querySelector('.goods-total') == null) {
      document.querySelector('.goods-list').insertAdjacentHTML('afterend', '<div class="goods-total"></div>');
    }

    this.calcAllGoods();
  }
}

const cart = new Basket();  // Создаём новую корзину
const list = new GoodsList(); // создаём новый список товаров

onload = function () {

  list.fetchGoods();
  list.render();
  // console.log('Сумма товаров в списке: ', list.fullPrice())

}