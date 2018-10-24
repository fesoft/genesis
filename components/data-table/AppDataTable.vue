<template>
  <div class="app-data-table" :style="config.styles">
     <q-table
        row-key="id"
        :selection="selection"
        :selected.sync="selected"
        v-bind="{data, columns, config}"
        @refresh="refresh"
        @rowclick="rowclick"
      >
      <template
        slot="top-selection"
        slot-scope="props"
      >
        <q-btn
          round
          v-for="action in actions"
          :key="action.id"
          @click="handler(action, selected[0])"
          :color="action.color"
          :icon="action.icon"
        />
      </template>
      <template
        v-for="slot in slots"
        :slot="'col-' + slot.field"
        slot-scope="cell"
      >
        <field-functional
          :component="slot.component"
          :on="on(slot, cell)"
          :props="props(slot, cell)"
        />
      </template>
    </q-table>
    </div>
</template>

<script type="text/javascript">
  import MixinPermission from 'genesis/components/@mixins/MixinPermission'
  import { computed, data, methods, props } from './model'

  export default {
    mixins: [
      MixinPermission, computed, data, methods, props
    ],
    name: 'app-data-table'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
