<template>
  <v-container>
    <div class="d-flex justify-space-between align-center">
      <v-text-field v-model="listName"></v-text-field>
      <v-btn @click="addList" :disabled="!Boolean(listName)" color="primary">
        <v-icon left v-if="Boolean(listName)">mdi-check</v-icon>
        Dodaj listę
      </v-btn>
    </div>
    <v-list class="d-flex align-start flex-wrap">
      <v-list-item v-for="(list, index) in lists" :key="index" class="max-width">
        <v-list-item-content>
          <todo-list @delete="removeList(index)" :name="list.name" :items="list.items"></todo-list>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
// @ is an alias to /src
import TodoList from '@/components/todo-list';

export default {
  name: 'Home',
  components: { TodoList },
  data() {
    return {
      listName: '',
      lists: []
    };
  },
  methods: {
    addList() {
      this.lists.push({ name: this.listName, items: [] });
      this.listName = '';
    },
    removeList(index) {
      this.lists.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.d-flex {
  column-gap: 10px;
}
.max-width {
  max-width: calc(33% - 10px / 4);
}
@media (max-width: 600px) {
  .max-width {
    max-width: 100%;
  }
}

@media (max-width: 960px) and (min-width: 601px) {
  .max-width {
    max-width: calc(50% - 10px / 2);
  }
}

@media (max-width: 1264px) and (min-width: 961px) {
  .max-width {
    max-width: calc(33% - 10px / 2);
  }
}

@media (max-width: 1904px) and (min-width: 1265px) {
  .max-width {
    max-width: calc(25% - 10px);
  }
}
</style>
