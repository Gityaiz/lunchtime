<template>
  <v-content>
    <v-layout fluid class="justify-center">
      <v-card>
        <map-view
          :map="map"
          :markers="markers"
          @clickedOnMap="clickedOnMap"
          @clickedOnMarker="clickedOnMap"
        />
      </v-card>
    </v-layout>
    <v-layout fluid class="justify-center">
      <div v-if="reviewVisible">
        <reviews-card
          :key="index"
          v-for="(m, index) in markers"
          :review='m'
        />
      </div>
      <post-form
        v-if="postFormVisible"
        :position="map.center"
        @success="postSuccess"
        @failed="postFailed"
      />
    </v-layout>
  </v-content>
</template>

<script>
import MapView from '../components/MapView.vue'
import PostForm from '../components/PostForm.vue'
import ReviewsCard from '../components/ReviewsCard.vue'
import firebase from '../plugins/firebase.js'
export default {
  components: {
    MapView,
    PostForm,
    ReviewsCard
  },
  data () {
    return {
      map: {
        center: { lat: 35.696096, lng: 139.776776 },
        zoom: 15,
        style: 'width: 100vw; height: 60vh'
      },
      markers: [],
      fullScreenMap: false,
      reviewVisible: true,
      postFormVisible: false,
      reviews: {}
    }
  },
  // asyncDataはpagesコンポーネントでのみ使用できる
  async asyncData (context) {
    // firebaseのデータfetch
    const querySnapshot = await firebase.firestore().collection('storeInfos').get()
    const records = querySnapshot.docs.map(elem => elem.data())
    if (records.length > 0) {
      console.log('rec >', records)
      return { markers: records }
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
      console.log('clickedOnMap > center', center)
      this.map.style = 'width: 100vw; height: 30vh'
      this.map.center = center
      this.fullScreenMap = false
      this.reviewVisible = false
      this.postFormVisible = true
    },
    setFullscreenMap () {
      this.map.style = 'width: 100vw; height: 90vh'
      this.fullScreenMap = true
      this.reviewVisible = false
      this.postFormVisible = false
    },
    postSuccess () {
      this.map.style = 'width: 100vw; height: 90vh'
      this.fullScreenMap = false
      this.reviewVisible = true
      this.postFormVisible = false
    },
    postFailed () {
      this.map.style = 'width: 100vw; height: 90vh'
      this.fullScreenMap = false
      this.reviewVisible = true
      this.postFormVisible = false
    }
  }
}
</script>

<style>

</style>
