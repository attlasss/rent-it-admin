<template>
  <nav
    class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
    v-bind="$attrs"
    id="navbarBlur"
    data-scroll="true"
  >
    <div class="px-3 py-1 container-fluid d-flex justify-content-between align-items-center">
      <breadcrumbs
        :current-page="currentRouteName"
        :current-directory="currentDirectory"
      />

      <button class="btn bg-white" @click="logout">
        <span data-feather="log-out"></span>
        <span class="d-sm-inline d-none">Tanca Sessió</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Breadcrumbs from "../Breadcrumbs.vue";
import feather from "feather-icons"; 

const route = useRoute();
const router = useRouter();

const currentRouteName = computed(() => route.name);
const currentDirectory = computed(() => {
  let dir = route.path.split("/")[1];
  return dir.charAt(0).toUpperCase() + dir.slice(1);
});

feather.replace();
function logout() {

  // limpiamos todo el local storage 
  localStorage.clear(); 
  router.push("/login");
}
</script>
