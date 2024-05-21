<template lang="pug">
  .ui-info(:class="type")
    slot
</template>

<script>export default defineComponent({
  name: "UiInfo",
  props: {
    type: {
      type: String,
      default: "info",
      required: false
    }
  }
})</script>

<style lang="scss" src="./ui-info.scss"></style>
