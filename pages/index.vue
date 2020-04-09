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
        :position="map.center"
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
      markers: [],
      fullScreenMap: true
    }
  },
  async asyncData (context) {
    const querySnapshot = await firebase.firestore().collection('storeInfos').get()
    const records = querySnapshot.docs.map(elem => elem.data())
    const markers = []
    if (records.length > 0) {
      records.forEach((v) => {
        markers.push({ position: v.position })
      })
    }
    return { markers }
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
      console.log(center)
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
