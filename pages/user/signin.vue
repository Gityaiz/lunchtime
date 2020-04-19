<template>
  <v-layout justify-center>
    <v-flex xs12 sm8 md6>
      <signin-form @success="LoginSuccess" @failed="LoginFailed" />
    </v-flex>
  </v-layout>
</template>
<script>
import SigninForm from '../../components/SigninForm.vue'
import { goProfileIfAuthenticated } from '../../middleware/navigationGuard'
import firebase from '../../plugins/firebase'
import { mapGetters, mapActions } from 'vuex'
export default {
  middleware: goProfileIfAuthenticated,
  components: {
    SigninForm
  },
  computed: {
    ...mapGetters('auth', [
      'fireid'
    ])
  },
  methods: {
    ...mapActions('auth', ['setName']),
    ...mapActions('auth', ['setEmail']),
    ...mapActions('auth', ['setFireID']),
    ...mapActions('auth', ['setProfileImage']),
    ...mapActions('snackbar', ['setMessage']),
    ...mapActions('snackbar', ['snackOn']),
    LoginSuccess (data) {
      // storeにログイン情報をセット
      this.setName('名無し')
      this.setEmail(data.user.email)
      this.setFireID(data.user.uid)
      // ここでユーザー情報を取得する
      return firebase.firestore().collection('users').doc(this.fireid)
        .get()
        .then((doc) => {
          if (doc.id) {
            const userInfos = doc.data()
            this.setName(userInfos.name)
            this.setProfileImage(userInfos.profileImage)
            this.setMessage('ログインに成功しました')
            this.snackOn()
            // rootページに遷移
            this.$router.push({ path: '/' })
          } else {
            // doc.data() will be undefined in this case
            this.setMessage('エラーが発生しました')
            this.snackOn()
          }
        })
    },
    LoginFailed (data) {
      // dataにサインイン失敗時のエラー内容が入っている
      this.setMessage('エラーが発生しました')
      this.snackOn()
      this.$router.push({ path: '/user/signin' })
    }
  }
}
</script>
