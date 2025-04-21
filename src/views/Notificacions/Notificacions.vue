<template>
  <div class="app-container">
    <div class="card">
      <div class="card-header pb-0 d-flex justify-content-between align-items-center">
        <h1>Notificacions</h1>
        <div class="d-flex align-items-center gap-2">
          <input v-model="search" type="text" class="form-control" style="width: 200px" placeholder="Buscar..." />
          <argon-button variant="gradient" color="success" type="button" size="lg" @click="addNotificacio">
            Afegir Notificacio
          </argon-button>
        </div>
      </div>
      <div class="card-body px-0 pt-0 pb-2 mt-4">
        <div class="p-3">
          <vue-good-table :columns="fields" :rows="filteredNotificacio" :search-options="{ enabled: false }"
            :pagination-options="{ enabled: true, perPage: 5 }">
            <template #table-row="props">
              <template v-if="props.column.field === 'nom'">
                <span @click="$router.push({ name: 'EditNotificacions', params: { id: props.row.id_notificacio } })"
                  style="cursor: pointer; color: #17c1e8; text-decoration: underline;">
                  {{ props.row.nom }}
                </span>
              </template>
              <template v-if="props.column.field === 'actions'">
                <button class="btn btn-danger btn-sm mb-0" @click="deleteNotificacio(props.row.id_notificacio)">
                  Eliminar
                </button>
              </template>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="toast" class="toast-message text-white px-3 py-2 rounded shadow position-fixed bottom-0 end-0 m-4"
        :class="toastColor === 'success' ? 'bg-success' : 'bg-danger'">
        {{ toastMessage }}
      </div>
    </transition>
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
      notificacions: [],
      search: "",
      fields: [
        { field: "id_notificacio", label: "id", sortable: true },
        { field: "nom", label: "Nom", sortable: true },
        { field: "descripcio", label: "Descripcio", sortable: true },
        { field: "missatge", label: "Missatge", sortable: true },
        { field: "actions", label: "Accions" }, // Nueva columna para acciones
      ],
      toast: false,
      toastMessage: "",
      toastColor: "success",
    };
  },
  computed: {
    filteredNotificacio() {
      return this.notificacions.filter((n) =>
        Object.values(n).some((value) =>
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
        const response = await axiosConn.get("/getNotificacions");
        // Obtenemos las notificacions de la respuesta de la funcion de getNotifications
        this.notificacions = response.data;
      } catch (error) {
        console.error("Error fetching notificacions:", error);
      }
    },
    addNotificacio() {
      this.$router.push({ name: "AddNotificacions" });
    },
    async deleteNotificacio(id) {
  if (!confirm("Estàs segur que vols eliminar aquesta notificació?")) {
    return;
  }

  try {
    const response = await axiosConn.delete(`/deleteNotificacio/${id}`);
    if (response.status === 200) {
      this.toastMessage = "Notificació eliminada correctament!";
      this.toastColor = "success";
      this.toast = true;
      setTimeout(() => {
        this.toast = false;
        this.$router.push({ name: "Notificacions" });
      }, 2000);
      // Recarga la pagina 
      this.getData(); // Actualiza la lista de notificacions después de eliminar
    }
  } catch (error) {
    this.toastMessage = error.response?.data?.message || "Error inesperat 😵‍💫";
    this.toastColor = "danger";
    this.toast = true;
    setTimeout(() => this.toast = false, 3000);
  }
}

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