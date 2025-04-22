<template>
  <div class="app-container">
    <div class="card">
      <div class="card-header pb-0 d-flex justify-content-between align-items-center">
        <h1>Users</h1>
        <input v-model="search" type="text" class="form-control w-25" placeholder="Buscar..." />
      </div>
      <div class="card-body px-0 pt-0 pb-2 mt-4">
        <div class="p-3">
          <vue-good-table :columns="columns" :rows="filteredUsers" :search-options="{ enabled: false }"
            :pagination-options="{ enabled: true, perPage: 5 }">
            <template #table-row="props">
              <!-- Ban pone si esta activo o baneado -->
              <template v-if="props.column.field === 'ban'">
                <span :class="props.row.ban ? 'text-danger' : 'text-success'">
                  {{ props.row.ban ? 'Banejat' : 'Actiu' }}
                </span>
              </template>
              <template v-if="props.column.field === 'actions'">
                <button class="btn btn-danger btn-sm mb-0" @click="addPenalitzacio(props.row.id)">
                  Afegir Penalitzacio
                </button>
              </template>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosConn from "../api/axios";

export default {
  data() {
    return {
      users: [],
      search: "",
      columns: [
        { label: "ID", field: "id" },
        { label: "User", field: "username" },
        { label: "Nom", field: "nom" },
        { label: "Cognoms", field: "cognoms" },
        { label: "Email", field: "email" },
        { label: "Data Naixement", field: "data_naixement" },
        { label: "DNI", field: "dni" },
        { label: "Status", field: "ban" },
        { label: "Accions", field: "actions" },
      ],
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) =>
        Object.values(user).some((value) =>
          String(value).toLowerCase().includes(this.search.toLowerCase())
        )
      );
    },
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        const response = await axiosConn.get("/getUsers");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    addPenalitzacio(userId) {
      this.$router.push({ name: 'AddPenalitzacio', params: { id: userId } });
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
