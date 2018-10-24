import { Dialog, Loading, Notify } from 'quasar'

/**
 * @param {String} title
 * @param {String} message
 * @param {Array} [actions]
 */
export const alert = (title, message, actions) => {
  const buttons = [
    'Ok'
  ]

  Dialog.create({
    title: title,
    message: message,
    buttons: actions || buttons
  })
}

/**
 * @param {String} title
 * @param {String} message
 * @param {Function} ok
 * @param {Function} cancel
 */
export const confirm = (title, message, ok, cancel = null) => {
  Dialog.create({
    title: title,
    message: message,
    ok: 'Sim',
    cancel: 'Não'
  })
  .then(ok)
  .catch(cancel)
}

/**
 * @param {Boolean} status
 * @param {String} message
 * @param {Number} delay
 */
export const loading = (status = true, delay = 0, message = '') => {
  if (status) {
    return Loading.show({
      message,
      delay
    })
  }
  return Loading.hide()
}
/**
 * @param {String} html
 * @param {String} icon
 * @param {Number} timeout
 * @param {String} color
 * @param {String} bgColor
 */
export const toast = (message, icon = 'done', timeout = 6000, color = 'secundary', type = 'positive') => {
  Notify.create({
    message, icon, timeout, color, type
  })
}

/**
 * @param {String} type
 * @param {String} html
 */
export const toastType = (type, html) => {
  return Toast.create[type](html)
}

/**
 * @param {String} html
 */
export const toastPositive = (html) => {
  return toastType('positive', html)
}

/**
 * @param {String} html
 */
export const toastNegative = (html) => {
  return toastType('negative', html)
}

/**
 * @param {String} html
 */
export const toastInfo = (html) => {
  return toastType('info', html)
}

/**
 * @param {String} html
 */
export const toastWarning = (html) => {
  return toastType('warning', html)
}

/**
 * @param {String} html
 * @param {Object} button
 * @param {String} icon
 * @param {Number} timeout
 * @param {String} color
 * @param {String} bgColor
 */
export const toastWithButton = (message, button, icon = 'warning', timeout = 6000, color = '#ffffff', bgColor = '#515151') => {
  Notify.create({
    message, button, icon, timeout, color, bgColor
  })
}

/**
 * @param {String} html
 * @param {Function} handler
 * @param {String} icon
 * @param {Number} timeout
 * @param {String} color
 * @param {String} bgColor
 */
export const undo = (html, handler, icon = 'warning', timeout = 6000, color = '#ffffff', bgColor = '#515151') => {
  const button = {
    label: 'Desfazer',
    handler: handler,
    color: color
  }
  return toastWithButton(html, button, icon, timeout, color, bgColor)
}

/**
 * @param {String} html
 * @param {Function} handler
 * @param {String} icon
 * @param {Number} timeout
 * @param {String} color
 * @param {String} bgColor
 */
export const repeat = (html, handler, icon = 'error', timeout = 6000, color = '#ffffff', bgColor = '#515151') => {
  const button = {
    label: 'Tentar Novamente',
    handler: handler,
    color: color
  }
  return toastWithButton(html, button, icon, timeout, color, bgColor)
}
