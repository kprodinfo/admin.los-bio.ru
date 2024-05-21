<template lang="pug">
  .app-contacts__group
    ui-form.app-contacts__form(@submit="save" :state="state" :schema="schema")
      
      ui-form-group(label="Телефон" id="phone").app-contacts__field
        ui-input(v-model="state.phone")
      
      ui-form-group(label="Второй телефон" id="phone_2").app-contacts__field
        ui-input(v-model="state.phone_2")
      
      ui-form-group(label="Третий телефон" id="phone_3").app-contacts__field
        ui-input(v-model="state.phone_3")
      
      ui-form-group(label="Четвертый телефон" id="phone_4").app-contacts__field
        ui-input(v-model="state.phone_4")
      
      ui-form-group(label="Email" id="email").app-contacts__field
        ui-input(type="email" v-model="state.email" id="email")
      
      slot
      .app-contacts__field.app-contacts__field_row
        ui-button(type="submit") Сохранить
</template>
<script>
import {string, object} from "yup";

export default defineComponent({
  name: "TopBarContacts",
  emits: ["save"],
  props: {
    contacts: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  setup(props, {emit}) {
    const state = reactive({
      phone: props.contacts.phone,
      phone_2: props.contacts.phone_2,
      phone_3: props.contacts.phone_3,
      phone_4: props.contacts.phone_4,
      email: props.contacts.email,
    })

    const schema = object({
      phone: string().min(11, "Номер телефона должен содержать минимум 11 символов").required('Введите номер телефона'),
      email: string().email('Введите корректный адрес электронной почты').required('Введите email')
    })

    const data = computed(() => JSON.stringify({
      phone: state.phone,
      phone_2: state.phone_2,
      phone_3: state.phone_3,
      phone_4: state.phone_4,
      email: state.email
    }))

    function save() {
      emit("save", data.value);
    }

    return {
      save,
      state,
      schema,
      data
    }
  }
})
</script>
