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
          v-if="!fullScreenMap"
          @click="setDefaultView()"
          block
          color="blue-grey"
        >
          地図を最大表示に戻す
        </v-btn>
      </v-card>
    </v-layout>
    <v-container>
      <post-form
        v-if="!fullScreenMap"
        @success="postSuccess"
        @failed="postFailed"
      />
    </v-container>
  </v-content>
</template>

<script>
import MapView from '../components/MapView.vue'
import PostForm from '../components/PostForm.vue'
import firebase from '../plugins/firebase.js'
export default {
  components: {
    MapView,
    PostForm
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
      fullScreenMap: true,
      test: 'asd'
    }
  },
  asyncData (context) {
    const data = firebase.firestore().collection('maps').get()
    return { test: data }
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
      this.fullScreenMap = false
    },
    setDefaultView () {
      this.map.style = 'width: 100vw; height: 90vh'
      this.fullScreenMap = true
    },
    postSuccess () {
      this.map.style = 'width: 100vw; height: 90vh'
      this.fullScreenMap = true
    },
    postFailed () {
      this.map.style = 'width: 100vw; height: 90vh'
      this.fullScreenMap = true
    }
  }
}
</script>

<style>

</style>
