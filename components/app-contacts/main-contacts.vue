<template lang="pug">
  .app-contacts__group
    ui-form.app-contacts__form(@submit="save" :state="state" :schema="schema")
      ui-form-group(label="Адрес" id="address").app-contacts__field
        ui-input(v-model="state.address")
      
      ui-form-group(label="Адрес для карты" description="Будет отображаться на метке карты" id="address_2").app-contacts__field
        ui-input(v-model="state.address_2")
      
      ui-form-group(label="Телефон" id="phone").app-contacts__field
        ui-input(v-model="state.phone")
      
      ui-form-group(label="Второй телефон" id="phone_2").app-contacts__field
        ui-input(v-model="state.phone_2")
      
      ui-form-group(label="Третий телефон" id="phone_3").app-contacts__field
        ui-input(v-model="state.phone_3")
      
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
      address: props.contacts.address,
      address_2: props.contacts.address_2,
      phone: props.contacts.phone,
      phone_2: props.contacts.phone_2,
      phone_3: props.contacts.phone_3,
      email: props.contacts.email,
    })

    const schema = object({
      address: string().required('Введите адрес'),
      address_2: string().required('Введите адрес'),
      phone: string().min(11, "Номер телефона должен содержать минимум 11 символов").required('Введите номер телефона'),
      email: string().email('Введите корректный адрес электронной почты').required('Введите email')
    })

    const data = computed(() => JSON.stringify({
      address: state.address,
      address_2: state.address_2,
      phone: state.phone,
      phone_2: state.phone_2,
      phone_3: state.phone_3,
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
