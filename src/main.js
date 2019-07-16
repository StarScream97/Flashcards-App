import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueQuillEditor from 'vue-quill-editor'
import './registerServiceWorker'

import '@/assets/css/tailwind.css'
import Toasted from 'vue-toasted';
Vue.use(Toasted, {
  iconPack:'fontawesome',
  duration:3000,
  theme: "outline", 
})


// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, {
  modules: {
    toolbar: [
      ['bold', 'italic'],
      ['link', 'blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }]
    ]
  },
  placeholder: 'Write something amazing!',
  theme: 'snow'
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
