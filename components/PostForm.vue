<template>
  <v-row
    justify="center"
    class="ma-2 pa-2"
  >
    <p class="font-weight-white">
      お店の情報を入力してください
    </p>
    <v-card
      class="ma-2 pa-2"
      color="black"
      min-width="80vw"
      max-width="90vw"
      max-weight="70vw"
    >
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
        rows="6"
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
  </v-row>
</template>
<script>
import firebase from '../plugins/firebase.js'
import { mapGetters, mapActions } from 'vuex'

export default {
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
        memo: ''
      },
      storeName: '',
      nameMaxLength: 30,
      memoMaxLength: 300
    }
  },
  computed: {
    ...mapGetters('auth', [
      'fireid'
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
    },
    // firestoreのドキュメント登録用ラベル
    fireDocLabel () {
      const label = 'lat' + this.position.lat.toString() + 'lng' + this.position.lng.toString()
      return label
    }
  },
  methods: {
    ...mapActions('snackbar', ['snackOn']),
    ...mapActions('snackbar', ['setMessage']),
    resisterInfo () {
      firebase.firestore().collection('storeInfos').doc(this.fireDocLabel).collection(this.fireid).doc().set({
        name: this.store.name,
        memo: this.store.memo,
        position: this.position
      })
        .then(() => {
          this.setMessage('情報を登録しました')
          this.snackOn()
          this.$emit('success')
        })
        .catch(() => {
          this.setMessage('エラーが発生しました')
          this.snackOn()
          this.$emit('failed')
        })
    }
  }
}
</script>
