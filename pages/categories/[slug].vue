<template lang="pug">
  category-form
</template>

<script setup>

import CategoryForm from "~/components/our-categories/category-form/category-form.vue";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
})
</script>
