<template lang="pug">
  projects
</template>

<script setup>
import Projects from "~/components/projects/projects.vue";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"]
})
</script>
