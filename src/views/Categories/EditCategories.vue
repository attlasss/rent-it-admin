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
          <div class="text-end">
            <argon-button variant="gradient" color="success" type="submit" size="lg">
              Afegir Categoria
            </argon-button>
          </div>
          <div class="text-end">
            <argon-button variant="gradient" color="success" type="submit" size="lg">
              Enrere
            </argon-button>
          </div>
        </form>
      </div>
    </div>
    <transition name="fade">
      <div v-if="toast"
        class="toast-message bg-success text-white px-3 py-2 rounded shadow position-fixed bottom-0 end-0 m-4">
        Categoria afegida correctament! 🎉
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
    };
  },
  methods: {
    initData() {
      axiosConn.get("/getCategoria", { params: { id_categoria: this.$route.params.id_categoria } })
        .then((response) => {
          this.nom = response.data.nom;
          this.desc = response.data.descripcio;
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    },
    afegirCategoria() {
      this.errors.nom = this.nom.trim() === "" ? "El nom no pot estar buit" : "";
      this.errors.desc = this.desc.trim() === "" ? "La descripció no pot estar buida" : "";

      if (this.errors.nom || this.errors.desc) return;

      axiosConn.post("/addCategoria", { nom: this.nom, desc: this.desc })
        .then((response) => {
          console.log(response.data);
          this.toast = true;
          setTimeout(() => this.toast = false, 3000); // ocultar toast a los 3s
          setTimeout(() => {
            this.$router.push({ name: "addCategoria" });
          }, 1000); // redirige después de 1s
        })
        .catch((error) => {
          console.error(error);
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
