<template>
  <div class="app-container">
    <div class="card">
      <div class="card-header pb-0 d-flex justify-content-between align-items-center">
        <h1>Categories</h1>
        <div class="d-flex align-items-center gap-2">
          <input v-model="search" type="text" class="form-control" style="width: 200px" placeholder="Buscar..." />
          <argon-button variant="gradient" color="success" type="button" size="lg" @click="addCategoria">
            Afegir Categoria
          </argon-button>
        </div>
      </div>
      <div class="card-body px-0 pt-0 pb-2 mt-4">
        <div class="p-3">
          <vue-good-table :columns="fields" :rows="filteredCategoria" :search-options="{ enabled: false }"
            :pagination-options="{ enabled: true, perPage: 5 }">
            <!-- Link en el nombre del nombre que lleva a editar Categoria  -->
            <template #table-row="props">
              <template v-if="props.column.field === 'nom'">
                <span @click="$router.push({ name: 'editCategoria', params: { id: props.row.id_categoria } })"
                  style="cursor: pointer; color: #17c1e8; text-decoration: underline;">
                  {{ props.row.nom }}
                </span>
              </template>
            </template>

          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosConn from "../../api/axios";
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  components: {
    ArgonButton
  },
  data() {
    return {
      categories: [],
      search: "",
      fields: [
        { field: "id_categoria", label: "id", sortable: true },
        { field: "nom", label: "Nom", sortable: true },
        { field: "descripcio", label: "Descripcio", sortable: true },
      ],
    };
  },
  computed: {
    filteredCategoria() {
      return this.categories.filter((categoria) =>
        Object.values(categoria).some((value) =>
          String(value).toLowerCase().includes(this.search.toLowerCase())
        )
      );
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const response = await axiosConn.get("/getCategories");
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    addCategoria() {
      this.$router.push({ name: "addCategoria" });
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