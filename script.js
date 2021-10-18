onload = function () {

  Vue.component('goods-item', {
    props: ['item'],
    template: `
        <div class="goods-item">
          <img class="goods-photo" v-bind:src="[ item.img ]" v-bind:alt="[ item.title ]">
          <h3>{{ item.title }}</h3>
          <p>{{ item.price }}</p>
        </div>
    `,
  });

  Vue.component('basket-goods-item', {
    props: ['item'],
    template: `
        <div class="basket-goods-item">
          <div>{{ item.title }}</div>
          <div>{{ item.price }}</div>
        </div>
    `,
  });

  Vue.component('basket-card', {
    template: `
        <div class="basket-card"></div>
    `,
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