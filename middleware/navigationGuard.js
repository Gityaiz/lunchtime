export function goProfileIfAuthenticated ({ store, redirect }) {
  console.log('goProfileIfAuthenticated is called')
  // ユーザーが認証されているときはユーザページに飛ばす
  if (store.getters['auth/email']) {
    return redirect('/user')
  }
}
export function goSigninPageIfNotAuthenticated ({ store, redirect }) {
  console.log('goSigninPageIfNotAuthenticated is called')
  // ユーザーが認証されていないときはログインページに飛ばす
  console.log(store.getters['auth/email'], !store.getters['auth/email'])
  if (!store.getters['auth/email']) {
    return redirect('/user/signin')
  }
}
