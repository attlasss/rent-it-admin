<template>
  <div class="app-container">
    <div class="card">
      <div class="card-header pb-0 d-flex justify-content-between align-items-center">
        <h1>Afegir Penalització a Usuari</h1>
      </div>
      <div class="card-body px-4 pt-0 pb-4 mt-3">
        <form @submit.prevent="addPenalitzacio">
          <div class="row mb-2">
            <div class="col-md-6 mb-2">
              <label for="nom" class="form-label">Usuari</label>
              <argon-input id="user" type="text" placeholder="User" v-model="username" size="lg" disabled />
            </div>
            <div class="col-md-6 mb-2">
              <label for="rao" class="form-label">Rao</label>
              <argon-select id="rao" v-model="rao" :options="rao_options" size="lg" />
              <small v-if="errors.rao" class="text-danger">{{ errors.rao }}</small>
            </div>
            <div class="col-md-6 mb-2">
              <label for="tipus" class="form-label">Tipus</label>
              <argon-select id="tipus" v-model="tipus" :options="tipus_options" size="lg" />
              <small v-if="errors.missatge" class="text-danger">{{ errors.tipus }}</small>
            </div>
            <div class="col-md-6 mb-2" v-if="tipus === 'temporal'">
              <label for="data_fi" class="form-label">Data Fi</label>
              <argon-input id="data_fi" type="date" placeholder="Date" v-model="data_fi" size="lg" />
              <small v-if="errors.data_fi" class="text-danger">{{ errors.data_fi }}</small>
            </div>
          </div>
          <div class="text-end d-flex gap-2">
            <argon-button variant="gradient" color="success" type="submit" size="lg">
              Afegir Penalització
            </argon-button>
            <argon-button variant="gradient" color="info" type="button" size="lg"
              @click="$router.push({ name: 'Users' })">
              Enrere
            </argon-button>
          </div>

        </form>
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
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonSelect from "@/components/ArgonSelect.vue";

export default {
  components: {
    ArgonInput,
    ArgonButton,
    ArgonSelect,
  },
  // Variables 
  data() {
    return {
      user: "",
      rao: "",
      tipus: "",
      data_fi: "",
      tipus_options: [
        { value: "temporal", label: "Temporal" },
        { value: "permanent", label: "Permanent" },
      ],
      rao_options: [
        { value: "impagament", label: "Impagament" },
        { value: "comportament_inadequat", label: "Comportament inadequat" },
        { value: "ús_indegut", label: "Ús indegut del dispositiu" },
        { value: "incompliment_condicions", label: "Incompliment de les condicions" },
        { value: "altres", label: "Altres" }
      ],
      errors: {
        user: "",
        rao: "",
        tipus: "",
        data_fi: "",
      },
      username: "",
      toast: false,
      toastMessage: "",
      toastColor: "success",
    };
  },
  // Muntatge del component
  mounted() {
    this.getData();
  },
  methods: {
    addPenalitzacio() {
      // Validación de formulario
      this.errors.rao = this.rao.trim() === "" ? "La raó no pot estar buida" : "";
      this.errors.tipus = this.tipus.trim() === "" ? "El tipus no pot estar buit" : "";

      // Validación de la fecha de fin (data_fi)
      if (this.tipus === "temporal") {
        if (!this.data_fi) {
          this.errors.data_fi = "La data de fi és obligatòria";
        } else if (this.data_fi < new Date().toISOString().split("T")[0]) {
          this.errors.data_fi = "Data Fi no pot ser menor a avui";
        } else {
          this.errors.data_fi = ""; // Si la validación pasa, eliminar cualquier mensaje de error
        }
      }

      // Si hay errores, no continuamos con la solicitud
      if (this.errors.rao || this.errors.tipus || this.errors.data_fi) return;

      // Realizamos la solicitud POST para agregar la penalización
      axiosConn.post("/addPenalitzacio", {
        id_usuari: this.$route.params.id,
        rao: this.rao,
        tipus: this.tipus,
        data_fi: this.data_fi,
      }).then((response) => {
        if (response.status === 200) {
          this.toastMessage = "Penalització afegida correctament!";
          this.toastColor = "success";
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
            this.$router.push({ name: "Users" });
          }, 2000);
        }
      })
        .catch((error) => {
          // El operador ?. es un encadenamiento opcional que permite acceder a propiedades de un objeto
          // sin tener que verificar si el objeto es nulo o indefinido.
          // Si error.response es nulo o indefinido, no se lanzará un error.
          this.toastMessage = error.response?.data?.message || "Error inesperat 😵‍💫";
          this.toastColor = "danger";
          this.toast = true;
          setTimeout(() => this.toast = false, 3000);
        });
    },

    getData() {
      // Obtenemos el usuario que queremos banear llamando a la funcion
      axiosConn.get(`/getUser/${this.$route.params.id}`)
        .then((response) => {
          this.username = response.data.username;
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
}

.toast-message {
  z-index: 1055;
}
</style>