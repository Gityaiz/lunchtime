<template>
  <v-row>
    <v-col class='mt-2'>
      <label class="image_label">
        写真
        <input @change="selectFile" type="file">
      </label>
    </v-col>
    <v-col>
      <v-progress-circular v-if="progress" :value="progress" />
      <label v-if="completed">
        添付完了
        <v-icon>
          mdi-checkbox-marked-circle
        </v-icon>
      </label>
    </v-col>
  </v-row>
</template>
<script>
import firebase from '../plugins/firebase.js'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      image: null,
      progress: 0,
      completed: false
    }
  },
  computed: {
    ...mapGetters('auth', [
      'fireid'
    ])
  },
  mounted () {
    this.image = null
    this.completed = false
  },
  methods: {
    selectFile (e) {
      e.preventDefault()
      const files = e.target.files
      this.image = files[0]

      // TODO ここでログインチェックする
      const storepath = 'storePhoto' + '/' + this.fireid + '/' + this.image.name
      const uploadTask = firebase.storage().ref().child(storepath).put(this.image)

      uploadTask.on('state_changed', (snapshot) => {
        this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, (error) => {
        // Handle unsuccessful uploads
        this.$emit('failed', error)
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.progress = 0
          this.completed = true
          this.$emit('success', downloadURL)
        })
      })
    }
  }
}
</script>
<style scoped lang='scss'>
.image_label {
  display: flex;
  width: 20vh;
  height: auto;
  padding: 5px;
  justify-content: center;
  align-items: center;
  border: solid 1px #888;
  cursor: pointer;
  cursor: hand;
  input {
    display: none;
  }
}
.image_label::after {
  content: '+';
  font-size: 1rem;
  color: #888;
  padding-left: 1rem;
}
</style>
