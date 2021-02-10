<template>
  <v-container>
    <h2>{{ name }}</h2>
    <div class="d-flex justify-space-between align-center">
      <v-text-field v-model="newItem"></v-text-field>
      <v-btn @click="addItem" :disabled="!Boolean(newItem)" color="primary">
        <v-icon left v-if="Boolean(newItem)">mdi-check</v-icon>
        Dodaj
      </v-btn>
    </div>
    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index">
        <v-list-item-action>
          <v-checkbox v-model="item.done"></v-checkbox>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title @click="item.done = !item.done" :class="{ 'text-decoration-line-through': item.done }">{{
            item.name
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-btn @click="removeList" color="red" dark class="float-right">
      <v-icon left> mdi-delete </v-icon>
      Usuń listę
    </v-btn>
  </v-container>
</template>

<script>
export default {
  props: ['name', 'items'],
  name: 'todo-list',
  data() {
    return {
      newItem: ''
    };
  },
  methods: {
    addItem() {
      this.items.push({ name: this.newItem });
      this.newItem = '';
    },
    removeList() {
      this.$emit('delete');
    }
  }
};
</script>

<style scoped>
.d-flex {
  column-gap: 10px;
}
</style>
