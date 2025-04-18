<template>
  <div class="app-container">
    <div class="card">
      <div class="card-header pb-0 d-flex justify-content-between align-items-center">
        <h1>Afegir Categoria</h1>
      </div>
      <div class="card-body px-4 pt-0 pb-4 mt-3">
        <form @submit.prevent="afegirCategoria">
          <div class="row mb-2">
            <div class="col-md-6 mb-2">
              <label for="nom" class="form-label">Nom</label>
              <argon-input id="nom" type="text" placeholder="Nom" v-model="nom" size="lg" />
              <small v-if="errors.nom" class="text-danger">{{ errors.nom }}</small>
            </div>
            <div class="col-md-12 mb-2">
              <label for="desc" class="form-label">Descripció</label>
              <argon-input id="desc" type="text" placeholder="Descripció" v-model="desc" size="lg" />
              <small v-if="errors.desc" class="text-danger">{{ errors.desc }}</small>
            </div>
          </div>
          <div class="text-end d-flex gap-2">
            <argon-button variant="gradient" color="success" type="submit" size="lg">
              Afegir Categoria
            </argon-button>
            <argon-button variant="gradient" color="info" type="button" size="lg"
              @click="$router.push({ name: 'Categories' })">
              Enrere
            </argon-button>
          </div>

        </form>
      </div>
    </div>
    <!-- Tostada -->
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

export default {
  components: {
    ArgonInput,
    ArgonButton,
  },
  data() {
    return {
      nom: "",
      desc: "",
      errors: {
        nom: "",
        desc: ""
      },
      toast: false,
      toastMessage: "",
      toastColor: "success",
    };
  },
  methods: {
    afegirCategoria() {
      this.errors.nom = this.nom.trim() === "" ? "El nom no pot estar buit" : "";
      this.errors.desc = this.desc.trim() === "" ? "La descripció no pot estar buida" : "";

      if (this.errors.nom || this.errors.desc) return;

      axiosConn.post("/addCategoria", { nom: this.nom, desc: this.desc })
        .then((response) => {
          if (response.status === 200) {
            this.toastMessage = "Categoria afegida correctament! ";
            this.toastColor = "success";
            this.toast = true;
            setTimeout(() => {
              this.toast = false;
              this.$router.push({ name: "Categories" });
            }, 2000);
          }
        })
        .catch((error) => {
          this.toastMessage = error.response?.data?.message || "Error inesperat 😵‍💫";
          this.toastColor = "danger";
          this.toast = true;
          setTimeout(() => this.toast = false, 3000);
        });


    },
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
