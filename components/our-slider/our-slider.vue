<template lang="pug">
  section.our-slider.section
    .our-slider__wrap.wrap#slides
      template(v-for="slide in slides" :key="slide.id")
        ui-form(@submit="saveSlide(slide)" :state="slide" :schema="schema" :key="slide.id" v-if="!slide.deleted").our-slider__slide
          ui-form-group(label="Заголовок слайда" id="title").our-slider__field
            ui-input(v-model="slide.title" placeholder="Введите заголовок слайда")

          ui-form-group(label="Описание слайда" id="description").our-slider__field
            ui-textarea(v-model="slide.description" placeholder="Введите описание слайда")

          ui-form-group(label="Текст на кнопке" id="btnText").our-slider__field
            ui-input(v-model="slide.btnText" placeholder="Введите текст на кнопке")

          ui-form-group(label="Картинка" :id="`image-${slide.id}`").our-slider__field.our-slider__image
            ui-input(v-model="image" type="file" :files="slide.image" accept="image/*" :multiple="false" file-preview-type="photos" @get-files="upload($event, slide)" @delete-file="removeFile")

          ui-form-group(label="Куда ведёт кнопка?" id="link").our-slider__field
            ui-input(v-model="slide.link" placeholder="Вставьте ссылку на страницу")

          ui-form-group(label="Позиция в слайдере" id="sort").our-slider__field
            ui-input(v-model="slide.sort" placeholder="Введите целое число")
          
          ui-info.our-slider__field(v-if="slide.isSaved") Слайд сохранён
          
          .our-slider__field.row
            ui-button(type="submit") Сохранить
            ui-button(type="button" color="red" @click="deleteSlide(slide)").our-slider__delete-btn Удалить
    .our-slider__add
      ui-button(@click="add").our-slider__add-btn
        ui-icon-catalog.our-slider__add-icon
        | Добавить еще
</template>

<script setup>
import {object, string} from "yup";
import {deleteInfo} from "~/composables/deleteInfo.js";
import {getGroupInfo} from "~/composables/getGroupInfo.js";
import {getCategories} from "~/composables/getCategories.js";
import {saveInfo} from "~/composables/saveInfo.js";

const schema = object({
  title: string().required('Заполните заголовок'),
  description: string().required('Напишите описание'),
  btnText: string().required('Введите текст кнопки'),
});

const slides = ref([]);
const slidesList = await getGroupInfo("slide");
const categoriesList = await getCategories();
const categories = ref(categoriesList.value);
const image = ref(null);

slidesList.sort((a, b) => a.value.sort - b.value.sort).forEach(slide => {
  slides.value.push(slide.value);
})

async function deleteSlide(slide) {
  await deleteInfo(`slide-${slide.id}`);
  slide.deleted = true;
}

function add() {
  const visibleSlides = slides.value.filter(slide => !slide.deleted);
  slides.value.push({
    id: new Date().getTime(),
    sort: visibleSlides.length > 0 ? visibleSlides.length + 1 : 1,
    title: '',
    description: '',
    btnText: '',
    link: '',
    image: [],
    isSaved: false,
    deleted: false,
  });
}

async function upload($files, slide) {
  let index = 0;
  for (const f of $files) {
    const $file = await uploadFiles($files[index], "certificates", false);
    slide.image.push({...$file[0], isDeleted: false});
    index++;
  }
}

function removeFile($file) {
  deleteFile($file.id);
  $file.isDeleted = true;
}

function saveSlide(slide) {
  saveInfo(`slide-${slide.id}`, JSON.stringify({...slide, image: slide.image.filter(i => !i.isDeleted), isSaved: false}));
  slide.isSaved = true;
  setTimeout(() => {
    slide.isSaved = false;
  }, 4000)
}
</script>

<style lang="scss" src="./our-slider.scss"></style>
