import { get, set } from 'lodash'
import { uniqid } from 'genesis/support/utils'
import router from 'genesis/infra/router'

/**
 * @param {string} path
 * @param {Object} query
 * @param {string} changer
 */
const browse = (path, query = {}, changer = '~') => {
  let remove = false
  if (query === false) {
    query = {}
  }
  const route = router.currentRoute
  if (query !== undefined) {
    query = Object.assign({}, route.query, query)
  }
  if (query === undefined) {
    query = {}
  }
  if (path === route.path) {
    query[changer] = uniqid()
  }
  if (remove) {
    delete query[changer]
  }
  window.setTimeout(() => router.push({path, query}), 100)
}

const on = (name, callback) => this.$root.$on(name, callback)
const off = (name) => this.$root.$off(name)
const emit = (name, parameters) => this.$root.$emit(name, parameters)

const genesis = {
  get, set, browse, on, off, emit
}

/**
 * @param Vue
 * @returns {*}
 */
export default Vue => {
  Object.defineProperty(Vue.prototype, '$g', {
    get () {
      return genesis
    }
  })
}
