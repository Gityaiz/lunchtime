<template>
  <v-content>
    <v-app-bar
      dense
      dark
    >
      <v-toolbar-title>{{ !!title ? title : '名無し' }}</v-toolbar-title>
    </v-app-bar>
    <v-layout fluid class="justify-center">
      <v-card>
        <review
          :key="index"
          v-for="(r, index) in reviews"
          :review="r"
        />
      </v-card>
    </v-layout>
  </v-content>
</template>
<script>
import Review from '../../../components/Review.vue'
import firebase from '../../../plugins/firebase.js'

export default {
  components: {
    Review
  },
  data () {
    return {
      reviews: [],
      title: ''
    }
  },
  async asyncData (context) {
    let tempData = []
    let tempTitle = ''
    await firebase.firestore().collection('storeInfos').doc(context.params.id).get()
      .then((doc) => {
        if (doc.exists) {
          tempData = doc.data().eval
          tempTitle = doc.data().name
        } else {
          console.log('No such document!')
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error)
      })
    return { reviews: tempData, title: tempTitle }
  }
}
</script>
