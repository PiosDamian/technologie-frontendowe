<template>
  <v-container>
    <div class="alerts">
      <v-alert dismissible text dense outlined :type="alert.type" v-for="(alert, index) of alerts" :key="index">{{ alert.text }}</v-alert>
    </div>
    <v-list class="d-flex align-start flex-wrap">
      <v-list-item v-for="(list, index) in lists" :key="index" class="max-width">
        <v-list-item-content>
          <todo-list-preview @delete="removeList(index, list)" @details="showDetails(list)" :list="list"></todo-list-preview>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="showAddList" class="max-width">
        <v-list-item-content>
          <add-list
            @add="
              addList($event);
              showAddList = false;
            "
            @cancel="showAddList = false"
          ></add-list>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="max-width">
        <v-list-item-content>
          <v-container>
            <v-card>
              <v-card-text style="text-align: center">
                <v-btn @click="showAddList = true" :disabled="showAddList" outlined color="primary" :loading="loading">Dodaj</v-btn>
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
import AddList from '@/components/add-list';

export default {
  name: 'Home',
  components: { TodoListPreview, AddList },
  data() {
    return {
      // wszystkie listy
      lists: [],
      // czy widok dodawania listy ma być widoczny
      showAddList: false,
      // pokazuje stan ładowania
      loading: true,
      // lista alertów
      alerts: []
    };
  },
  methods: {
    // dodawanie nowej listy
    addList(newList) {
      this.loading = true;
      axios
        .post('todos/', newList)
        .then(response => response.data)
        .then(list => {
          list.items = JSON.parse(list.items);
          return list;
        })
        .then(list => this.lists.push(list))
        .then(() => this.showAlert(`Lista ${newList.name} została utowrzona`, 'success'))
        .catch(() => this.showAlert(`Problem z tworzeniem listy ${newList.name}`, 'error'))
        .finally(() => (this.loading = false));
    },
    // usuwanie listy
    removeList(index, list) {
      this.loading = true;
      axios
        .delete(`todos/${list.id}`)
        .then(() => {
          this.lists.splice(index, 1);
        })
        .then(() => this.showAlert(`Lista ${list.name} została usunięta`, 'info'))
        .catch(() => this.showAlert(`Problem z usuwaniem listy ${list.name}`, 'error'))
        .finally(() => (this.loading = false));
    },
    // przekierowanie na szczegóły listy
    showDetails(list) {
      this.$router.push(`details/${list.id}`);
    },
    // wyświetlanie alertów
    showAlert(text, type) {
      this.alerts.push({ text: text, type });
      setTimeout(() => this.alerts.shift(), 5000);
    }
  },
  created() {
    // pobieranie wszystkich list
    axios
      .get('todos')
      .then(response => response.data)
      .then(lists => {
        // listy przechowywane są jako string, front musi przekonwertować to na listę
        lists.forEach(list => (list.items = JSON.parse(list.items)));
        return lists;
      })
      .then(lists => (this.lists = lists))
      .catch(() => this.showAlert('Problem z pobieraniem listy'))
      .finally(() => (this.loading = false));
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

.alerts {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 300px;
  z-index: 100;
}
</style>
