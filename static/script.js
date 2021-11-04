onload = function () {

  const GET_GOODS_URL = "http://localhost:8000/goods.json";
  const GET_BASKET_GOODS_URL = "http://localhost:8000/basket-goods.json";
  const ADD_GOOD_URL = "http://localhost:8000/api";

  const service = (method, path, body) => (
    new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, path, true);
      if (body) {
        xhr.setRequestHeader("Content-type", "application/json");
      }
      xhr.send(body);
      xhr.onload = (event) => {
        resolve(JSON.parse(event.target.response));
      }
    })
  );
  
  Vue.component('goods-item', {
    props: ['item'],
    template: `
        <div class="goods-item">
          <img class="goods-photo" v-bind:src="[ item.img ]" v-bind:alt="[ item.title ]">
          <h3>{{ item.title }}</h3>
          <p>{{ item.price }}$</p>
          <button id="elem" class="add-button" type="button" v-on:click="addGood" >Добавить</button>
        </div>
    `,
    methods: {
      addGood() {
        id = this.item.id;
        title = this.item.title;
        price = this.item.price;
        service('PATCH', ADD_GOOD_URL, JSON.stringify({
          id,
          title,
          price
        })).then((_basketGoods) => {
          this.basketGoods = _basketGoods;
        })
        console.log('click');
      }
    }
  });

  Vue.component('basket-goods-item', {
    props: ['item'],
    template: `
        <div class="basket-goods-item">
          <div style="width:500px;">{{ item.title }}</div>
          <div style="width:100px;">{{ item.price }}</div>
          <div style="width:50px; text-align: center;"><button class="close-button" type="button">X</button></div>
        </div>
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
      goods: [],
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
      service('GET', GET_GOODS_URL).then((goods) => {
        this.goods = goods;
        this.filteredGoods = goods;
      })
      service('GET', GET_BASKET_GOODS_URL).then((basketGoods) => {
        this.goods = basketGoods;
      })


    }
  });

}