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
  }
}
</script>

<style>

</style>
