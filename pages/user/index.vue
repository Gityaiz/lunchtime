<template>
  <v-container fill-height>
    <v-layout class="d-flex flex-column">
      <v-card dark class="text-center pa-2">
        <v-row>
          <v-card-text>
            <v-avatar size="100px" color="grey lighten-4">
              <img :src="user_infos.profileImage" alt="avatar">
            </v-avatar>
          </v-card-text>
        </v-row>
        <v-row>
          <v-card-text>
            <v-text-field
              v-model="update.name"
              label="ユーザー名"
              :clearable="true"
            />
          </v-card-text>
          <v-card-text>
            <input @change="selectFile" type="file">
          </v-card-text>
        </v-row>
        <v-btn @click="updateStatus(), updateProfileImage()">
          ユーザ情報を更新する
        </v-btn>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from '../../plugins/firebase.js'
import { goSigninPageIfNotAuthenticated } from '../../middleware/navigationGuard'
import { mapGetters, mapActions } from 'vuex'
export default {
  middleware: goSigninPageIfNotAuthenticated,
  computed: {
    ...mapGetters('auth', ['fireid'])
  },
  data () {
    return {
      user_infos: { name: '名無し', profileImage: '' },
      isVisible: false,
      uid: '',
      update: { name: '名無し' },
      profileImage: {}
    }
  },
  async asyncData (context) {
    let user = {}
    await firebase.firestore().collection('users').doc(context.store.getters['auth/fireid'])
      .get()
      .then((doc) => {
        if (doc.exists) {
          user = doc.data()
        }
      })
    return { user_infos: user }
  },
  mounted () {
    this.update.name = this.user_infos.name
  },
  methods: {
    ...mapActions('snackbar', ['setMessage']),
    ...mapActions('snackbar', ['snackOn']),
    ...mapActions('auth', ['setName']),
    ...mapActions('auth', ['setProfileImage']),
    updateStatus () {
      if (this.user_infos.name === this.update.name || this.update.name === '') {
        return
      }
      firebase.firestore().collection('users').doc(this.fireid)
        .update({
          name: this.update.name
        }).then((data) => {
          this.setName(this.update.name)
          this.setMessage('ユーザ名を更新しました')
          this.snackOn()
        })
    },
    selectFile (e) {
      e.preventDefault()
      const files = e.target.files
      this.profileImage = files[0]
    },
    updateProfileImage () {
      if (this.profileImage === '') {
        return
      }
      const storepath = 'userProfile' + '/' + this.fireid + '/' + this.profileImage.name
      return firebase.storage().ref().child(storepath).put(this.profileImage)
        .then((snapshot) => {
          // 成功時の処理
          let imageUrl
          firebase.storage().ref().child(storepath).getDownloadURL().then((url) => {
            imageUrl = url
          })
            .then(() => {
              firebase.firestore().collection('users').doc(this.fireid).set({
                profileImage: imageUrl
              }, { merge: true })
            })
        })
        .then(() => {
          this.setProfileImage()
          this.setMessage('プロフィール画像を更新しました')
          this.snackOn()
          this.$router.push({ path: '/' })
        })
    }
  }
}
</script>
