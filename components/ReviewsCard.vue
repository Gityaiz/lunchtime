<template>
  <v-card
    @click="cardClicked"
    max-width="400px"
  >
    <v-img
      :src="review.eval[0].imagePath"
      class="white--text align-end"
      height="200px"
    >
      <v-card-title>{{ review.name }}</v-card-title>
    </v-img>
    <v-card-text>
      <v-col>
        <v-row>
          <div class="text--primary">
            {{ review.eval[0].memo }}
          </div>
        </v-row>
        <v-row>
          <v-rating
            :value="review.eval[0].rank"
            color="amber"
            dense
            readonly
          />
        </v-row>
      </v-col>
    </v-card-text>

    <v-card-actions>
      <v-list-item-avatar color="grey darken-3">
        <v-img
          :src="reviewerProfileImageCdnPath"
          class="elevation-6"
        />
      </v-list-item-avatar>
      <p v-if="review.eval.length > 1">
        他{{ review.eval.length -1 }}件の評価
      </p>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import firebase from '../plugins/firebase.js'

export default {
  props: {
    review: {
      type: Object,
      default: () => ({
        eval: [
          {
            imagePath: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
            memo: 'default memo',
            name: 'default writer',
            uid: 'default uid',
            rank: 0
          }
        ],
        name: 'store name',
        position: { lat: 35.645975156820924, lng: 139.59070195708614 }
      })
    }
  },
  data () {
    return {
      reviewerProfileImageCdnPath: ''
    }
  },
  async mounted () {
    const userImageRef = await firebase.storage().ref().child('userProfile/' + this.review.eval[0].uid + '/profileImage')
    userImageRef.getDownloadURL().then((url) => {
      this.reviewerProfileImageCdnPath = url
    })
  },
  methods: {
    cardClicked () {
      // console.log('cardClicked!!')
    }
  }
}
</script>
