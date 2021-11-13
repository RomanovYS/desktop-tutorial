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