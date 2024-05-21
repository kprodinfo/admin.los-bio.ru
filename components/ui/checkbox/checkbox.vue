<template lang="pug">
  .ui-checkbox(:class="inputClass")
    input.ui-checkbox__field(type="checkbox" :id="inputId" v-model="toggle" :name="name" :value="modelValue" :required="required" :disabled="disabled" v-bind="attrs" @change="onChange")
    label(:for="inputId").ui-checkbox__fake
      ui-icon-checked.ui-checkbox__icon
    label(:for="inputId").ui-checkbox__label
      slot(name="default")
</template>

<script>
import {defineComponent} from "vue";
import {checkNumber} from "~/utils/index.js";

export default defineComponent({
  name: "UiCheckbox",
  props: {
    modelValue: {
      type: [Boolean, Array],
      default: ''
    },
    name: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: "primary",
    },
    variant: {
      type: String,
      default: "fill",
    },
  },
  inheritAttrs: false,
  emits: ["update:modelValue", "change"],
  setup(props, {emit, attrs}) {
    const id = inject("inputId", undefined);

    const toggle = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        emit('update:modelValue', value)
      }
    })
    const onChange = (event) => {
      emit('change', event.target.checked);
    }

    const inputClass = computed(() => {
      return [
        `ui-checkbox_color-${props.color}`,
        `ui-checkbox_variant-${props.variant}`
      ]
    });

    return {
      inputId: id,
      attrs,
      inputClass,
      onChange,
      toggle
    }
  }
})
</script>

<style lang="scss" src="./checkbox.scss"></style>
