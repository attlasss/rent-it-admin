import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import RTL from "../views/Rtl.vue";
import Profile from "../views/Profile.vue";
import Signin from "../views/Signin.vue";
import Users from "../views/Users.vue";
import Comandes from "../views/Comandes.vue";
import Categories from "../views/Categories/Categories.vue";
import AddCategories from "../views/Categories/AddCategories.vue";
import EditCategories from "../views/Categories/EditCategories.vue";
const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/comandes",
    name: "Comandes",
    component: Comandes,
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
  },
  {
    path: "/addCategoria",
    name: "addCategoria",
    component: AddCategories,
  }, 
  {
    path: "/editCategoria/:id",
    name: "editCategoria",
    component: EditCategories,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

export default router;
