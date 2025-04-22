<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
// import { useStore } from "vuex";
import SidenavItem from "./SidenavItem.vue";
import feather from "feather-icons"; // Asegúrate de que feather-icons está instalado

// const store = useStore();

const route = useRoute();
const getRoute = computed(() => {
  const routeArr = route.path.split("/");
  return routeArr[1] || "";
});

onMounted(() => {
  feather.replace(); // Ejecutar Feather Icons cuando el componente se monte
});
</script>

<template>
  <div class="collapse navbar-collapse w-auto h-auto h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          to="/dashboard-default"
          :class="getRoute === 'dashboard-default' ? 'active' : ''"
          :navText="'Dashboard'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/users"
          :class="getRoute === 'users' ? 'active' : ''"
          :navText="'Users'"
        >
          <template v-slot:icon>
            <i data-feather="users"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          to="/articles"
          :class="getRoute === 'articles' ? 'active' : ''"
          :navText="'Articles'"
        >
          <template v-slot:icon>
            <i data-feather="list"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          to="/comandes"
          :class="getRoute === 'comandes' ? 'active' : ''"
          :navText="'Comandes'"
        >
          <template v-slot:icon>
            <i data-feather="file-text"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          to="/categories"
          :class="getRoute === 'categories' ? 'active' : ''"
          :navText="'Categories'"
        >
          <template v-slot:icon>
            <i data-feather="check-square"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          to="/notificacions"
          :class="getRoute === 'notificacions' ? 'active' : ''"
          :navText="'Notificacions'"
        >
          <template v-slot:icon>
            <i data-feather="send"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          to="/penalitzacions"
          :class="getRoute === 'penalitzacions' ? 'active' : ''"
          :navText="'Penalitzacions'"
        >
          <template v-slot:icon>
            <i data-feather="slash"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/tables"
          :class="getRoute === 'tables' ? 'active' : ''"
          :navText="'Tables'"
        >
          <template v-slot:icon>
            <i class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/billing"
          :class="getRoute === 'billing' ? 'active' : ''"
          :navText="'Billing'"
        >
          <template v-slot:icon>
            <i class="ni ni-credit-card text-success text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/profile"
          :class="getRoute === 'profile' ? 'active' : ''"
          :navText="'Profile'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/signin"
          :class="getRoute === 'signin' ? 'active' : ''"
          :navText="'Sign In'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-copy-04 text-danger text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
    </ul>
  </div>
</template>
