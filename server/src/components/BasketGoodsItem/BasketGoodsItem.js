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
