<template>
  <Button
    @click="toggleDarkMode()"
    :icon="`pi pi-${darkMode ? 'moon' : 'sun'}`"
    severity="contrast"
    size="small"
  />
</template>

<script setup>
import { ref } from "vue";

const element = document.querySelector("html");

if (!localStorage.getItem("darkMode")) {
  localStorage.setItem(
    "darkMode",
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

const darkMode = ref(JSON.parse(localStorage.getItem("darkMode")));

if (darkMode.value) {
  element.classList.add("dark");
}

function toggleDarkMode() {
  element.classList.toggle("dark");
  darkMode.value = !darkMode.value;
  localStorage.setItem("darkMode", darkMode.value);
}
</script>
