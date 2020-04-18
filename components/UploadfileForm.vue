<template>
  <label class="image_label">
    画像アップロード
    <input @change="selectFile" type="file">
  </label>
</template>
<script>
import firebase from '../plugins/firebase.js'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      image: '',
      filepath: ''
    }
  },
  computed: {
    ...mapGetters('auth', [
      'fireid'
    ])
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
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, (error) => {
        // Handle unsuccessful uploads
        this.$emit('failed', error)
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          this.$emit('success', downloadURL)
        })
      })
    }
  }
}
</script>
<style scoped lang='scss'>
.image_label {
  input {
    display: none;
  }
}
.image_label {
  display: flex;
  width: 200px;
  height: 20px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  border: solid 1px #888;
  cursor: pointer;
  cursor: hand;
}
.image_label::after {
  content: '+';
  font-size: 1rem;
  color: #888;
  padding-left: 1rem;
}
</style>
