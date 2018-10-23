import { storage } from 'genesis/support/utils'
import { beforeEach, afterEach } from 'genesis/infra/router/guard'

/**
 * @type {Object}
 */
export default storage({
  routes: [],
  load: (component) => {
    if (!component) {
      return
    }
    return () => import(`src/${component}.vue`)
  }
})
