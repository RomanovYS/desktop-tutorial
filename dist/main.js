onload=function(){const t=(t,e,o)=>new Promise((i=>{const s=new XMLHttpRequest;s.open(t,e,!0),o&&s.setRequestHeader("Content-type","application/json"),s.send(o),s.onload=t=>{i(JSON.parse(t.target.response))}}));Vue.component("goods-item",{props:["item"],template:'\n        <div class="goods-item">\n          <img class="goods-photo" v-bind:src="[ item.img ]" v-bind:alt="[ item.title ]">\n          <h3>{{ item.title }}</h3>\n          <p>{{ item.price }}$</p>\n          <button id="elem" class="add-button" type="button" v-on:click="addGood" >Добавить</button>\n        </div>\n    ',methods:{addGood(){id=this.item.id,title=this.item.title,price=this.item.price,t("PATCH","http://localhost:8000/api",JSON.stringify({id,title,price})).then((t=>{this.basketGoods=t})),console.log("click")}}}),Vue.component("basket-goods-item",{props:["item"],template:'\n        <div class="basket-goods-item">\n          <div style="width:500px;">{{ item.title }}</div>\n          <div style="width:100px;">{{ item.price }}</div>\n          <div style="width:50px; text-align: center;"><button class="close-button" type="button">X</button></div>\n        </div>\n    '}),Vue.component("basket-card",{template:'\n    <div class="basket-top">\n        <h3>Корзина товаров</h3>\n        <button class="close-button" type="button" v-on:click="offVision">X</button>\n    </div>\n\n    ',methods:{offVision(){e.basketCardVision=!1}}});const e=new Vue({el:"#app",data:{goods:[],filteredGoods:[],basketCardVision:!1,search:""},methods:{filterGoods(){this.search>""?this.filteredGoods=this.goods.filter((({title:t})=>new RegExp(this.search,"i").test(t))):this.filteredGoods=this.goods},setVision(){this.basketCardVision=!this.basketCardVision}},mounted(){t("GET","http://localhost:8000/goods.json").then((t=>{this.goods=t,this.filteredGoods=t})),t("GET","http://localhost:8000/basket-goods.json").then((t=>{this.goods=t}))}})};