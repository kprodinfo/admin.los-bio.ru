<template lang="pug">
  .ui-textarea(:class="inputClass")
    textarea.ui-textarea__field(
      :id="inputId"
      ref="textarea"
      :name="name"
      :value="modelValue"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      v-bind="attrs"
      @focus="onFocus"
      @input="onInput"
      @blur="onBlur"
      @change="onChange"
      )
</template>

<script>
import {defineComponent} from "vue";
import {checkNumber} from "~/utils/index.js";

export default defineComponent({
  name: "UiTextarea",
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    name: {
      type: String,
      default: null
    },
    placeholder: {
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
    autofocus: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    padded: {
      type: Boolean,
      default: true
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
    modelModifiers: {
      type: Object,
      default: () => ({
        lazy: false,
        trim: false,
        number: false
      })
    },
    autoresize: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 3
    },
    maxRows: {
      type: Number,
      default: 0
    },
  },
  inheritAttrs: false,
  emits: ["update:modelValue", "blur"],
  setup(props, {emit, attrs}) {
    const {
      autofocus,
    } = props;
    const textarea = ref(null);
    const isFocused = ref(false);
    const id = inject("inputId", undefined);
    const autoFocus = () => {
      if (autofocus) {
        textarea.value?.focus();
      }
    }

    const autoResize = () => {
      if (props.autoresize) {
        if (!textarea.value) {
          return
        }

        textarea.value.rows = props.rows

        const styles = window.getComputedStyle(textarea.value)
        const paddingTop = parseInt(styles.paddingTop)
        const paddingBottom = parseInt(styles.paddingBottom)
        const padding = paddingTop + paddingBottom
        const lineHeight = parseInt(styles.lineHeight)
        const { scrollHeight } = textarea.value
        const newRows = (scrollHeight - padding) / lineHeight

        if (newRows > props.rows) {
          textarea.value.rows = props.maxRows ? Math.min(newRows, props.maxRows) : newRows
        }
      }
    }
    
    const updateInput = (value) => {
      if (props.modelModifiers.trim) {
        value = value.trim();
      }

      if (props.modelModifiers.number || props.type === "number") {
        value = checkNumber(value);
      }

      emit("update:modelValue", value);
    };
    const onInput = (event) => {
      autoResize()
      if (!props.modelModifiers.lazy) {
        updateInput(event.target.value);
      }
    };
    const onFocus = () => {
      isFocused.value = true;
    };
    const onChange = (event) => {
      const value = event.target.value;

      if (props.modelModifiers.lazy) {
        updateInput(value);
      }

      if (props.modelModifiers.trim) {
        event.target.value = value.trim();
      }
    };
    const onBlur = (event) => {
      isFocused.value = false;
      emit("blur", event);
    };

    watch(() => props.modelValue, () => {
      nextTick(autoResize)
    })

    onMounted(() => {
      setTimeout(() => {
        autoFocus()
        autoResize()
      }, 100)
    })

    const inputClass = computed(() => {
      return [
        `ui-textarea_size-${props.size}`,
        `ui-textarea_color-${props.color}`,
        `ui-textarea_variant-${props.variant}`,
        {
          "ui-textarea_focused": isFocused.value
        }
      ]
    });

    onMounted(() => {
      autoFocus();
    })

    return {
      inputId: id,
      attrs,
      textarea,
      inputClass,
      onInput,
      onFocus,
      onChange,
      onBlur,
    }
  }
})
</script>

<style lang="scss" src="./ui-textarea.scss"></style>
