<script setup>
defineProps(["message"]);
</script>
<template>
  <div class="text-sm text-red-600 dark:text-red-400">
    {{ message }}
  </div>
</template>
