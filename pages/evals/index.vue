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
    const tempData = []
    let data = {}
    await firebase.firestore().collection('storeInfos').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data = { ...doc.data(), ...{ id: doc.id } }
          tempData.push(data)
        })
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
    return { reviews: tempData }
  }
}
</script>
