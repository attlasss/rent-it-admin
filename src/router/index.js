import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Signin from "../views/Signin.vue";
import Users from "../views/Users.vue";
import Comandes from "../views/Comandes.vue";
import Categories from "../views/Categories/Categories.vue";
import AddCategories from "../views/Categories/AddCategories.vue";
import EditCategories from "../views/Categories/EditCategories.vue";
import Articles from "../views/Articles.vue";
import Penalitzacio from "../views/Penalitzacio/Penalitzacions.vue";
import AddPenalitzacio from "../views/Penalitzacio/AddPenalitzacio.vue";
import Devolucions from "../views/Devolucions";
import Valoracions from "../views/Valoracions";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/login",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: { requiresAuth: true },
  },
  {
    path: "/articles",
    name: "Articles",
    component: Articles,
    meta: { requiresAuth: true },
  },
  {
    path: "/comandes",
    name: "Comandes",
    component: Comandes,
    meta: { requiresAuth: true },
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
    meta: { requiresAuth: true },
  },
  {
    path: "/addCategoria",
    name: "addCategoria",
    component: AddCategories,
    meta: { requiresAuth: true },
  }, 
  {
    path: "/editCategoria/:id",
    name: "editCategoria",
    component: EditCategories,
    meta: { requiresAuth: true },
  },
  {
    path: "/addPenalitzacio/:id",
    name: "AddPenalitzacio",
    component: AddPenalitzacio,
    meta: { requiresAuth: true },
  },
  {
    path: "/penalitzacions",
    name: "Penalitzacions",
    component: Penalitzacio,
    meta: { requiresAuth: true },
  },
  {
    path: "/valoracions",
    name: "Valoracions",
    component: Valoracions,
    meta: { requiresAuth: true },
  },
  {
    path: "/devolucions",
    name: "Devolucions",
    component: Devolucions,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Signin,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' });
  } else if (to.name === 'Login' && token) {
    // si ya está logeada y quiere ir a login, redirigila al dashboard
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});


export default router;
