<template>
  <v-container>
    <div class="alerts">
      <v-alert dismissible text dense outlined :type="alert.type" v-for="(alert, index) of alerts" :key="index">{{ alert.text }}</v-alert>
    </div>
    <div v-if="!error">
      <div v-if="editMode" class="d-flex justify-space-between align-center">
        <div class="d-flex justify-lg-space-between align-center">
          <v-text-field label="Nazwa" v-model="name"></v-text-field>
          <v-text-field label="Opis" v-model="description"></v-text-field>
        </div>
        <div>
          <v-btn @click="updateInfo" color="primary">Zapisz</v-btn>
          <v-btn @click="editMode = false" outlined color="primary">Anuluj</v-btn>
        </div>
      </div>
      <div v-if="!editMode && !!list">
        <div class="d-flex justify-space-between align-center">
          <h2>{{ list.name }}</h2>
          <v-btn @click="editMode = true" outlined color="secondary">Edytuj</v-btn>
        </div>
        <p>{{ list.description }}</p>
        <v-spacer></v-spacer>
      </div>
      <v-list>
        <v-list-item v-for="(item, index) in list.items" :key="index">
          <v-list-item-action>
            <v-checkbox v-model="item.done" @click="update(list)"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title @click="item.done = !item.done" :class="{ 'text-decoration-line-through': item.done }">
              {{ item.name }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn color="error" outlined @click="removeItem">Usuń</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <div class="d-flex justify-space-between align-center">
        <v-text-field label="Nowe zadanie" v-model="newItem"></v-text-field>
        <v-btn @click="addItem" :disabled="!Boolean(newItem)" color="primary">
          <v-icon left v-if="Boolean(newItem)">mdi-check</v-icon>
          Dodaj
        </v-btn>
      </div>
    </div>
    <v-card v-if="!!error">
      {{ error }}
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  // komponent szczegółów listy
  name: 'list-details',
  data() {
    return {
      // id listy pobierane z url
      id: null,
      // przechowywanie błędu pobiearnia informacji o liście
      error: null,
      // szczegóły listy
      list: null,
      // tryb w jakim pracujemy
      editMode: false,
      // zmienne pomocnicze do edycji listy
      name: '',
      description: '',
      newItem: '',
      // tablica przechowująca alerty
      alerts: []
    };
  },
  created() {
    // przechowanie id z url
    this.id = this.$route.params.id;
    // pobieranie szczegułów z backednu - przy optymalizacji można wprowadzić serwis który przechowuje stan aplikacji
    axios
      .get(`todos/${this.id}`)
      .then(response => response.data)
      .then(list => {
        list.items = JSON.parse(list.items);
        this.list = list;
        return list;
      })
      .then(() => {
        this.name = this.list.name;
        this.description = this.list.description;
      })
      .catch(() => (this.error = `problem z pobieraniem danych - lista ${this.$route.params.id}`));
  },
  methods: {
    // dodaje element z listy i wysyła żądanie put
    addItem() {
      this.list.items.push({ name: this.newItem });
      this.update(this.list);
      this.newItem = '';
    },
    // usuwa element z listy i wysyła żądanie put
    removeItem(index) {
      this.list.items.splice(index, 1);
      this.update(this.list);
    },
    // przygotowuje objekt i wysyła żądanie put
    update(value) {
      const tmpList = {};
      tmpList.name = value.name;
      tmpList.description = value.description;
      tmpList.items = JSON.stringify(value.items);
      return axios
        .put(`todos/${this.id}/`, tmpList)
        .catch(() => this.reportError(`Nie udało się uaktualnić listy ${this.list.name}`))
        .then(response => response.data)
        .then(list => {
          list.items = JSON.parse(list.items);
          return list;
        });
    },
    // aktualizuje nazwą i/lub opus
    updateInfo() {
      this.update({ name: this.name, description: this.description, items: this.list.items }).then(list => (this.list = list));
      this.editMode = false;
    },
    // wyświetla alert, ustawia timeout który usunie najstarszy alert
    reportError(errorText) {
      this.alerts.push({ text: errorText, type: 'error' });
      setTimeout(() => this.alerts.shift(), 5000);
    }
  }
};
</script>

<style scoped>
.d-flex {
  column-gap: 10px;
}
</style>
