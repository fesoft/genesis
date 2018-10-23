<template>
  <q-layout
    ref="layout"
    v-model="sides"
    v-bind="{view, leftBreakpoint, reveal}" :class="classNames">

    <q-layout-header>
      <q-toolbar
        v-bind="toolbar"
      >
      <q-btn
        flat
        @click="leftDrawer = !leftDrawer"
        icon="menu"
      >
      </q-btn>

       <q-toolbar-title>
        {{ AppName }}
        <div slot="subtitle" class="hidden-medium">
          {{ AppTooltip }} <span v-if="dev">{{ $q.version }}</span>
        </div>
      </q-toolbar-title>

      <slot name="header-content"></slot>

        <q-btn
          flat
          @click=""
          v-if="getDashboardOptions === !undefined"
          icon="more_vert"
          <q-popover
          ref="popover"
          class="q-popover-menu">
            <q-list
              item-separator
              highlight
              link
            >
              <!--suppress CommaExpressionJS -->
              <q-item v-for="(menu, index) in getDashboardOptions" :key="index" @click="handlerMenu(menu)" separator>
                <q-item-side :color="menu.color" :icon="menu.icon"></q-item-side>
                <q-item-main>{{ menu.label }}</q-item-main>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
    </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawer"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <app-drawer-menu :menus="AppMenu" :shadow="shadow"></app-drawer-menu>
    </q-layout-drawer>

    <slot name="breadcrumb">
      <div class="breadcrumb-wrapper">
        <app-breadcrumb v-bind="{icon: home, displayIcon: displayIcon}"></app-breadcrumb>
      </div>
    </slot>

    <slot name="content">
      <div class="transition-wrapper">
        <app-transition-slide v-bind="style"></app-transition-slide>
      </div>
    </slot>
  </q-layout>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import { set, get } from 'genesis/infra/storage'
  import AppBreadcrumb from 'genesis/components/breadcrumb/AppBreadcrumb.vue'
  import AppDrawerMenu from 'genesis/components/layout/drawer/DrawerMenu.vue'
  import AppTransitionSlide from 'genesis/components/transition/AppTransitionSlide.vue'

  export default {
    components: {
      AppBreadcrumb, 
      AppDrawerMenu, 
      AppTransitionSlide
    },
    name: 'app-layout',
    props: {
      view: {
        type: String,
        default: 'lHh Lpr lFf' // default: 'lHh Lpr fff'
      },
      reveal: {
        type: Boolean,
        default: false
      },
      left: {
        type: Boolean,
        default: true
      },
      leftBreakpoint: {
        type: Number,
        default: 996
      },
      home: {
        type: String,
        default: 'home'
      },
      displayIcon: {
        type: Object,
        default: () => ({
          show: true,
          caracter: ''
        })
      },
      viewport: {
        type: Object,
        default: () => ({
          height: 'calc(100vh - 95px)',
          padding: '10px'
        })
      },
      mobile: {
        type: Object,
        default: () => ({
          height: 'calc(100vh - 95px)',
          padding: '0'
        })
      },
      toolbar: {
        type: Object,
        default: () => ({})
      },
      shadow: {
        type: Boolean,
        default: () => true
      }
    },
    data () {
     return {
       sides: {
          left: true,
          right: true
        },
        leftDrawer: true        
     }
    },
    computed: {
      environment () {
        return process.env.NODE_ENV
      },
      dev () {
        return process.env.DEV
      },
      classNames () {
        return ['layout-default', this.environment]
      },
      style () {
        return this.$q.platform.is.mobile ? this.mobile : this.viewport
      },
      ...mapGetters(['AppName', 'AppTooltip', 'AppMenu', 'getDashboardOptions'])
    },
    methods: {
      handlerMenu (menu) {
        menu.handler(this)
        // noinspection JSUnresolvedVariable
        this.$refs.popover.close()
      },
      toggleLeft () {
        if (this.left) {
          this.toggleLeft()
        }
      }
    },
    watch: {
      sides: {
        handler (sides) {
          set('drawer.sides', sides, true)
        },
        deep: true
      }
    },
    created () {
      const sides = get('drawer.sides', true)
      if (sides) {
        this.sides = sides
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scope>
</style>
