import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthLogin from "@/views/AuthLogin.vue";
import AuthRegister from "@/views/AuthRegister.vue";
import Dashboard from "@/views/Dashboard.vue";
import useAuthStore from "@/stores/auth";
import { storeToRefs } from "pinia";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        isPrivate: false,
      },
    },
    {
      path: "/login",
      name: "login",
      component: AuthLogin,
      meta: {
        isPrivate: false,
      },
    },
    {
      path: "/register",
      name: "register",
      component: AuthRegister,
      meta: {
        isPrivate: false,
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        isPrivate: true,
      },
    },
  ],
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);

  if (to.meta.isPrivate && !user.value) {
    return { name: "login" };
  }
});

export default router;
