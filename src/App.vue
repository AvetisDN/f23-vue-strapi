<script setup>
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import { onMounted } from "vue";
import useAuthStore from "./stores/auth";
import Toast from "primevue/toast";

onMounted(() => {
  const { auth } = useAuthStore();
  if (localStorage.getItem("jwt")) {
    auth(localStorage.getItem("jwt"));
  }
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <div class="container mx-auto my-6 grow flex">
      <RouterView />
    </div>
    <Toast position="bottom-right" />
  </div>
</template>

<style scoped></style>
