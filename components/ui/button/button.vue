<template lang="pug">
  button(:class="buttonClass" :type="type" v-bind="$attrs" :disabled="disabled").ui-button
    slot
</template>

<script>
export default defineComponent({
  name: "UiButton",
  props: {
    size: {
      type: String,
      default: "default",
      required: false
    },
    color: {
      type: String,
      default: "primary",
      required: false
    },
    variant: {
      type: String,
      default: "fill",
      required: false
    },
    type: {
      type: String,
      default: "button",
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
  },
  setup(props) {
    const buttonClass = computed(() => {
      return [
        `ui-button_size-${props.size}`,
        `ui-button_color-${props.color}`,
        `ui-button_variant-${props.variant}`,
      ]
    });

    const disabled = computed(() => props.disabled);

    return {
      buttonClass,
      disabled
    }
  }
})
</script>

<style lang="scss" src="./ui-button.scss"></style>
