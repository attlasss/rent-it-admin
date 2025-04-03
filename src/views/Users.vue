<template>
  <div class="app-container">
    <div class="card">
      <div class="card-header pb-0 d-flex justify-content-between align-items-center">
        <h1>Users</h1>
        <input v-model="search" type="text" class="form-control w-25" placeholder="Buscar..." />
      </div>
      <div class="card-body px-0 pt-0 pb-2 mt-4">
        <div class="table-responsive p-0">
          <b-table striped hover bordered class="table align-items-center mb-0" :items="filteredUsers" :fields="fields">
            <template #cell(username)="data">
              <div class="d-flex px-2 py-1">
                <div>
                  <img :src="data.item.foto_perfil || '../../assets/img/default-avatar.jpg'" class="avatar avatar-sm me-3"
                    alt="user" />
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">{{ data.item.username }}</h6>
                  <p class="text-xs text-secondary mb-0">{{ data.item.email }}</p>
                </div>
              </div>
            </template>

            <template #cell(ban)="data">
              <span class="badge badge-sm" :class="data.item.ban ? 'bg-gradient-danger' : 'bg-gradient-success'">
                {{ data.item.ban ? "Ban" : "Actiu" }}
              </span>
            </template>
          </b-table>
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
      fields: [
        { key: "id", label: "id", sortable: true },
        { key: "username", label: "User", sortable: true },
        { key: "nom", label: "Nom", sortable: true },
        { key: "cognoms", label: "Cognoms", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "data_naixement", label: "Data Naixement", sortable: true },
        { key: "dni", label: "DNI", sortable: true },
        { key: "ban", label: "Status", sortable: true },
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
  },
};
</script>

<style scoped>
/* Hace que el contenedor ocupe toda la pantalla */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
