<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePinia } from 'src/composables/usePinia'
import Menu from 'src/components/Menu.vue'

const { logout } = usePinia()
const router = useRouter()
const leftDrawerOpen = ref(false)
const name = ref('')

//const city =  localStorage.getItem('city')

const toggleLeftDrawer = ()=> {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const doLogout = async()=>{
    await logout()
    router.push('/login')
}

const changeAbout =()=>{
}

onMounted(() => {
  /* setTimeout(() => {
  }, 2000); */
  name.value = localStorage.getItem('name')
})

</script>
<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Demo App
        </q-toolbar-title>

        <q-btn-dropdown
          split
          class="accent"
          color="dark"
          :label="name"
        >
          <q-list>
            <q-item clickable v-close-popup @click="doLogout">
              <q-item-section avatar>
                <q-avatar icon="logout" color="primary" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Salir</q-item-label>
                <q-item-label caption>cerrar sesión</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <!-- <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>
      </q-list> -->
      <Menu />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style>
.bg-theme{
    /* background-color: #6A6D6C; */
    background: -webkit-linear-gradient(bottom right, #6A6D6C, #00BE64);
    background: -moz-linear-gradient(bottom right, #6A6D6C, #00BE64);
    background: linear-gradient(to top left, #6A6D6C, #00BE64);
  }
</style>
src/composables/usePinia
