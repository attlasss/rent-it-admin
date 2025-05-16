<template>
  <div class="app-container">
    <div class="card">
      <div class="card-header pb-0 d-flex justify-content-between align-items-center">
        <h1>Comandes</h1>
        <input v-model="search" type="text" class="form-control w-25" placeholder="Buscar..." />
      </div>
      <div class="card-body px-0 pt-0 pb-2 mt-4">
        <div class="p-3">
          <vue-good-table :columns="fields" :rows="filteredComandes" :search-options="{ enabled: false }"
            :pagination-options="{ enabled: true, perPage: 5 }">
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
      comandes: [],
      search: "",
      selectedStatus: "",
      fields: [
        { field: "id_comanda", label: "id", sortable: true },
        { field: "comprador", label: "Comprador", sortable: true },
        { field: "vendedor", label: "Venedor", sortable: true },
        { field: "id_article", label: "Article", sortable: true },
        { field: "direccio", label: "Direcció", sortable: true },
        { field: "mesos", label: "Mesos", sortable: true },
        { field: "preu_mes", label: "Preu Mes", sortable: true },
        { field: "preu_total", label: "Preu Total", sortable: true },
        { field: "data_order", label: "Data Order", sortable: true },
        { field: "data_inici", label: "Data Inici", sortable: true },
        { field: "data_fi", label: "Data Fi", sortable: true },
        { field: "estat", label: "Estat", sortable: true },
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

