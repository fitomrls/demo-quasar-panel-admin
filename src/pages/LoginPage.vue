<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import {useAuthStore} from '../stores/auth-store'
import { useRouter } from 'vue-router'


  const model_email = ref('')
  const model_password = ref('')
  let loading = ref(false)
  const authStore = useAuthStore()
  const $q = useQuasar()
  const router = useRouter()


  const onSubmit = ()=>{
    if (model_email.value!=='' && model_password.value!=='') {
      loading.value = true
      authStore.doLogin({
        email: model_email.value,
        password: model_password.value
      }).then(resp=>{
        if(resp==200){
          loading.value = false
          router.push('/')
          //window.location = '/#/'
        }
      }).catch(err=>{
        loading.value = false
        //console.log(err.response)
         $q.notify({
          type: 'negative',
          message: 'Email o Password incorrectos'
        })
      })
    }
  }
</script>
<template>
  <q-page class="bg-primary row justify-center items-center" >
    <div class="column text-center">
      <div class="text-center">
          <img src="~assets/cube.png">
      </div>
      <div class="q-mt-md">
          <form
           @submit.prevent.stop="onSubmit"
           class="q-gutter-md">
            <q-input

              rounded
              outlined
              label-color="white"
              bg-color="white"
              v-model="model_email"
              type="email"

              placeholder="E-mail"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Campo Requerido']"
            />
            <q-input

              rounded
              outlined
              label-color="dark"
              bg-color="white"
              v-model="model_password"
              type="password"
              placeholder="Password"
              lazy-rules
              :rules="[ val => val && val.length > 0  || 'Campo Requerido']"
            />
            <div>
              <q-btn
                type="submit"
                rounded
                unelevated
                outline
                size="lg"
                :loading="loading"
                color="positive"
                class="full-width q-mt-md"
                label="Ingresar"
              />
            </div>
          </form>
        <p class="text-white q-mt-md">Olvide mi Contraseña</p>
      </div>
    </div>
  </q-page>
</template>

<style >
  .q-field--outlined.q-field--rounded .q-field__control {
      color: #38f3e2;
  }
  .q-btn--rounded{
    border: 2px solid;
  }

</style>
