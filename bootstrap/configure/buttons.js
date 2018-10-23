import { storage } from 'genesis/support/utils'
import { button } from 'genesis/modules/dashboard/index'
import { view, edit, add, create, read, update, destroy } from './operations'

const color = 'positive'

// (id, permission, label, handler, icon = '', tooltip = '', color = 'white') 
/**
 * @param {Object} $this
 * @return {Array}
 */
export const buttons = ($this) => {
  return [
    // ********************************* middle *********************************

    button('view', 1, 'Detalhes', view($this), 'search', 'Visualize detalhes deste registro', 'primary')
    .$middle(),

    button('edit', 3, 'Editar', edit($this), 'edit', 'Edite este registro', 'primary')
    .$middle(),

    button('destroy', 4, 'Apagar', destroy($this, null, 'Confirmação', 'Deseja apagar este registro?'), 'delete',
      'Envie este registro para a lixeira', 'negative')
    .$middle(),

    // ********************************* grid *********************************

    button('refresh', 1, '', read($this), 'refresh', 'Recarregar', 'primary')
    .$grid(),

    button('add-inline', 2, '', add($this), 'add', 'Novo', 'primary')
    .$grid(),

    // button('retry', 1, 'Tentar novamente', () => $this.read(), 'retry',
    //  'Realizar uma nova tentativa de recuperação de dados', 'primary')
    // .$render(['retry'], ['center']),

    button('first', 2, 'Criar um novo registro', add($this), 'add', 'Inicie a criação de um novo registro',
      'primary')
    .$render(['empty'], ['center']),

    // ********************************* form *********************************

    button('create', 2, '', create($this), 'save', 'Salvar as alterações feitas a este registro', 'primary')
      .$validate().$form(['create']),

    button('update', 3, '', update($this), 'save', 'Salvar as alterações feitas a este registro', 'primary')
      .$validate().$form(['edit']),

    button('save-and-add', $this.scope === 'create' ? 2 : 3, 'Salvar & Novo',
      (record) => $this.save(record, () => $this.browse($this.path + '/' + 'create')), '',
      'Salva este registro e abre nova tela para criação de um novo registro', 'primary')
      .$validate()
      .$form(['create', 'edit']),

    button('save-and-back', $this.scope === 'create' ? 2 : 3, 'Salvar & Voltar',
      (record) => $this.save(record, () => $this.browse($this.path)), '',
      'Salva este registro e volta para a lista principal de registros', 'primary')
      .$validate()
      .$form(['create', 'edit']),

    button('editing', 3, 'Editar', edit($this), '', 'Editar este registro', 'primary')
    .$form(['view']),

    button('destructing', 4, 'Apagar', destroy($this, () => {
      $this.browse($this.path)
    }, 'Confirmação', 'Deseja apagar este registro?'), '', 'Apagar este registro', 'primary')
    .$form(['view', 'edit']),

    // ********************************* general *********************************

    button('add', 2, '', add($this), 'add', 'Inicie a criação de um novo registro', 'primary')
    .$all(['floating'], {round: true}),

    button('back', 1, 'Voltar', () => $this.$router.go(-1), '', 'Voltar', 'primary')
    .$all(['top', 'bottom']),

    // ********************************* last buttons *********************************

    button('start', 1, '', () => $this.browse($this.path, false), 'apps', 'Abre a lista de registros', 'primary')
      .$options({rotate: false}).$form(),

    button('filter', 1, '', () => $this.filterOpen(), 'filter_list', 'filtrar', 'primary')
    .$options({rotate: false, 'class': '--button-filter'})
    .$grid()
  ]
}

/**
 * @type {Object}
 */
export default storage({
  buttons: buttons
})
