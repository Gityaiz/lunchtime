import firebase from '../plugins/firebase'

export async function goProfileIfAuthenticated ({ store, redirect }) {
  await firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      return redirect('/user')
    }
  })
}
export async function goSigninPageIfNotAuthenticated ({ store, redirect }) {
  await firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      return redirect('/user/signin')
    }
  })
}
