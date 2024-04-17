<script setup>
import { ref } from 'vue'
import { usePinia } from 'src/composables/usePinia'

const { createUser } = usePinia()

const name = ref(null)
const email = ref(null)
const clave = ref('')
const repetirClave = ref('')
const loading = ref(false)
const refClave = ref(null)
const refRepClave = ref(null)
const refName = ref(null)
const refEmail = ref(null)

const emit = defineEmits(['closeNewUser'])

const save = async()=>{

  loading.value = true
  await crear()
  loading.value = false

  name.value = ''
  email.value = ''
  clave.value = ''
  repetirClave.value = ''

  refName.value.resetValidation()
  refEmail.value.resetValidation()
  refClave.value.resetValidation()
  refRepClave.value.resetValidation()
  emit('closeNewUser')

}

const crear = async()=>{
  await createUser({
    name: name.value,
    email: email.value,
    clave: clave.value,
    reclave: repetirClave.value
  })
}

const onReset =()=>{

}

const isValidEmail=(val)=> {
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
    return emailPattern.test(val) || 'Email invalido'
}

const checkClave = (val) => {
  refClave.value.resetValidation()
  return  val==clave.value || 'Password no coinciden'
}

const checkRepetirClave = (val)=>{
  refRepClave.value.resetValidation()
  return val==repetirClave.value || 'Password no coincide'
}

</script>
<template>
  <q-dialog transition-show="flip-down" transition-hide="flip-up" persistent>
    <q-card class="user-card">
      <q-card-section>Nuevo Usuario</q-card-section>
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
          <q-input
            ref="refClave"
            outlined
            label-color="dark"
            bg-color="white"
            v-model="clave"
            label="Password"
            type="password"
            autocomplete="off"
            lazy-rules
            :rules="[val => !!val || 'Campo requerido', checkRepetirClave ]"
          />
          <q-input
            ref="refRepClave"
            outlined
            label-color="dark"
            bg-color="white"
            v-model="repetirClave"
            label="Repetir Password"
            type="password"
            lazy-rules
            autocomplete="off"
            :rules="[val => !!val || 'Campo requerido', checkClave ]"
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
  .user-card{
    width: 400px;
  }
</style>
src/composables/usePinia
