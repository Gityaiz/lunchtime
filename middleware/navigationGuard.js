export function goProfileIfAuthenticated ({ store, redirect }) {
  if (store.getters['auth/fireid']) {
    // ユーザーが認証されているときはユーザページに飛ばす
    return redirect('/user')
  }
}
export function goSigninPageIfNotAuthenticated ({ store, redirect }) {
  // ユーザーが認証されていないときはログインページに飛ばす
  if (store.getters['auth/fireid'] === '') {
    // console.log(store.getters['auth/fireid'], !store.getters['auth/fireid'])
    return redirect('/user/signin')
  }
}
