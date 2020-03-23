<template>
  <v-row
    no-gutters
    justify="center"
  >
    <v-col
      md="6"
      offset-md="3"
    >
      <v-card
        color="blue-grey darken-2 d-flex"
        align-center
      >
        <v-layout column wrap>
          <v-flex pt-3 pb-3 pl-5 pr-5 ma-3>
            <v-card-title class="headline">
              ログイン画面
            </v-card-title>
            <v-divider />
            <v-text-field
              v-model="username"
              label="E-mail Address"
              required
            />
            <v-text-field
              :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="visible ? 'text' : 'password'"
              @click:append="visible = !visible"
              v-model="password"
              name="input-10-2"
              label="Password"
            />
            <v-layout
              align-center
              justify-center
            >
              <v-btn
                @click="loginAction(username, password)"
                outlined
                color="primary"
              >
                login
              </v-btn>
            </v-layout>
            <div align="right">
              <router-link to="/user/signup" class="no-decorate-font">
                アカウントをお持ちではないですか？
              </router-link>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import firebase from '../plugins/firebase.js'
export default {
  data () {
    return {
      username: '',
      password: '',
      visible: false
    }
  },
  methods: {
    loginAction (username, password) {
      if (username === '' || password === '') {
        this.$emit('failed', 'username or password is blank')
        return
      }
      return firebase.auth().signInWithEmailAndPassword(username, password)
        .then((data) => {
          this.$emit('success', data)
        })
        .catch((error) => {
          this.$emit('failed', error)
        })
    }
  }
}
</script>
<style>
.no-decorate-font {
  color: white;
  text-decoration : underline;
}
.no-decorate-font:hover {
  color: rgb(84, 177, 243);
  text-decoration : underline;
}
</style>
