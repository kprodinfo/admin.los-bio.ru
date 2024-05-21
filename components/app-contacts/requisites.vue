<template lang="pug">
  .app-contacts__group
    ui-form.app-contacts__form(@submit="save" :state="state" :schema="schema")
      
      ui-form-group(label="Название организации" id="name").app-contacts__field
        ui-input(v-model="state.name")
      
      ui-form-group(label="ИНН" id="inn").app-contacts__field
        ui-input(v-model="state.inn")
      
      ui-form-group(label="КПП" id="kpp").app-contacts__field
        ui-input(v-model="state.kpp")
      
      ui-form-group(label="ОГРН" id="ogrn").app-contacts__field
        ui-input(v-model="state.ogrn")
      
      ui-form-group(label="Расчётный счёт" id="rs").app-contacts__field
        ui-input(v-model="state.rs")
      
      ui-form-group(label="Корреспондентский счёт" id="ks").app-contacts__field
        ui-input(v-model="state.ks")
      
      ui-form-group(label="БИК" id="bik").app-contacts__field
        ui-input(v-model="state.bik")
      
      ui-form-group(label="Генеральный директор" id="manager").app-contacts__field
        ui-input(v-model="state.manager")
      
      ui-form-group(label="Адрес офиса" id="office").app-contacts__field
        ui-input(v-model="state.office")
      
      ui-form-group(label="Телефон" id="phone").app-contacts__field
        ui-input(v-model="state.phone")
      
      ui-form-group(label="Email" id="email").app-contacts__field
        ui-input(v-model="state.email")
      
      ui-form-group(label="Файл реквизитов" id="file").app-contacts__field
        ui-input(type="file" :multiple="false" :files="state.file" v-model="file"  @get-files="upload($event, slide)" @delete-file="removeFile")
      
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
    const file = ref();
    const state = reactive({
      name: props.contacts.name,
      inn: props.contacts.inn,
      kpp: props.contacts.kpp,
      ogrn: props.contacts.ogrn,
      rs: props.contacts.rs,
      ks: props.contacts.ks,
      bik: props.contacts.bik,
      manager: props.contacts.manager,
      office: props.contacts.office,
      phone: props.contacts.phone,
      email: props.contacts.email,
      file: props.contacts.file,
    })

    const schema = object({
      name: string().required('Введите название компании'),
      inn: string().required('Введите ИНН'),
      kpp: string().required('Введите ИНН'),
      office: string().required('Введите ФИО'),
      manager: string().required('Введите ФИО'),
      phone: string().min(11, "Номер телефона должен содержать минимум 11 символов").required('Введите номер телефона'),
      email: string().email('Введите корректный адрес электронной почты').required('Введите email')
    })

    const data = computed(() => JSON.stringify({
      name: state.name,
      inn: state.inn,
      kpp: state.kpp,
      ogrn: state.ogrn,
      rs: state.rs,
      ks: state.ks,
      bik: state.bik,
      manager: state.manager,
      office: state.office,
      phone: state.phone,
      email: state.email,
      file: state.file,
    }))

    async function upload($files) {
      let index = 0;
      for (const f of $files) {
        const $file = await uploadFiles($files[index], "requisites", false);
        state.file = [{...$file[0], isDeleted: false}];
        index++;
      }
    }

    function removeFile($file) {
      deleteFile($file.id);
      $file.isDeleted = true;
    }

    function save() {
      emit("save", data.value);
    }

    return {
      file,
      save,
      state,
      schema,
      data,
      upload,
      removeFile
    }
  }
})
</script>
