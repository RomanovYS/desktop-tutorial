onload = function () {

class GoodsItem {
  constructor(title, price) {this.title = title; this.price = price;}
  render() {return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;}
}

class GoodsList {
  constructor() {this.goods = [];}
  
  fetchGoods() {
  this.goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    ];
  }

  fullPrice () {
    return this.goods.reduce((prev, {price}) => prev + price, 0)
  }

  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
      });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}

// наследование от класса Товары - габариты единицы товара
class Dimensions extends GoodsItem {
  constructor() {this.dim = [
    { value: 'height', quantity: 0 },
    { value: 'width', quantity: 0 },
    { value: 'depth', quantity: 0 },
    ];
  }

  capacity() {  // вычисление объёма товара
    return this.dim({height}) * this.dim({width}) * this.dim({depth})
  }
}

// наследование от класса Корзина - скидки на покупки
class Discount extends GoodsList {
  constructor() {
    this.percent = 0; // процент скидки
    this.loyalty = false; // покупаталь со скидочной картой
  }
}

const list = new GoodsList();
list.fetchGoods();
list.render();

console.log('Сумма товаров в списке: ',list.fullPrice())

}