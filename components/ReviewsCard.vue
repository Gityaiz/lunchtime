<template>
  <v-layout>
    <v-card
      class="mb-2"
      width="100vw"
      max-width="400px"
    >
      <v-img
        :src="review.eval[0].imagePath"
        class="white--text align-end"
        height="20vh"
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
          <v-row justify="end">
            <p justify="end">
              {{ review.eval[0].name }}
            </p>
          </v-row>
        </v-col>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>
<script>
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
            uid: 'default uid'
          }
        ],
        name: 'store name',
        position: { lat: 35.645975156820924, lng: 139.59070195708614 }
      })
    }
  }
}
</script>
