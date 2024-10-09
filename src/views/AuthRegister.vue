<script setup>
import { computed, ref } from "vue";
import { required, minLength, email, sameAs } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import useAuthStore from "@/stores/auth";
import { storeToRefs } from "pinia";

const username = ref("");
const mail = ref("");
const password = ref("");
const confirmPassword = ref("");

const rules = computed(() => ({
  username: {
    required,
    minLength: minLength(3),
  },
  mail: {
    required,
    email,
  },
  password: {
    required,
    minLength: minLength(6),
  },
  confirmPassword: {
    required,
    minLength: minLength(6),
    sameAsPassword: sameAs(password.value),
  },
}));

const $v = useVuelidate(
  rules,
  { username, mail, password, confirmPassword },
  { $autoDirty: true, $lazy: true }
);

const authStore = useAuthStore();
const { authError } = storeToRefs(authStore);
const { register } = authStore;

const onSubmit = async () => {
  const result = await $v.value.$validate();
  if (result) {
    register({
      username: username.value,
      email: mail.value,
      password: password.value,
    });
  }
};
</script>

<template>
  <div class="grid w-full place-items-center pb-20">
    <Panel header="Register">
      <form class="flex flex-col gap-5 py-3" @submit.prevent="onSubmit">
        <div class="flex flex-col gap-1">
          <InputText
            v-model="username"
            placeholder="username"
            :invalid="$v.username.$invalid"
          />
          <InputError v-if="$v.username.$invalid" message="Error message" />
        </div>
        <div class="flex flex-col gap-1">
          <InputText
            v-model="mail"
            placeholder="email"
            type="email"
            :invalid="$v.mail.$invalid"
          />
          <InputError v-if="$v.mail.$invalid" message="Error message" />
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
        <div class="flex flex-col gap-1">
          <Password
            v-model="confirmPassword"
            placeholder="confirm password"
            toggleMask
            :invalid="$v.confirmPassword.$invalid"
          />
          <InputError
            v-if="$v.confirmPassword.$invalid"
            message="Error message"
          />
        </div>

        <Divider class="!my-0" />

        <Button
          label="Sign Up"
          type="submit"
          :disabled="$v.$errors.length > 0 || !$v.$dirty"
        />
        <InputError v-if="authError" :message="authError" />
      </form>
    </Panel>
  </div>
</template>
