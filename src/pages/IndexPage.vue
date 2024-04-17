<script setup>
  import { ref, onMounted } from 'vue'
  //import { useTerbol } from 'src/composables/useTerbol'
  //const { nameUser } = useTerbol()

  const name = ref('')

  onMounted(() => {
    /* setTimeout(() => {
       name.value = nameUser()
    }, 2000) */
    name.value = localStorage.getItem('name')
  })

</script>
<template>
  <q-page class="bg-primary row justify-center items-center" >

    <q-card class="wellcome-card">
      <q-card-section class="row justify-center items-center">
        <img class="logo" src="~assets/logo.svg">
      </q-card-section>
      <q-separator />
      <q-card-section class="account">
        <h5>Bienvenido:</h5>
        <h4>{{ name }}</h4>
      </q-card-section>
    </q-card>

  </q-page>
</template>
<style lang="scss">
  .wellcome-card{
    width: 400px;
    height: 400px;
  }
  img.logo{
    max-width: 150px;
    filter: invert(50%);
  }
  .account{
    h5{
      color: #000;
    }
  }
</style>
