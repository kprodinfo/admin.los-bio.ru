<template lang="pug">
  section.our-advantages.section
    .our-advantages__wrap.wrap
      .our-advantages__list
        ui-form(v-for="(advantage, index) in advantages" :key="index" :state="advantage" :schema="schema" @submit="onSubmit(advantage)" @error="onError($event, advantage)").our-advantages__item
          .our-advantages__item-group
            label(:for="`icon-${index}`" title="Выбрать иконку").our-advantages__item-icon-box
              .our-advantages__icon-error(v-if="advantage.iconError") Выберите иконку
              ui-icon-catalog.our-advantages__item-upload-icon(v-if="!advantage.icon")
              img(:src="advantage.icon" v-else).our-advantages__item-icon
              input(type="file" :id="`icon-${index}`" accept="image/*" @change="uploadIcon($event, advantage)").our-advantages__item-file-input
            ui-form-group.our-advantages__item-title(label="Заголовок" id="title")
              ui-input(v-model="advantage.title")
          ui-form-group(label="Описание" id="description").our-advantages__item-description
            ui-input(v-model="advantage.description")
          .our-advantages__footer
            ui-info.our-advantages__saved(v-if="advantage.isSaved") Данные успешно сохранены
            ui-button(type="submit" v-else) Сохранить
</template>

<script setup>
import {string, object} from "yup";
import {saveInfo} from "~/composables/saveInfo.js";
import {getGroupInfo} from "~/composables/getGroupInfo.js";

const schema = object({
  title: string().required("Заполните заголовок"),
  description: string().required("Напишите описание"),
  icon: string().required("Загрузите иконку")
});

let advantages = reactive([
  {
    id: 1,
    title: "",
    description: "",
    icon: null,
    iconError: false,
    isSaved: false,
  },
  {
    id: 2,
    title: "",
    description: "",
    icon: null,
    iconError: false,
    isSaved: false,
  },
  {
    id: 3,
    title: "",
    description: "",
    icon: null,
    iconError: false,
    isSaved: false,
  },
  {
    id: 4,
    title: "",
    description: "",
    icon: null,
    iconError: false,
    isSaved: false,
  },
]);

const serverAdvantages = await getGroupInfo("advantages");

serverAdvantages.forEach(item => {
  advantages[item.value.id - 1] = item.value;
})

async function uploadIcon(event, item) {
  if (!event.target.files.length) {
    item.iconError = "Выберите файл";
    return;
  }
  const file = event.target.files[0];

  const files = await uploadFiles(file, "advantages", false);

  console.log(files);
  item.icon = getFile(files[0]);
}

function onError(data, advantage) {
  const iconError = data.errors.find(error => error.path === "icon");
  if (iconError.message && !advantage.icon.id) {
    advantage.iconError = iconError.message;
  }
}

function onSubmit(advantage) {
  advantage.isSaved = true;
  setTimeout(() => {
    advantage.isSaved = false;
  }, 4000)
  saveInfo(`advantages-${advantage.id}`, JSON.stringify({...advantage, isSaved: false}));
}
</script>

<style lang="scss" src="./our-advantages.scss"></style>
