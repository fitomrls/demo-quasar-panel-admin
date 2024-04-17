<script setup>
import { ref } from 'vue'
import { usePinia } from 'src/composables/usePinia'

const { updateUser } = usePinia()

const name = ref(null)
const email = ref(null)
const loading = ref(false)
const refName = ref(null)
const refEmail = ref(null)
const state = ref(false)
const id = ref(null)

const emit = defineEmits(['closeNewUser'])

const save = async()=>{

  loading.value = true
  await update()
  loading.value = false

  name.value = ''
  email.value = ''

  refName.value.resetValidation()
  refEmail.value.resetValidation()

  emit('closeEditUser')

}

const update = async()=>{
  await updateUser({
    name: name.value,
    email: email.value,
    state: state.value,
    id: id.value
  })
}

const onReset =()=>{

}

const isValidEmail=(val)=> {
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
    return emailPattern.test(val) || 'Email invalido'
}


const setDatos = (data)=>{
  name.value = data.name
  email.value = data.email
  state.value = data.state=='active'? true : false
  id.value = data.id
}

defineExpose({ setDatos })

</script>
<template>
  <q-dialog transition-show="flip-down" transition-hide="flip-up" persistent>
    <q-card dark class="user-card">
      <q-card-section>Editar Usuario</q-card-section>
      <q-form
        @submit="save"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-card-section>
          <q-input
            outlined
            label-color="dark"
            bg-color="white"
            v-model="name"
            label="Nombre y Apellido"
            lazy-rules
            ref="refName"
            :rules="[ val => val && val.length > 0 || 'Campo requerido']"
          />
          <q-input
            outlined
            label-color="dark"
            bg-color="white"
            v-model="email"
            type="email"
            label="E-mail"
            lazy-rules
            ref="refEmail"
            :rules="[val => !!val || 'Email es requerido', isValidEmail]"
          />
          <q-toggle
            v-model="state"
            :label="state? 'Activo': 'Inactivo'"
          />
        </q-card-section>
        <q-card-actions class="q-pl-md" >
          <q-btn
          rounded
          label="Guardar"
          color="primary"
          type="submit"
          :loading="loading"
          size="sm"
          />
          <q-btn
          rounded
          label="Cancelar"
          color="dark"
          v-close-popup
          size="sm"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<style lang="scss">

</style>
src/composables/usePinia
