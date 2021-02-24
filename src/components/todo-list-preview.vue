<template>
  <v-container v-if="list" @click="details">
    <v-card>
      <v-card-title class="flex">
        <div>{{ list.name }}</div>
        <v-btn
          icon
          @click="
            $event.stopPropagation();
            remove();
          "
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div>{{ (list.items || []).filter(item => item.done).length }}/{{ (list.items || []).length }}</div>
        <v-spacer></v-spacer>
        <div>{{ list.description }}</div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  // component jest placeohlderem listy
  name: 'todo-list-preview',
  props: ['list'],
  methods: {
    remove() {
      this.$emit('delete');
    },
    details() {
      this.$emit('details');
    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
