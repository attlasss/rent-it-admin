<template>
  <div class="app-container">
    <div class="card">
      <div class="card-header pb-0 d-flex justify-content-between align-items-center">
        <h1>Comandes</h1>
        <div class="d-flex gap-2 w-50">
          <select v-model="selectedStatus" class="form-select w-70">
            <option value="">Totes</option>
            <option value="activa">Actives</option>
            <option value="finalitzada">Finalitzades</option>
            <option value="cancelada">Cancel·lades</option>
          </select>
          <input v-model="search" type="text" class="form-control w-50" placeholder="Buscar..." />
        </div>
      </div>
      <div class="card-body px-0 pt-0 pb-2 mt-4">
        <div class="table-responsive p-0">
          <b-table striped hover bordered class="table align-items-center mb-0" :items="filteredComandes" :fields="fields">
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
      comandes: [],
      search: "",
      selectedStatus: "",
      fields: [
        { key: "id", label: "id", sortable: true },
        { key: "comprador", label: "Comprador", sortable: true },
        { key: "venedor", label: "Venedor", sortable: true },
        { key: "id_article", label: "Article", sortable: true },
        { key: "Data", label: "Data", sortable: true },
        { key: "Estat", label: "Estat", sortable: true },
      ],
    };
  },
  computed: {
    filteredComandes() {
      return this.comandes.filter((comanda) => {
        const matchesSearch = Object.values(comanda).some((value) =>
          String(value).toLowerCase().includes(this.search.toLowerCase())
        );
        const matchesStatus = this.selectedStatus ? comanda.Estat === this.selectedStatus : true;
        return matchesSearch && matchesStatus;
      });
    },
  },
  mounted() {
    this.getComandes();
  },
  methods: {
    async getComandes() {
      try {
        const response = await axiosConn.get("/getComandes");
        this.comandes = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
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

