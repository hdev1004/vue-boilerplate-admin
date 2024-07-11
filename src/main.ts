import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import Antd from 'ant-design-vue'
import { VueSpinners } from '@saeris/vue-spinners'

import App from '@/App.vue'
import router from '@/router/index'

const app = createApp(App)

/** Pinia **/
/** https://pinia.vuejs.org/ **/
const pinia = createPinia()
app.use(pinia)
app.use(VueSpinners)
app.use(Antd)

/** Vue Router **/
/** https://router.vuejs.org/ **/
app.use(router)

/** Unhead **/
/** https://unhead.unjs.io/ **/
const head = createHead()
app.use(head)

app.mount('#app')
