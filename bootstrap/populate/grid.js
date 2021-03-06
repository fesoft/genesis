import { Http } from 'genesis'
import { getDotNotation } from 'genesis/support/transform'

/**
 * @param {AppCrudGrid} $component
 * @param {AxiosResponse} response
 */
export default ($component, response) => {
  const $body = Http.get('$body')
  const $meta = Http.get('$meta')

  if (!$component.isPaginated()) {
    let data = response
    if (!Array.isArray(data)) {
      data = $body(response)
    }
    $component.data = data
    return
  }

  const body = $body(response)
  const meta = $meta(response)

  if (!Array.isArray(body)) {
    $component.data = []
    return
  }

  $component.pages = parseInt(Math.ceil(meta.total / $component.limit))
  $component.total = parseInt(meta.total)
  $component.data = body.map(record => getDotNotation($component.columns, record))
}
