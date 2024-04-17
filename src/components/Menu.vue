<script setup>
  import { ref } from 'vue'
  const link = ref('inbox')
  const role = ref(localStorage.getItem('role'))


</script>
<template>
  <section class="my-menu">
    <q-list bordered padding class="rounded-borders text-white">

        <q-item
          class="menu-item"
          v-ripple
          active-class="my-menu-link"
          to="/"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item
          class="menu-item"
          v-ripple
          active-class="my-menu-link"
          to="/users"
        >
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>
          <q-item-section>Usuarios</q-item-section>
        </q-item>

      <q-separator spaced />

    </q-list>
  </section>
</template>


<style lang="scss">
.my-menu{
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)),
    url(../assets/menu.jpg);
  background-repeat: no-repeat;
  background-position: center;
  padding: 10px;
  background-position-x: left;
  background-position-y: top;
}

.menu-item{
  border-radius: 10px;
  border: solid 1px #fff;
  margin: 5px 10px;
}

a.q-item.q-item-type.row.no-wrap.q-router-link--exact-active.my-menu-link.q-item--clickable.q-link.cursor-pointer.q-focusable.q-hoverable.menu-item {
    color: #000;
    background-color: #d9d9d97a;
}



</style>
