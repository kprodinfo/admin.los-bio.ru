<template lang="pug">
  .sign-in
    h2._title Авторизация
    ui-form(@submit="tryLogin" :state="state" :schema="schema")
      .sign-in__form
        ui-form-group(label="Введите почту" id="email").sign-in__field
          ui-input(v-model="state.email" type="email")
        ui-form-group(label="Введите пароль" id="password").sign-in__field
          ui-input(v-model="state.password" type="password")
        .sign-in__error(v-if="errorMessage") {{ errorMessage }}
        ui-button.sign-in__enter-btn(type="submit") Войти
</template>

<script setup>
import {object, string} from "yup";
import {useAuthStore} from "~/store/auth.js";

const store = useAuthStore();
const router = useRouter();

const state = ref({
  email: "",
  password: ""
})

const schema = object({
  email: string().email("Введите корректный email").required('Введите email'),
  password: string().required('Введите пароль')
})

const errorMessage = ref("");

function setData() {
  state.value.email = "";
  state.value.password = "";
}

async function tryLogin() {
  errorMessage.value = "";

  const response = await store.login(state.value.email, state.value.password);
  
  if (response.type === "error") {
    errorMessage.value = response.error;
  }

  if (response.type === "token") {
    await router.push("/");
  }
}
</script>

<style lang="scss" src="./sign-in.scss"></style>
