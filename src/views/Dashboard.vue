<template>
  <div class="app-container">
    <div class="card">
      <div class="card-header pb-0 d-flex justify-content-between align-items-center">
        <h1>DASHBOARD</h1>
      </div>
      <div class="card-body px-4 pt-0 pb-4 mt-3">
        <p>
          Benvingut/da, <strong>{{ username }}</strong>! Selecciona una opció per continuar.
        </p>
        <div class="row g-3">
          <div class="col-md-3" v-for="btn in botones" :key="btn.text">
            <argon-button
              variant="gradient"
              :color="btn.color"
              class="w-100 d-flex align-items-center justify-content-center gap-2 py-3"
              @click="goTo(btn.route)"
            >
              <span :data-feather="btn.icon"></span> {{ btn.text }}
            </argon-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import feather from "feather-icons";

export default {
  components: {
    ArgonButton,
  },
  data() {
    return {
      username: "", // Inicializamos el nombre del usuario
      botones: [
        { text: "Articles", icon: "box", color: "success", route: "/articles" },
        { text: "Usuaris", icon: "user", color: "success", route: "/users" },
        { text: "Categories", icon: "grid", color: "success", route: "/categories" },
        { text: "Comandes", icon: "shopping-cart", color: "success", route: "/comandes" },
        { text: "Valoracions", icon: "star", color: "success", route: "/valoracions" },
        { text: "Penalitzacions", icon: "alert-triangle", color: "success", route: "/penalitzacions" },
        { text: "Devolucions", icon: "corner-down-left", color: "success", route: "/devolucions" },
        { text: "Reports", icon: "file-text", color: "success", route: "/reports" },
      ],
    };
  },
  mounted() {
    // Obtener el nombre del usuario desde sessionStorage
    const user = JSON.parse(sessionStorage.getItem("user"));
    this.username = user?.username || "Usuari"; // Si no hay usuario, mostrar "Usuari"

    this.$nextTick(() => {
      feather.replace(); // Recargar íconos Feather en el DOM
    });
  },
  methods: {
    goTo(route) {
      this.$router.push(route);
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
