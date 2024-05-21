<template lang="pug">
  app-dashboard
</template>

<script setup>
import AppDashboard from "~/components/dashboard/dashboard.vue";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"]
})
</script>
