<template>
  <field :class="classNames" v-bind="{id, inline, problems, label, validate, title, tooltip, editable, visible}">
    <div slot="component">
      <div v-show="editable" :class="{'has-error': problems.length}" class="checkbox-wrapper">
        <label>
          <q-checkbox ref="input" v-model="model" v-bind="{type, name, disable}" @input="input"></q-checkbox>
          <span :class="{'disabled': disabled}" v-html="info"></span>
        </label>
      </div>
      <div v-show="!editable" class="html" v-html="info"></div>
    </div>
  </field>
</template>

<script type="text/javascript">
  import Field from 'genesis/components/fields/components/base.vue'
  import FieldAbstract from 'genesis/components/fields/abstract'

  export default {
    extends: FieldAbstract,
    components: {
      Field
    },
    name: 'field-checkbox',
    props: {
      placeholderTrue: {
        type: String,
        default: 'Sim'
      },
      placeholderFalse: {
        type: String,
        default: 'Não'
      },
      init: {
        type: Boolean,
        default: () => true
      }
    },
    data: () => ({
      model: false
    }),
    computed: {
      disable () {
        if (this.disabled) {
          return true
        }
        return !this.editable
      },
      info () {
        let info = 'placeholder'
        if (this.placeholderTrue && this.placeholderFalse) {
          info = 'placeholderFalse'
          if (this.model) {
            info = 'placeholderTrue'
          }
        }
        return this[info]
      }
    },
    methods: {
      input () {
        this.$emit('input', this.model)
      }
    },
    watch: {
      value (value) {
        this.model = !!value
      }
    },
    mounted () {
      this.model = !!this.value
      if (this.init) {
        this.$emit('input', this.model)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .field-checkbox
    .checkbox-wrapper
      margin-top 10px
    .html
      color #515151
      margin-top 10px
      padding-left 8px
</style>
