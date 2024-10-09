<script setup>
import { computed, ref } from "vue";
import { required, minLength, email, or } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import useAuthStore from "@/stores/auth";
import { storeToRefs } from "pinia";

const identifier = ref("");
const password = ref("");

const rules = computed(() => ({
  identifier: {
    required,
    minLength: minLength(3),
  },
  password: {
    required,
    minLength: minLength(6),
  },
}));

const $v = useVuelidate(
  rules,
  { identifier, password },
  { $autoDirty: true, $lazy: true }
);

const authStore = useAuthStore();
const { authError } = storeToRefs(authStore);
const { login } = authStore;

const onSubmit = async () => {
  const result = await $v.value.$validate();
  if (result) {
    login({
      identifier: identifier.value,
      password: password.value,
    });
  }
};
</script>

<template>
  <div class="grid w-full place-items-center pb-20">
    <Panel header="Login">
      <form class="flex flex-col gap-5 py-3" @submit.prevent="onSubmit">
        <div class="flex flex-col gap-1">
          <InputText
            v-model="identifier"
            placeholder="email or username"
            :invalid="$v.identifier.$invalid"
          />
          <InputError v-if="$v.identifier.$invalid" message="Error message" />
        </div>
        <div class="flex flex-col gap-1">
          <Password
            v-model="password"
            placeholder="password"
            toggleMask
            :invalid="$v.password.$invalid"
          />
          <InputError v-if="$v.password.$invalid" message="Error message" />
        </div>

        <Divider class="!my-0" />

        <Button label="Sign In" type="submit" />
        <InputError v-if="authError" :message="authError" />
      </form>
    </Panel>
  </div>
</template>
