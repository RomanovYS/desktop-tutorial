onload = function () {

  Vue.component('goods-item', {
    props: ['item'],
    template: `
        <div class="goods-item">
          <img class="goods-photo" v-bind:src="[ item.img ]" v-bind:alt="[ item.title ]">
          <h3>{{ item.title }}</h3>
          <p>{{ item.price }}$</p>
          <button class="add-button" type="button" >Добавить</button>
        </div>
    `,
  });

  Vue.component('basket-goods-item', {
    props: ['item'],
    template: `
        <div class="basket-goods-item">
          <div style="width:500px;">{{ item.title }}</div>
          <div style="width:100px;">{{ item.price }}</div>
          <div style="width:50px; text-align: center;"><button class="close-button" type="button">X</button></div>
        </div>
        <hr style="margin: 20px 0; padding: 0; height: 0; border: none; border-top: 1px solid #333;">
    `,
  });

  Vue.component('basket-card', {
    template: `
    <div class="basket-top">
        <h3>Корзина товаров</h3>
        <button class="close-button" type="button" v-on:click="offVision">X</button>
    </div>

    `,
    methods: {
      offVision() {
        app.basketCardVision = false;
      },
    },
  });

  const app = new Vue({
    el: '#app',

    data: {
      goods: [
        { id: 1, title: 'Shirt', price: 50, img: 'no_photo.jpg' },
        { id: 2, title: 'Socks', price: 10, img: 'no_photo.jpg' },
        { id: 3, title: 'Jacket', price: 350, img: 'no_photo.jpg' },
        { id: 4, title: 'Shoes', price: 200, img: 'no_photo.jpg' },
        { id: 5, title: 'Coat', price: 550, img: 'no_photo.jpg' },
        { id: 6, title: 'Hat', price: 25, img: 'no_photo.jpg' },
        { id: 7, title: 'Breeches', price: 100, img: 'no_photo.jpg' },
        { id: 8, title: 'Shoes', price: 150, img: 'no_photo.jpg' },
      ],
      filteredGoods: [],
      basketCardVision: false,
      search: "",
    },

    methods: {
      filterGoods() {
        if (this.search > '') {
          this.filteredGoods = this.goods.filter(({ title }) => {
            return new RegExp(this.search, 'i').test(title);
          })
        }
        else {
          this.filteredGoods = this.goods;
        }
      },
      setVision() {
        this.basketCardVision = !this.basketCardVision;
      },
    },

    mounted() {
      this.filteredGoods = this.goods;
    }
  });




}