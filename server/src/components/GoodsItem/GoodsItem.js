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
