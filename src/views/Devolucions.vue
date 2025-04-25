<template>
  <div class="app-container">
    <div class="card">
      <div class="card-header pb-0 d-flex justify-content-between align-items-center">
        <h1>Devolucions</h1>
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
      devolucions: [],
      search: "",
      selectedStatus: "",
      fields: [
        { field: "id_devolucio", label: "ID Devolució", sortable: true },
        { field: "comprador", label: "Comprador", sortable: true },
        { field: "vendedor", label: "Venedor", sortable: true },
        { field: "id_article", label: "ID Article", sortable: true },
        { field: "data", label: "Data", sortable: true },
        { field: "estat", label: "Estat", sortable: true },
        { field: "foto", label: "Foto", sortable: false },
      ],

    };
  },
  computed: {
    filteredDevolucions() {
      return this.devolucions.filter((d) =>
        Object.values(d).some((value) =>
          String(value).toLowerCase().includes(this.search.toLowerCase())
        )
      );
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
        console.error("Error fetching devolucions:", error);
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