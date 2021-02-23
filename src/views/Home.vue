<template>
  <v-container>
    <v-list class="d-flex align-start flex-wrap" v-if="lists && lists.length">
      <v-list-item v-for="(list, index) in lists" :key="index" class="max-width">
        <v-list-item-content>
          <todo-list-preview @delete="removeList(index, list)" @details="showDetails(list)" :list="list"></todo-list-preview>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="showAddList" class="max-width">
        <v-list-item-content>
          <add-list @add="addList($event); showAddList = false" @cancel="showAddList = false"></add-list>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="max-width">
        <v-list-item-content>
          <v-container>
            <v-card>
              <v-card-text>
                <v-btn @click="showAddList = true" :disabled="showAddList">Dodaj</v-btn>
              </v-card-text>
            </v-card>
          </v-container>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import TodoListPreview from '@/components/todo-list-preview';
import AddList from '@/components/add-list'

export default {
  name: 'Home',
  components: {TodoListPreview, AddList},
  data() {
    return {
      lists: [],
      showAddList: false
    };
  },
  methods: {
    addList(newList) {
      axios.post('todos/', newList)
          .then(response => response.data)
          .then(list => {
            list.items = JSON.parse(list.items);
            return list;
          })
          .then(list => this.lists.push(list))
          .catch(this.showError.bind(this));
    },
    removeList(index, list) {
      axios.delete(`todos/${list.id}`).then(() => {
        this.lists.splice(index, 1);
      }).catch(() => this.showError('Problem z tworzeniem nowej listy'))
    },
    showDetails(list) {
      this.$router.push(`details/${list.id}`);
    },
    showError(text) {
      console.log(text);
    }
  },
  created() {
    axios.get('todos')
        .then(response => response.data)
        .then(lists => {
              lists.forEach(list => list.items = JSON.parse(list.items));
              return lists;
            }
        )
        .then(lists => this.lists = lists)
        .catch(() => this.showError('Problem z pobieraniem listy'));
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
