<template>
  <v-layout justify-center>
    <v-flex xs12 sm8 md6>
      <signup-form @success="SignupSuccess" @failed="SignupFailed" />
    </v-flex>
  </v-layout>
</template>
<script>
import SignupForm from '../../components/SignupForm.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    SignupForm
  },
  methods: {
    ...mapActions('snackbar', ['setMessage']),
    ...mapActions('snackbar', ['snackOn']),

    SignupSuccess (data) {
      this.setMessage('ユーザーの作成に成功しました')
      this.snackOn()
      this.$router.push({ path: '/user/signin' })
    },
    SignupFailed (data) {
      if (data === 'any is blank') {
        this.setMessage('必要事項を埋めてください')
        this.snackOn()
      }
      if (data === 'password differs from confirm') {
        this.setMessage('パスワードと確認パスワードが異なります')
        this.snackOn()
      }
    }
  }
}
</script>
