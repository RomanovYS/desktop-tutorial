import { GET_GOODS_URL, GET_BASKET_GOODS_URL, ADD_GOOD_URL } from './constants';
import { service } from './services';
import * as components from './components';

onload = function () {

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