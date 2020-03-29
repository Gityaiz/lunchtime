import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.API_KEY,
    libraries: 'places',
    region: 'JP',
    language: 'ja'
  }
})
Vue.config.productionTip = false
