<template lang="pug">
  .ui-form-group
    label(:for="id" v-if="label" :class="{'ui-form-group__label_with-description': !!description}").ui-form-group__label {{ label }}
      span.ui-form-group__label-description(v-if="description") {{ description }}
    slot(name="default")
    .ui-form-group__error(v-if="error || myError") {{ error || myError }}
</template>

<script>
export default defineComponent({
  name: "UiFormGroup",
  props: {
    id: {
      type: String,
      default: () => `field-${new Date().getTime()}`,
      required: true
    },
    label: {
      type: String,
      default: "",
      required: false
    },
    description: {
      type: String,
      default: "",
      required: false
    },
    error: {
      type: String,
      default: "",
      required: false
    }
  },
  setup(props) {
    const errors = inject("form-errors", undefined);
    const myError = ref("");
    
    watch(errors, () => {
      myError.value = "";
      errors.value.forEach(error => {
        if(props.id === error.path) {
          myError.value = error.message;
        }
      });
    })

    provide("inputId", props.id);

    return {
      id: props.id,
      label: props.label,
      myError
    }
  }
})
</script>

<style lang="scss" src="./ui-form-group.scss"></style>
