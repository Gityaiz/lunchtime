<template>
  <v-app dark>
    <v-card
      color="grey lighten-4"
      flat
      tile
    >
      <v-toolbar>
        <v-toolbar-title>
          <router-link to="/" class="toolbar-font">
            {{ title }}
          </router-link>
        </v-toolbar-title>
        <v-spacer />
        <router-link
          v-if="email == ''"
          to="/user/signin"
          class="toolbar-font"
        >
          ログイン
        </router-link>
        <v-menu
          v-if="email != ''"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              text
              depressed
              class="toolbar-font"
            >
              {{ email }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, i) in userItems"
              :key="i"
              @click="userMenu(item.title)"
            >
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-card>
    <v-snackbar
      v-model="snackbarVisible"
      top
    >
      {{ message }}
    </v-snackbar>
    <router-view />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from '~/plugins/firebase.js'
export default {
  data () {
    return {
      isSnackbar: false,
      userItems: [
        {
          title: 'ユーザーページ',
          link: '/user'
        },
        {
          title: 'ログアウト'
        }
      ],
      title: 'ランチ'
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
    ...mapActions('snackbar', ['setMessage']),
    userMenu (selectedMenu) {
      if (selectedMenu === 'ユーザーページ') {
        this.$router.push({ path: '/user' })
      }
      if (selectedMenu === 'ログアウト') {
        firebase.auth().signOut()
          .then((data) => {
            this.setLogOut()
            this.setMessage('ログアウトしました')
            this.snackOn()
            this.$router.push({ path: '/' })
          })
      }
    }
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
