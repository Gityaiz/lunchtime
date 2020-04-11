<template>
  <v-layout>
    <v-card
      class='mx-auto mb-2'
      width='80vw'
    >
      <v-img
        class="white--text align-end"
        height="20vh"
        :src="imgSrc"
      >
        <v-card-title>{{ title }}</v-card-title>
      </v-img>

      <v-card-text
        class="text--primary"
      >
        <div>{{ review }}</div>
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
    title: {
      type: String,
      default: () => ('Default title')
    },
    review: {
      type: String,
      default: () => ('good salad')
    },
    imgSrc: {
      type: String,
      default: () => ('https://cdn.vuetifyjs.com/images/cards/docks.jpg')
    }
  }
}
</script>
