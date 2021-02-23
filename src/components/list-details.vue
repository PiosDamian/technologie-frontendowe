<template>
  <v-container>
    <v-text-field v-model="list.name"></v-text-field>
    <v-text-field v-model="list.description"></v-text-field>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'list-details',
  data() {
    return {
      error: null,
      list: null
    }
  },
  created() {
    axios.get(`todos/${this.$route.params.id}`)
        .then(response => response.data)
        .then(list => {
          list.items = JSON.parse(list.items);
          this.list = list;
        })
        .catch(() => this.error = 'Nie udało się pobrać danych');
  },
}
</script>

<style scoped>

</style>