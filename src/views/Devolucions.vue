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
            <template v-slot:table-row="props">
              <template v-if="props.column.field === 'foto'">
                <div class="d-flex align-items-center">
                  <img :src="props.row.foto" alt="Article Image" class="img-thumbnail me-2"
                    style="width: 50px; height: 50px;" />
                </div>
              </template>
              <template v-else>
                {{ props.formattedRow[props.column.field] }}
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
      devolucions: [],
      search: "",
      selectedStatus: "",
      fields: [
        { field: "id_devolucio", label: "ID Devolució", sortable: true },
        { field: "comprador", label: "Comprador", sortable: true },
        { field: "vendedor", label: "Venedor", sortable: true },
        { field: "id_article", label: "ID Article", sortable: true },
        { field: "data", label: "Data", sortable: true },
        { field: "estat_devolucio", label: "Estat Devolució", sortable: true },
        { field: "comentari", label: "Comentari", sortable: true },
        { field: "estat_article", label: "Estat Article", sortable: true },
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
        const response = await axiosConn.get("/getDevolucion");
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