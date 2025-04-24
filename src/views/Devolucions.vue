<template>
  <div class="app-container">
    <div class="card">
      <div class="card-header pb-0 d-flex justify-content-between align-items-center">
        <h1>Comandes</h1>
        <input v-model="search" type="text" class="form-control w-25" placeholder="Buscar..." />
      </div>
      <div class="card-body px-0 pt-0 pb-2 mt-4">
        <div class="p-3">
          <vue-good-table :columns="fields" :rows="filteredDevolucions" :search-options="{ enabled: false }"
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
      devolcions: [],
      search: "",
      selectedStatus: "",
      fields: [
        { field: "id_devolucio", label: "id_devolucio", sortable: true },
        { field: "id_comanda", label: "id_comanda", sortable: true },
        { field: "data", label: "Data", sortable: true },
        { field: "estat", label: "Estat", sortable: true },
        { field: "foto", label: "Foto", sortable: true },
      ],
    };
  },
  computed: {
    filteredDevolucions() {
      return this.devolucion.filter((devolucio) => {
        const matchesSearch = Object.values(devolucio).some((value) =>
          String(value).toLowerCase().includes(this.search.toLowerCase())
        );
        const matchesStatus = this.selectedStatus ? devolucio.Estat === this.selectedStatus : true;
        return matchesSearch && matchesStatus;
      });
    },
  },
  mounted() {
    this.getDevolucions();
  },
  methods: {
    async getDevolucions() {
      try {
        const response = await axiosConn.get("/getDevolucions");
        this.devolucions = response.data;
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