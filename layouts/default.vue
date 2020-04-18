<template>
  <v-app dark>
    <v-snackbar
      v-model="snackbarVisible"
      top
    >
      {{ message }}
    </v-snackbar>
    <router-view />
    <v-bottom-navigation
      :value="activeBtn"
      :v-model="bottomNav"
      color="primary"
      fixed
      bottom
      grow
      height="10vh"
    >
      <v-btn v-for="menu in menus" :key="menu.title" :to="menu.to">
        <span>{{ menu.title }}</span>
        <v-icon>{{ menu.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import firebase from '~/plugins/firebase.js'
export default {
  data () {
    return {
      isSnackbar: false,
      activeBtn: 0, // bottom-nav active {0, 1, 2},
      bottomNav: 0,
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
    // snackbarが自動でfalseに設定するためセッタを用意して、明示的にdispatchからOffするようにする
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

<style>
.toolbar-font {
  color: white;
  font-size: 150%;
  text-decoration: none;
  text-transform: none;
}
.userMenu-item {
  cursor: hand;
}
</style>
