import firebase from 'firebase'

// .env に設定した値を取得してる
const config = {
  apiKey: process.env.API_KEY,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGE_BUCKET
}
console.log('aaaaaaaaa', process.env.API_KEY)
console.log('aaaaaaaaa', process.env.DATABASE_URL)
console.log('aaaaaaaaa', process.env.PROJECTID)
console.log('aaaaaaaaa', process.env.STORAGE_BUCKET)

firebase.initializeApp(config)

export default firebase
