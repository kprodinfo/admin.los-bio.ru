<template lang="pug">
  projects-form
</template>

<script setup>
import ProjectsForm from "~/components/projects/projects-form/projects-form.vue";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
})
</script>
