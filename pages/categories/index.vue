<template lang="pug">
  our-categories
</template>

<script setup>
import OurCategories from "~/components/our-categories/our-categories.vue";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"]
})
</script>
