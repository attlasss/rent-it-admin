<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column">
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="
                  background-image: url('https://i.pinimg.com/736x/b1/b0/f4/b1b0f4bd90df16c012e2576f002288e7.jpg');
                  background-size: cover;
                ">
                <span class="mask bg-gradient-success opacity-6"></span>
              </div>
            </div>
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 order-lg-1">
              <div class="card card-plain">
                <div class="text-center my-4">
                  <h1 class="logo">Rent IT</h1>
                </div>
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">INICIAR SESSIÓ</h4>
                  <p class="mb-0">Introdueix el teu usuari i contrasenya per iniciar sessió</p>
                </div>
                <div class="card-body">
                  <form @submit.prevent="login">
                    <div class="mb-3">
                      <argon-input id="username" type="text" placeholder="Username" v-model="username" size="lg" />
                      <span id="error_username"></span>
                    </div>
                    <div class="mb-3">
                      <argon-input id="password" type="password" placeholder="Password" v-model="password" size="lg" />
                      <span id="error_password"></span>
                    </div>
                    <div class="text-center">
                      <argon-button class="mt-4" variant="gradient" color="success" type="submit" fullWidth size="lg"
                        @click="login">
                        INICIAR SESSIÓ
                      </argon-button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <transition name="fade">
      <div v-if="toast" class="toast-message text-white px-3 py-2 rounded shadow position-fixed bottom-0 end-0 m-4"
        :class="toastColor === 'success' ? 'bg-success' : 'bg-danger'">
        {{ toastMessage }}
      </div>
    </transition>
  </main>
</template>

<script>
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { mapState } from "vuex";
import axiosConn from '../api/axios';

export default {
  components: {
    ArgonInput,
    ArgonButton
  },
  data() {
    return {
      username: "",
      password: "",
      body: document.getElementsByTagName("body")[0],
      toast: false,
      toastMessage: "",
      toastColor: "success",
    };
  },
  computed: {
    ...mapState(["hideConfigButton", "showNavbar", "showSidenav", "showFooter"])
  },
  methods: {
    async login() {
      if (!this.comprobaciones()) return;
      await axiosConn.post('/login', {
        username: this.username,
        password: this.password
      }).then(response => {
        if (response.data.success) {
          // guarda el token i l'usuari a sessionStorage
          sessionStorage.setItem("user", JSON.stringify(response.data.user));
          sessionStorage.setItem("token", response.data.token);
          this.$router.push({ name: "Dashboard" });
        } else {
          this.toastMessage = response.data.message; 
          this.toastColor = "danger";
          this.toast = true;
          setTimeout(() => {
            this.toast = false;
          }, 2000);
        }
      }).catch(error => {
        this.toastMessage = "Error intern" + error ;
        this.toastColor = "danger";
        this.toast = true;
        setTimeout(() => {
          this.toast = false;
        }, 2000);
      });
    },

    comprobaciones() {
      let isValid = true;

      if (!this.username) {
        document.getElementById("error_username").innerHTML = "*El camp usuari és obligatori";
        isValid = false;
      } else {
        document.getElementById("error_username").innerHTML = "";
      }

      if (!this.password) {
        document.getElementById("error_password").innerHTML = "*El camp contrasenya és obligatori";
        isValid = false;
      } else {
        document.getElementById("error_password").innerHTML = "";
      }

      return isValid;
    }

  },
  mounted() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    this.body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    this.body.classList.add("bg-gray-100");
  }

};
</script>
<style>
.toast-message {
  z-index: 1055;
}
</style>
