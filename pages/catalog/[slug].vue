<template lang="pug">
  product-form
</template>

<script setup>
import ProductForm from "~/components/catalog/product-form/product-form.vue";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
})
</script>
