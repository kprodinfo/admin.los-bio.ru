<template lang="pug">
  .ui-input(:class="inputClass")
    span(v-if="$slots.leading").ui-input__leading
      slot(name="leading" :disabled="disabled")

    .ui-input__files(v-if="type === 'file'")
      label(:for="inputId" v-if="!visibleFiles.length").ui-input__file-start
        ui-icon-cloud-upload.ui-input__file-icon
        .ui-input__file-title Выберите файл с компьютера
        .ui-input__file-allow Максимальный размер фйала 100Мб
      .ui-input__files-list(v-else-if="filePreviewType === 'photos'")
        template(v-for="file in visibleFiles" :key="file.id")
          .ui-input__file(v-if="!file.isDeleted")
            .ui-input__file-preview-box
              img(:src="getFile(file)").ui-input__file-preview
            ui-button(@click="$emit('delete-file', file)").ui-input__file-delete-btn Удалить
        label.ui-input__file-add(:for="inputId") Загрузить ещё
      .ui-input__files-list(v-else-if="filePreviewType === 'files'")
        template(v-for="file in visibleFiles" :key="file.id")
          .ui-input__file.ui-input__file_text(v-if="!file.isDeleted") 
            a(:href="getFile(file)" target="_blank") {{ file.name }}
            ui-button(@click.stop="$emit('delete-file', file)").ui-input__file-delete-btn.ui-input__file-delete-btn_text Удалить
        label.ui-input__file-add(:for="inputId") Загрузить ещё

    input.ui-input__field(
      :id="inputId"
      ref="input"
      :multiple="multiple"
      :name="name"
      :value="modelValue"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      :disabled="disabled"
      v-bind="attrs"
      @focus="onFocus"
      @input="onInput"
      @blur="onBlur"
      @change="onChange"
      autocomplete="new-password")
    span(v-if="$slots.trailing").ui-input__trailing
      slot(name="leading" :disabled="disabled")
</template>

<script>
import {defineComponent} from "vue";
import {checkNumber} from "~/utils/index.js";

export default defineComponent({
  name: "UiInput",
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    files: {
      type: Array,
      default: () => ([]),
      required: false
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    filePreviewType: {
      type: String,
      default: "files" // files or photos
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
    }
  },
  inheritAttrs: false,
  emits: ["update:modelValue", "blur", "get-files", "delete-file"],
  setup(props, {emit, attrs}) {
    const {
      autofocus,
    } = props;
    const input = ref(null);
    const isFocused = ref(false);
    const id = inject("inputId", undefined);
    const visibleFiles = computed(() => {
      return props.files.filter(file => !file.isDeleted)
    })
    const autoFocus = () => {
      if (autofocus) {
        input.value?.focus();
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
      if (!props.modelModifiers.lazy) {
        updateInput(event.target.value);
      }
    };
    const onFocus = () => {
      isFocused.value = true;
    };
    const onChange = (event) => {
      if (props.type === "file") {
        emit("get-files", event.target.files);
        return;
      }

      let value = event.target.value;

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

    const inputClass = computed(() => {
      return [
        `ui-input_size-${props.size}`,
        `ui-input_color-${props.color}`,
        `ui-input_variant-${props.variant}`,
        {
          "ui-input_focused": isFocused.value
        }
      ]
    });

    onMounted(() => {
      autoFocus();
    })

    return {
      inputId: id,
      attrs,
      input,
      inputClass,
      onInput,
      onFocus,
      onChange,
      onBlur,
      visibleFiles
    }
  }
})
</script>

<style lang="scss" src="./ui-input.scss"></style>
