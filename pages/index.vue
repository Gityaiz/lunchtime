<template>
  <v-content>
    <v-layout fluid>
      <v-card>
        <map-view
          :map="map"
          :markers="markers"
          @clickedOnMap="clickedOnMap"
        />
        <v-btn
          v-if="btnShow"
          block
          color="blue-grey"
          @click="setDefaultView()"
        >
          地図を最大表示に戻す
        </v-btn>
      </v-card>
    </v-layout>
  </v-content>
</template>

<script>
import MapView from '../components/MapView.vue'
export default {
  components: {
    MapView
  },
  data () {
    return {
      map: {
        center: { lat: 35.696096, lng: 139.776776 },
        zoom: 15,
        style: 'width: 100vw; height: 90vh'
      },
      markers: [
        { position: { lat: 35.696096, lng: 139.776776 }, info: 'infoinfoinfo' },
        { position: { lat: 35.0, lng: 139.0 }, info: 'infoinfoinfo' }
      ],
      btnShow: false
    }
  },
  async mounted () {
    if (!navigator.geolocation) {
      // 現在位置を取得できない場合はデフォルトのmapオブジェクトをそのまま使用する
    } else {
      // 現在位置をマップの中央にセット
      await navigator.geolocation.getCurrentPosition((position) => {
        this.map.center.lat = position.coords.latitude
        this.map.center.lng = position.coords.longitude
      })
    }
  },
  methods: {
    clickedOnMap (center) {
      this.map.style = 'width: 100vw; height: 30vh'
      this.map.center = center
      this.btnShow = true
    },
    setDefaultView () {
      this.map.style = 'width: 100vw; height: 90vh'
      this.btnShow = false
    }
  }
}
</script>

<style>

</style>
