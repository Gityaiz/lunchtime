<template>
  <v-app dark>
    <v-card height="100%">
      <router-view />
      <v-snackbar v-model="snackbarVisible" top>
        {{ message }}
      </v-snackbar>
      <v-bottom-navigation
        v-model="bottomNav"
        color="primary"
        fixed
        grow
      >
        <v-btn v-for="menu in menus" :key="menu.title" :to="menu.to" :value="menu.title">
          <span>{{ menu.title }}</span>
          <v-icon>{{ menu.icon }}</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-card>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      bottomNav: 'map',
      menus: [
        { title: 'map', icon: 'mdi-map-marker', to: '/' },
        { title: 'reviews', icon: 'mdi-heart', to: '/evals' },
        { title: 'user', icon: 'mdi-face', to: '/user' }
      ]
    }
  },
  computed: {
    ...mapGetters('auth', [
      'email'
    ]),
    ...mapGetters('snackbar', [
      'message',
      'status'
    ]),
    snackbarVisible: {
      get () {
        return this.status
      },
      set () {
        this.snackOff()
      }
    }
  },
  methods: {
    ...mapActions('auth', ['setLogOut']),
    ...mapActions('snackbar', ['snackOn']),
    ...mapActions('snackbar', ['snackOff']),
    ...mapActions('snackbar', ['setMessage'])
  }
}
</script>
