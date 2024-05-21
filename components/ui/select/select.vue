<template lang="pug">
  .select(:class="inputClass")
    select.select__field(
      :id="inputId"
      :name="name"
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      v-bind="attrs"
      @input="onInput"
      @change="onChange"
    )
      template(v-for="(option, i) in normalizedOptionsWithPlaceholder")
        optgroup(v-if="option.children" :key="i" :value="option[valueAttribute]" :label="option[optionAttribute]")
          option(v-for="(childOption, j) in option.children" :key="`${childOption[valueAttribute]}-${i}-${j}`" :value="childOption[valueAttribute]" :selected="childOption[valueAttribute] === normalizedValue" :disabled="childOption.disabled" v-text="childOption[optionAttribute]")
        option(v-else
        :key="`${option[valueAttribute]}-${i}`"
          :value="option[valueAttribute]"
          :selected="option[valueAttribute] === normalizedValue"
          :disabled="option.disabled"
          v-text="option[optionAttribute]"
        )
    .select__chevron
      ui-icon-chevron-down.select__chevron-icon
</template>

<script>
import {defineComponent} from "vue";
import {get} from "~/utils/index.js";

export default defineComponent({
  name: "UiSelect",
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    optionAttribute: {
      type: String,
      default: 'label'
    },
    valueAttribute: {
      type: String,
      default: 'value'
    },
    name: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "default"
    },
    color: {
      type: String,
      default: "primary",
    },
    variant: {
      type: String,
      default: "fill",
    },
    options: {
      type: Array,
      default: () => []
    },
  },
  inheritAttrs: false,
  emits: ["update:modelValue", "change"],
  setup(props, {emit, attrs}) {
    const input = ref(null);
    const id = inject("inputId", undefined);

    const onInput = (event) => {
      emit("update:modelValue", event.target.value);
    };

    const onChange = (event) => {
      emit('change', event.target.value)
      // emitFormChange()
    }

    const inputClass = computed(() => {
      return [
        `select_size-${props.size}`,
        `select_color-${props.color}`,
        `select_variant-${props.variant}`,
      ]
    });

    const guessOptionValue = (option) => {
      return get(option, props.valueAttribute, get(option, props.optionAttribute))
    }

    const guessOptionText = (option) => {
      return get(option, props.optionAttribute, get(option, props.valueAttribute))
    }

    const normalizeOption = (option) => {
      if (['string', 'number', 'boolean'].includes(typeof option)) {
        return {
          [props.valueAttribute]: option,
          [props.optionAttribute]: option
        }
      }

      return {
        ...option,
        [props.valueAttribute]: guessOptionValue(option),
        [props.optionAttribute]: guessOptionText(option)
      }
    }

    const normalizedOptions = computed(() => {
      return props.options.map(option => normalizeOption(option))
    })

    const normalizedOptionsWithPlaceholder = computed(() => {
      if (!props.placeholder) {
        return normalizedOptions.value
      }

      return [
        {
          [props.valueAttribute]: '',
          [props.optionAttribute]: props.placeholder,
          disabled: true
        },
        ...normalizedOptions.value
      ]
    })

    const normalizedValue = computed(() => {
      const normalizeModelValue = normalizeOption(props.modelValue)
      const foundOption = normalizedOptionsWithPlaceholder.value.find(option => option[props.valueAttribute] === normalizeModelValue[props.valueAttribute])
      if (!foundOption) {
        return ''
      }

      return foundOption[props.valueAttribute]
    })

    return {
      inputId: id,
      attrs,
      input,
      inputClass,
      onInput,
      onChange,
      normalizedOptionsWithPlaceholder,
      normalizedValue
    }
  }
})
</script>

<style lang="scss" src="./select.scss"></style>
