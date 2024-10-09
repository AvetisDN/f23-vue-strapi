import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const authError = ref(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  const router = useRouter();
  const toast = useToast();

  const register = async (data) => {
    const response = await fetch(`${apiUrl}/api/auth/local/register`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (result.error) {
      // authError.value = result.error.message;
      toastError(result.error.message);
    } else {
      // user.value = result.user;
      localStorage.setItem("jwt", result.jwt);
      fetchUser(result.jwt);
      router.push("/");
    }
  };

  const login = async (data) => {
    const response = await fetch(`${apiUrl}/api/auth/local`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (result.error) {
      // authError.value = result.error.message;
      toastError(result.error.message);
    } else {
      // user.value = result.user;
      localStorage.setItem("jwt", result.jwt);
      fetchUser(result.jwt);
      router.push("/");
    }
  };

  const auth = async (jwt) => {
    const response = await fetch(`${apiUrl}/api/users/me?populate=*`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const result = await response.json();

    if (result.error) {
      // console.log(result.error.message);
      toastError(result.error.message);
    } else {
      user.value = result;
      // router.push("/");
    }
  };

  const logout = async () => {
    localStorage.removeItem("jwt");
    user.value = null;
    router.push("/");
  };

  const fetchUser = async (jwt) => {
    const response = await fetch(`${apiUrl}/api/users/me?populate=*`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const result = await response.json();
    user.value = result;
  };

  const toastError = (msg) => {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: msg,
      life: 3000,
    });
  };

  return { user, authError, register, login, auth, logout, fetchUser };
});

export default useAuthStore;
