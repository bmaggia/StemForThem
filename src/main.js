import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from "vue";
import VueLodash from 'vue-lodash'
import './plugins/bootstrap-vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import axios from "axios";

require("firebase/firestore");

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

const firebaseConfig = {
  apiKey: "AIzaSyD1YYRMKbj7C9xxjVA38boDJrsYQCuIi1c",
  authDomain: "hacklahoma-8a927.firebaseapp.com",
  databaseURL: "https://hacklahoma-8a927.firebaseio.com",
  projectId: "hacklahoma-8a927",
  storageBucket: "hacklahoma-8a927.appspot.com",
  messagingSenderId: "1012350816592",
  appId: "1:1012350816592:web:a4d286c53a28704f92dc55",
  measurementId: "G-K5N9WL8RLF"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
const options = { name: 'lodash' }
Vue.use(VueLodash, options)

export const _ = require('lodash');


let app;

firebase.auth().onAuthStateChanged(user => {
  console.log("user", user);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});

// app = new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount("#app");
