<template>
    <router-view />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
/* ===== Scrollbar CSS ===== */
  /* Firefox */
  * {
    scrollbar-width: auto;
    scrollbar-color: #4a4a4a #ffffff;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 10px;
  }

  *::-webkit-scrollbar-track {
    background: #ffffff;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #4a4a4a;
    border-radius: 10px;
    border: 3px solid #ffffff;
  }

  .gradient{
    background: #ffeb3b;
    background: -webkit-linear-gradient(bottom right, #ffeb3b, #00BE64);
    background: -moz-linear-gradient(bottom right, #ffeb3b, #00BE64);
    background: linear-gradient(to top left, #ffeb3b, #00BE64);
  }


</style>
