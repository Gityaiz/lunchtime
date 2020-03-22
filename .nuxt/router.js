import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _764935e2 = () => interopDefault(import('..\\pages\\home\\index.vue' /* webpackChunkName: "pages_home_index" */))
const _7dd1f376 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages_user_index" */))
const _41065ca4 = () => interopDefault(import('..\\pages\\user\\signin.vue' /* webpackChunkName: "pages_user_signin" */))
const _17d9afb8 = () => interopDefault(import('..\\pages\\user\\signup.vue' /* webpackChunkName: "pages_user_signup" */))
const _3dd0ace1 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/home",
    component: _764935e2,
    name: "home"
  }, {
    path: "/user",
    component: _7dd1f376,
    name: "user"
  }, {
    path: "/user/signin",
    component: _41065ca4,
    name: "user-signin"
  }, {
    path: "/user/signup",
    component: _17d9afb8,
    name: "user-signup"
  }, {
    path: "/",
    component: _3dd0ace1,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
