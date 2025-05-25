<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
// import { useStore } from "vuex";
import SidenavItem from "./SidenavItem.vue";
import feather from "feather-icons"; 

const route = useRoute();
const getRoute = computed(() => {
  const routeArr = route.path.split("/");
  return routeArr[1] || "";
});

onMounted(() => {
  feather.replace(); // Ejecutar Feather Icons cuando el componente se monte
});

feather.replace(); // Reemplazar los iconos de Feather en el DOM
</script>

<template>
  <div class="collapse navbar-collapse w-auto h-auto h-100" id="sidenav-collapse-main">
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          to="/dashboard"
          :class="getRoute === 'dashboard' ? 'active' : ''"
          :navText="'Dashboard'"
        >
          <template v-slot:icon>
             <span data-feather="layout"></span>
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
            <span data-feather="user"></span>
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
            <span data-feather="box"></span>
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
            <span data-feather="shopping-cart"></span>
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
            <span data-feather="grid"></span>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/devolucions"
          :class="getRoute === 'devolucions' ? 'active' : ''"
          :navText="'Devolucions'"
        >
          <template v-slot:icon>
            <span data-feather="corner-down-left"></span>
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
            <span data-feather="alert-triangle"></span>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/valoracions"
          :class="getRoute === 'valoracions' ? 'active' : ''"
          :navText="'Valoracions'"
        >
          <template v-slot:icon>
            <span data-feather="star"></span>
          </template>
        </sidenav-item>
      </li>

      <li class="nav-item">
        <sidenav-item
          to="/reports"
          :class="getRoute === 'reports' ? 'active' : ''"
          :navText="'Reports'"
        >
          <template v-slot:icon>
            <span data-feather="file-text"></span>
          </template>
        </sidenav-item>
      </li>
    </ul>
  </div>
</template>

