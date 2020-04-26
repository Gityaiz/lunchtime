<template>
  <v-container fill-height >
    <v-layout justify="center">
      <v-row>
        <v-flex>
          <v-card
            class="mx-auto"
            min-width="100px"
            max-width="90vw"
          >
            <p class="font-weight-white">
              お店の情報を入力してください
            </p>
            <p class="font-weight-white">
              お店の評価を入力
            </p>
            <v-rating
              v-model="store.rank"
              class="mb-2"
              color="amber"
              dense
            />
            <v-textarea
              v-model="store.name"
              :counter="nameMaxLength"
              :rules="nameRules"
              background-color="black"
              color="cyan"
              label="店名"
              outlined
              rows="1"
            />
            <v-textarea
              v-model="store.memo"
              :counter="memoMaxLength"
              :rules="memoRules"
              background-color="black"
              color="cyan"
              label="お店に関するメモ"
              outlined
              rows="3"
            />
            <uploadfile-form
              @success="imageUploadSuccess"
              @failed="imageUploadFailed"
            />
            <v-btn
              @click="resisterInfo"
              outlined
              color="cyan"
              block
            >
              登録
            </v-btn>
          </v-card>
        </v-flex>
      </v-row>
    </v-layout>
  </v-container>
</template>
<script>
import firebase from '../plugins/firebase.js'
import UploadfileForm from './UploadfileForm'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    UploadfileForm
  },
  props: {
    position: {
      type: Object,
      default: () => ({
        lat: 35.658584, lng: 139.7454316
      })
    }
  },
  data () {
    return {
      store: {
        name: '',
        memo: '',
        rank: 0
      },
      nameMaxLength: 30,
      memoMaxLength: 300,
      imageFilePath: ''
    }
  },
  computed: {
    ...mapGetters('auth', [
      'fireid'
    ]),
    ...mapGetters('auth', [
      'name'
    ]),
    nameRules () {
      const rules = []
      if (this.nameMaxLength) {
        const rule = v => (v || '').length <= this.nameMaxLength ||
            `最大文字数(${this.nameMaxLength}文字)を超えています`
        rules.push(rule)
      }
      return rules
    },
    memoRules () {
      const rules = []
      if (this.memoMaxLength) {
        const rule = v => (v || '').length <= this.memoMaxLength ||
            `最大文字数(${this.memoMaxLength}文字)を超えています`
        rules.push(rule)
      }
      return rules
    }
  },
  methods: {
    ...mapActions('snackbar', ['snackOn']),
    ...mapActions('snackbar', ['setMessage']),
    async resisterInfo () {
      const collectionRef = firebase.firestore().collection('storeInfos').where('position.lat', '==', this.position.lat).where('position.lng', '==', this.position.lng)

      await collectionRef.get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            // 該当する位置情報のお店が存在しないので新たにドキュメントを追加する
            firebase.firestore().collection('storeInfos').doc().set({
              eval: [
                { uid: this.fireid, name: this.name, memo: this.store.memo, imagePath: this.imageFilePath, rank: this.store.rank }
              ],
              name: this.store.name,
              position: this.position
            })
              .then(() => {
                this.setMessage('情報を登録しました')
                this.snackOn()
                this.$emit('success')
              })
              .catch(() => {
                this.setMessage('新しいお店情報の登録でエラーが発生しました。')
                this.snackOn()
                this.$emit('success')
              })
          } else {
            // ドキュメントのevalにお店の評価を追加する
            collectionRef.set({
              eval: [
                { uid: this.fireid, name: this.name, memo: this.store.memo }
              ],
              name: this.store.name
            }, { merge: true })
          }
        })
      this.$router.go({ path: this.$router.currentRoute.path, force: true })
    },
    imageUploadSuccess (filepath) {
      this.imageFilePath = filepath
      this.setMessage('写真を添付しました')
      this.snackOn()
    },
    imageUploadFailed () {
      this.setMessage('写真の添付に失敗しました')
      this.snackOn()
    }
  }
}
</script>
