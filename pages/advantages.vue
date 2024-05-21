<template lang="pug">
  our-advantages
</template>

<script setup>
import OurAdvantages from "~/components/our-advantages/our-advantages.vue";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"]
})
</script>
