import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import * as firebase from 'firebase/app'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyB2mnnOoVwBBCai0vkdMhnyiS4u6KVGHNM',
  authDomain: 'photo-5a937.firebaseapp.com',
  databaseURL: 'https://photo-5a937.firebaseio.com',
  projectId: 'photo-5a937',
  storageBucket: 'photo-5a937.appspot.com',
  messagingSenderId: '131336010546',
  appId: '1:131336010546:web:6e74e9c7e52ea2e559f52b',
}
firebase.initializeApp(firebaseConfig)

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
