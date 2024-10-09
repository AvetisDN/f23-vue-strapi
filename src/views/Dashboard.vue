<script setup>
import useAuthStore from "@/stores/auth";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const src = ref(null);

const authStore = useAuthStore();
const { fetchUser } = authStore;
const { user } = storeToRefs(authStore);

function onFileSelect(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = async (e) => {
    src.value = e.target.result;
  };

  reader.readAsDataURL(file);
}

const apiUrl = import.meta.env.VITE_API_URL;

async function onSubmit(event) {
  const formData = new FormData(event.target);
  const response = await fetch(`${apiUrl}/api/upload`, {
    method: "post",
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  const result = await response.json();

  const updateResponse = await fetch(`${apiUrl}/api/users/${user.value.id}`, {
    method: "PUT",
    body: JSON.stringify({
      avatar: result[0],
    }),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    },
  });

  const updateResult = await updateResponse.json();

  fetchUser(localStorage.getItem("jwt"));
}
</script>

<template>
  <Panel header="Dashboard" class="w-full">
    <form class="flex flex-col items-center" @submit.prevent="onSubmit">
      <input
        type="file"
        id="file"
        name="files"
        @change="onFileSelect"
        class="hidden"
      />
      <label
        for="file"
        class="my-5 bg-surface-300 dark:bg-surface-600 p-4 rounded-lg"
      >
        <i class="pi pi-plus"></i>
        Browse image
      </label>
      <img
        v-if="src"
        :src="src"
        alt="Image"
        class="shadow-md rounded-xl w-full sm:w-64 mx-auto my-5"
      />
      <Button type="submit" label="Upload" size="large" />
    </form>
  </Panel>
</template>
