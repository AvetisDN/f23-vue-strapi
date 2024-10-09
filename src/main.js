import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Lara from "@primevue/themes/lara";
import Button from "primevue/button";

import "@/assets/base.css";
import "primeicons/primeicons.css";

import App from "./App.vue";
import router from "./router";
import { definePreset } from "@primevue/themes";
import Panel from "primevue/panel";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Divider from "primevue/divider";
import InputError from "./components/InputError.vue";
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";
import ToastService from "primevue/toastservice";

const primaryColor = "blue";

const MyPreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: `{${primaryColor}.50}`,
      100: `{${primaryColor}.100}`,
      200: `{${primaryColor}.200}`,
      300: `{${primaryColor}.300}`,
      400: `{${primaryColor}.400}`,
      500: `{${primaryColor}.500}`,
      600: `{${primaryColor}.600}`,
      700: `{${primaryColor}.700}`,
      800: `{${primaryColor}.800}`,
      900: `{${primaryColor}.900}`,
      950: `{${primaryColor}.950}`,
    },
  },
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: ".dark",
    },
  },
});
app.use(ToastService);

app.component("Button", Button);
app.component("Panel", Panel);
app.component("Card", Card);
app.component("InputText", InputText);
app.component("Password", Password);
app.component("Divider", Divider);
app.component("InputError", InputError);
app.component("Avatar", Avatar);
app.component("AvatarGroup", AvatarGroup);

app.mount("#app");
