import { Auth, View } from 'genesis'
import store from 'genesis/infra/store'
import { abort } from 'genesis/infra/services/http'
import { PATH_NO_ACCESS, PATH_LOGIN } from 'genesis/support'
import { confirm } from 'genesis/support/message'
import { unRegister } from 'genesis/modules/auth/services/index'

/**
 * @param {Array} routes
 * @returns {Array}
 */
export const protect = (routes) => {
  const security = {security: true}

  if (Array.isArray(routes)) {
    return routes.map(route => {
      if (!route.meta) {
        route.meta = security
      }
      if (route.meta.security === undefined) {
        route.meta.security = true
      }
      if (route.children) {
        route.children = protect(route.children)
      }
      return route
    })
  }
  return routes
}

/**
 * @return {boolean}
 */
export const checkSession = () => {
  // noinspection JSUnresolvedVariable
  return store.getters.getAuthToken
}

/**
 * @return {boolean}
 */
export const checkPermission = ($route) => {
  const permission = Auth.get('permission')
  // noinspection JSUnresolvedVariable
  return permission(store.getters.getAuthUser, $route)
}

/**
 * @param {function} next
 * @returns {*}
 */
export const checkModified = (next) => {
  const modified = store.getters.AppModified
  if (modified) {
    const moveOn = () => {
      store.dispatch('setAppModified', false)
      next()
    }
    const ask = () => {
      confirm(View.get('locales.events.modified.title'), View.get('locales.events.modified.message'), moveOn)
    }
    window.setTimeout(ask, 100)
    return true
  }
  return false
}

/**
 * @param {Function} next
 * @returns {*}
 */
export const exit = (next) => {
  return unRegister(() => next(PATH_LOGIN))
}

/**
 * @param {Function} next
 * @param {string} blocked
 * @returns {*}
 */
export const restrict = (next, blocked = '') => {
  return next(Object.assign({}, PATH_NO_ACCESS, {query: {blocked}}))
}

/**
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 * @returns {*}
 */
export const beforeEach = (to, from, next) => {
  // noinspection JSUnresolvedVariable
  const security = to.meta.security
  // abort all requests xhr
  abort('The route where request was started was leaved, all requests was canceled')
  // the target is not protected
  if (!security) {
    return toNext(to, next)
  }
  // test if app is with state modified
  if (checkModified(next)) {
    return next(false)
  }
  // if there is no session exit app
  if (!checkSession()) {
    return exit(next)
  }
  // when target is not allowed the access will be restricted
  if (!checkPermission(to)) {
    return restrict(next, to.path)
  }
  // all right, move on
  return toNext(to, next)
}

/**
 * @param {Route} to
 * @param {Function} next
 * @param {string} path
 * @returns {*}
 */
const toNext = (to, next, path = '') => {
  this.$emit('app.route.before', to, path)
  if (path) {
    return next(path)
  }
  next()
}

/**
 * @param {Route} to
 * @param {Route} from
 * @returns {*}
 */
export const afterEach = (to, from) => {
  const updateInfo = () => {
    // update app title
    setTitle(to.meta.title)
    // update app tooltip
    setTooltip(to.meta.tooltip)
  }
  // clear messages
  store.dispatch('setAppMessages', []).then(updateInfo)
}

/**
 * @param {string} title
 */
const setTitle = (title) => {
  // noinspection JSIgnoredPromiseFromCall
  store.dispatch('setAppTitle', title || store.getters.AppName)
}

/**
 * @param {string} tooltip
 */
const setTooltip = (tooltip) => {
  // noinspection JSIgnoredPromiseFromCall
  store.dispatch('setAppTooltip', tooltip || '')
}
