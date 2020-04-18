<template>
  <v-content>
    <v-layout fluid class="justify-center">
      <v-card>
        <reviews-card
          :key="index"
          v-for="(r, index) in reviews"
          :review="r"
        />
      </v-card>
    </v-layout>
  </v-content>
</template>
<script>
import ReviewsCard from '../../components/ReviewsCard.vue'
import firebase from '../../plugins/firebase.js'

export default {
  components: {
    // PostForm,
    ReviewsCard
  },
  data () {
    return {
      reviews: []
    }
  },
  // asyncDataはpagesコンポーネントでのみ使用できる
  async asyncData (context) {
    // firebaseのデータfetch
    const querySnapshot = await firebase.firestore().collection('storeInfos').get()
    const records = querySnapshot.docs.map(elem => elem.data())
    if (records.length > 0) {
      return { reviews: records }
    }
  }
}
</script>
