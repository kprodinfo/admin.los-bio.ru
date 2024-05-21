<template lang="pug">
  sign-in
</template>

<script>
import {defineComponent} from "vue";
import SignIn from "~/components/auth/sign-in.vue";

definePageMeta({
  layout: "login",
  middleware: "guest"
})

export default defineComponent({
  components: {SignIn}
})
</script>
