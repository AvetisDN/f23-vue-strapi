<script setup>
import Menubar from "primevue/menubar";
import { computed, ref } from "vue";
import ThemeToggle from "./ThemeToggle.vue";
import useAuthStore from "@/stores/auth";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { logout } = authStore;
const { user } = storeToRefs(authStore);

const apiUrl = import.meta.env.VITE_API_URL;

const menuiItems = computed(() => [
  {
    label: "Home",
    icon: "pi pi-home",
    route: "/",
  },
  {
    label: "Login",
    route: "/login",
    visible: !user.value,
  },
  {
    label: "Register",
    route: "/register",
    visible: !user.value,
  },
  {
    label: "Dashboard",
    route: "/dashboard",
    visible: user.value !== null,
  },
]);
</script>

<template>
  <header class="!sticky top-0 bg-surface-50 dark:bg-surface-800">
    <Menubar :model="menuiItems">
      <template #start>
        <RouterLink to="/" class="font-black text-xl mr-6">LOGO</RouterLink>
      </template>
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span v-if="item.icon" :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
      </template>
      <template #end>
        <div class="flex gap-6 items-center">
          <div>
            <span v-if="!user">Hello, Guest</span>
            <span v-else class="flex items-center gap-2">
              <Avatar
                size="large"
                shape="circle"
                class="font-black !bg-surface-300 !text-surface-700 dark:!bg-surface-700 dark:!text-surface-400"
                :image="`${apiUrl}${user.avatar?.formats?.thumbnail?.url}`"
                :label="user.avatar ? '' : user.username[0].toUpperCase()"
              />
              {{ user.username }}
            </span>
          </div>
          <div v-if="user">
            <Button
              label="Logout"
              severity="danger"
              size="small"
              @click="logout"
            />
          </div>
          <ThemeToggle />
        </div>
      </template>
    </Menubar>
  </header>
</template>
