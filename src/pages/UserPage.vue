<script setup>
import { ref, onMounted } from "vue"
import DialogNewUser from 'src/components/users/DialogNewUser.vue'
import DialogEditUser from 'src/components/users/DialogEditUser.vue'
import DialogClave from 'src/components/users/DialogClave.vue'

import { usePinia } from 'src/composables/usePinia'
import { useQuasar } from 'quasar'

const {
        users,
        retrieveUsers
      } = usePinia()

const $q = useQuasar()

onMounted( async() => {
  await retrieveUsers()
})

const modelNewUser = ref(false)
const modelEditUser = ref(false)
const modelEditClave = ref(false)
const refEditUser = ref(null)
const refDialogClave = ref(null)

const editUser =(user)=>{
  refEditUser.value.setDatos(user)
  modelEditUser.value = true
}

const closeNewuser = ()=>{
  modelNewUser.value = false
  $q.notify({
    message: 'Usuario Creado con Exito',
    type: 'primary',
    icon: 'check_circle',
    position: 'top'
  })
}

const closeEdituser = ()=>{
  modelEditUser.value = false
  $q.notify({
    message: 'Usuario Actualizado con Exito',
    type: 'primary',
    icon: 'check_circle',
    position: 'top'
  })
}

const closeEditClave = ()=>{
  modelEditClave.value = false
  $q.notify({
    message: 'Contraseña Actualizado con Exito',
    type: 'primary',
    icon: 'check_circle',
    position: 'top'
  })
}

const openEditClave =(user)=>{
  refDialogClave.value.setDatos(user)
  modelEditClave.value = true
}

</script>
<template>
  <q-page class="bg-positive">
      <div class="gradient">
        <q-toolbar >
          <q-space />
          <q-btn
            class="q-mt-md"
            round
            dense
            size="lg"
            icon="add"
            color="info"
            @click="modelNewUser=true"
          />
        </q-toolbar>
        <div class="text-h6 q-pa-md " style="color: #fff">Usuarios</div>
      </div>
      <q-list bordered>
          <q-item-label header></q-item-label>
          <q-item
            v-for="user in users"
            :key="user.id"
            class="q-my-sm"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                {{ user.name.charAt(0) }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ user.name }}</q-item-label>
              <q-item-label caption lines="1">
                {{ user.email }}
                <q-badge align="top" :color=" user.state=='active'? 'primary':'negative' ">{{ user.state }}</q-badge>
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="line">
                <q-btn
                  icon="edit"
                  size="8px"
                  round
                  color="primary"
                  @click="editUser(user)"
                ></q-btn>
                <q-btn
                  icon="lock"
                  size="8px"
                  round
                  color="positive"
                  @click="openEditClave(user)"
                ></q-btn>
              </div>
            </q-item-section>
          </q-item>
          <q-separator />

      </q-list>
  </q-page>

  <DialogNewUser
    v-model="modelNewUser"
    @closeNewUser="closeNewuser"
  />
  <DialogEditUser
    ref="refEditUser"
    v-model="modelEditUser"
    @closeEditUser="closeEdituser"
  />
  <DialogClave
    ref="refDialogClave"
    v-model="modelEditClave"
    @closeDialogClave="closeEditClave"
  />


</template>
<style lang="scss">
  .line{
    display: flex;
    align-items: center;
  }
</style>
