<template>
  <v-container>
    <v-card>
      <v-card-title>Nowa lista</v-card-title>
      <v-card-text>
        <v-text-field v-model="name"></v-text-field>
        <v-text-field v-model="description"></v-text-field>
      </v-card-text>
      <v-card-actions class="right">
        <div class="d-flex">
          <v-btn :disabled="!Boolean(name && name.length)" @click="add" color="primary">Dodaj</v-btn>
          <v-btn @click="cancel" color="secondary">Anuluj</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'add-list',
  data: () => {
    return {
      name: '', description: ''
    }
  },
  methods: {
    add() {
      this.$emit('add', {name: this.name, description: this.description});
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>

<style scoped>
.right {
  justify-content: flex-end;
}

.d-flex {
  gap: 10px;
}
</style>