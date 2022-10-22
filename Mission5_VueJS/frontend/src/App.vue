<template>
  <q-layout view="hHh lpr fFf">

    <q-header reveal elevated class="bg-grey text-white shadow-2">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /> -->

        <q-toolbar-title>
          <div class="text-weight-light">
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
            </q-avatar>
            Vue Basic - 201524022 - Rangga
          </div>
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item clickable v-ripple to="/">
              <q-item-section avatar>
                <q-icon name="o_home" />
              </q-item-section>

              <q-item-section>
                Home
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/insert">
              <q-item-section avatar>
                <q-icon name="eva-upload" />
              </q-item-section>

              <q-item-section>
                Insert
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>
      </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  data() {
    return {
      $q: useQuasar()
    }
  },
  methods: {
    notify (message, error) {
      var color = 'green';
      if(error) {
        color = 'red';
      }
      this.$q.notify({
        position: 'bottom-right',
        message: message,
        color: color
      })
    }
  },
  setup () {
    return {
      drawer: ref(false)
    }
  }
}
</script>