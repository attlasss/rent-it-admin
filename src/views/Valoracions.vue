<template>
  <div class="app-container">
    <div class="card">
      <div class="card-header pb-0 d-flex justify-content-between align-items-center">
        <h1>Valoracions</h1>
        <input v-model="search" type="text" class="form-control w-25" placeholder="Buscar..." />
      </div>
      <div class="card-body px-0 pt-0 pb-2 mt-4">
        <div class="p-3">
          <vue-good-table :columns="fields" :rows="filteredValoracions" :search-options="{ enabled: false }"
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
      valoracions: [],
      search: "",
      selectedStatus: "",
      fields: [
        { field: "id_valoracio", label: "ID Valoracio", sortable: true },
        { field: "emissor", label: "Emissor", sortable: true },
        { field: "receptor", label: "Receptor", sortable: true },
        { field: "puntuacio", label: "Puntuacio", sortable: true },
        { field: "comentari", label: "Comentari", sortable: true },
      ],

    };
  },
  computed: {
    filteredValoracions() {
      return this.valoracions.filter((d) =>
        Object.values(d).some((value) =>
          String(value).toLowerCase().includes(this.search.toLowerCase())
        )
      );
    },
  },
  mounted() {
    this.getValoracions();
  },
  methods: {
    async getValoracions() {
      try {
        const response = await axiosConn.get("/getValoracions");
        this.valoracions = response.data;
      } catch (error) {
        console.error("Error fetching valoracions:", error);
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