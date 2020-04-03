<template>
  <v-container fluid>
    <map-view
      :map="map"
      :markers="markers"
    />
  </v-container>
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
        style: 'width: 100vw; height: 80vh'
      },
      markers: [
        { position: { lat: 35.696096, lng: 139.776776 }, info: 'infoinfoinfo' },
        { position: { lat: 35.0, lng: 139.0 }, info: 'infoinfoinfo' }
      ]
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
  }
}
</script>

<style>

</style>
