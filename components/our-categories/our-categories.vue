<template lang="pug">
  section.our-categories.section(ref="sortable")#sortable
    .our-categories__category(v-for="category in categories" :key="category.id")
      .our-categories__category-group
        .our-categories__category-position
          ui-icon-categories.our-categories__category-position-icon
        .our-categories__category-name {{ category.name }}
      nuxt-link.our-categories__category-edit(:to="`/categories/${category.slug}`") Редактировать
    nuxt-link(to="/categories/create").our-categories__footer
      ui-button Добавить категорию
</template>

<script setup>
import {useSortable, moveArrayElement} from '@vueuse/integrations/useSortable'
import {saveCategoryPosition} from "~/composables/saveCategoryPosition.js";

let categories = ref([]);
const categoriesList = await getCategories();

categories.value = categoriesList.value;

useSortable("#sortable", categories, {
  handle: '.our-categories__category-position',
  animation: 150,
  onUpdate: (e) => {
    moveArrayElement(categories.value, e.oldIndex, e.newIndex)
    nextTick(() => {
      for (const category of categories.value) {
        const index = categories.value.indexOf(category);
        saveCategoryPosition(category.slug, index + 1);
      }
    })
  }
});

</script>

<style lang="scss" src="./our-categories.scss"></style>
