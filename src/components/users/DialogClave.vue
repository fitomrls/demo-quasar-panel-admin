<script setup>
import { ref } from 'vue'
import { usePinia } from 'src/composables/usePinia'

const { updateClave } = usePinia()

const loading = ref(false)
const clave = ref('')
const repetirClave = ref('')
const refClave = ref(null)
const refRepClave = ref(null)
const name = ref(null)
const id = ref(null)


const emit = defineEmits(['closeDialogClave'])

const save = async()=>{

  loading.value = true
  await update()
  loading.value = false

  clave.value = ''
  repetirClave.value = ''

  refClave.value.resetValidation()
  refRepClave.value.resetValidation()
  emit('closeDialogClave')

}

const update = async()=>{
  await updateClave({
    clave: clave.value,
    reclave: repetirClave.value,
    id: id.value
  })
}

const onReset =()=>{}

const confirmClave = (val) => {
  refClave.value.resetValidation()
  return  val==clave.value || 'Password no coinciden'
}

const coincideClave = (val)=>{
  refRepClave.value.resetValidation()
  return val==repetirClave.value || 'Password no coincide'
}

const setDatos = (user)=>{
  id.value = user.id
  name.value = user.name
}

defineExpose({ setDatos })

</script>
<template>
  <q-dialog transition-show="flip-down" transition-hide="flip-up" persistent>
    <q-card class="user-card">
      <q-card-section>Cambiar Clave: {{ name }}</q-card-section>
      <q-form
        @submit="save"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-card-section>
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
            :rules="[val => !!val || 'Campo requerido', coincideClave ]"
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
            :rules="[val => !!val || 'Campo requerido', confirmClave ]"
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
