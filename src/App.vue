<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <h1>{{ name }}</h1>
      <router-link to="/" class="nav-item">Home</router-link>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer>Damian Pioś</v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    name: 'Todo'
  })
};
</script>
<style scoped>
.nav-item {
  margin-left: 10px;
  color: white;
}
</style>
