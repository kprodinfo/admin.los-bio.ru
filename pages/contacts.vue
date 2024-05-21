<template lang="pug">
  app-contacts
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
  middleware: ["auth"]
})
</script>
