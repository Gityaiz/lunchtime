<template>
  <v-card
    max-width="400px"
  >
    <v-img
      :src="!!review.imagePath ? review.imagePath : ''"
      class="white--text align-end"
      height="200px"
    >
    </v-img>
    <v-card-text>
      <v-col>
        <v-row>
          <div class="text--primary">
            {{ !!review.memo ? review.memo : '' }}
          </div>
        </v-row>
        <v-row>
          <v-rating
            :value="!!review.rank ? review.rank : 0"
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
        imagePath: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
        memo: 'default memo',
        name: 'default writer',
        rank: 0,
        uid: 'default uid'
      })
    }
  },
  data () {
    return {
      reviewerProfileImageCdnPath: ''
    }
  },
  async mounted () {
    if (this.review) {
      const userImageRef = await firebase.storage().ref().child('userProfile/' + this.review.uid + '/profileImage')
      userImageRef.getDownloadURL().then((url) => {
        this.reviewerProfileImageCdnPath = url
      })
    }
  },
  methods: {
  }
}
</script>
