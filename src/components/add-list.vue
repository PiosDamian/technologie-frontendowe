<template>
  <v-container>
    <v-card>
      <v-card-title>Nowa lista</v-card-title>
      <v-card-text>
        <v-text-field label="Nazwa" v-model="name"></v-text-field>
        <v-text-field label="Opis" v-model="description"></v-text-field>
      </v-card-text>
      <v-card-actions class="right">
        <div class="d-flex">
          <v-btn :disabled="!Boolean(name && name.length)" @click="add" color="primary">Dodaj</v-btn>
          <v-btn @click="cancel" outlined color="secondary">Anuluj</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  // component z formularzem tworzenia listy
  name: 'add-list',
  data: () => {
    return {
      // pola pomocniecze
      name: '',
      description: ''
    };
  },
  methods: {
    // metody emitujące odpowiednie zdarzenia
    add() {
      this.$emit('add', { name: this.name, description: this.description });
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped>
.right {
  justify-content: flex-end;
}

.d-flex {
  gap: 10px;
}
</style>
