<template>
  <v-container fluid>
    <v-flex>
      <v-card dark>
        <v-row align="center">
          <v-col cols="3">
            <v-card flat>
              <v-card-text>
                <v-avatar size="100px" color="grey lighten-4">
                  <img :src="user_infos.profileImage" alt="avatar">
                </v-avatar>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col md="4" xs="4">
            <v-row>
              <v-card dark flat>
                <v-card-text>
                  <v-text-field
                    v-model="update.name"
                    :label="user_infos.name"
                  />
                </v-card-text>
              </v-card>
              <v-flex tile align-center>
                <v-card tile flat class="d-flex">
                  <input @change="selectFile" type="file">
                </v-card>
              </v-flex>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-alert type="success" v-if="profileImage.name" dense text>
            {{ profileImage.name }}
          </v-alert>
        </v-row>
      </v-card>
      <v-card flat>
        <v-btn @click="updateStatus(), updateProfileImage()" block>
          ユーザ情報を更新する
        </v-btn>
      </v-card>
    </v-flex>
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
      update: {
        name: ''
      },
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
