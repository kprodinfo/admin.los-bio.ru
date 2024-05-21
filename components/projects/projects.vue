<template lang="pug">
  .projects
    .projects__header
      .projects__count 
        b Проектов в базе: 
        | {{ list.length }}
      nuxt-link(to="/projects/create")
        ui-button Добавить проект
    .projects__product.projects__product_head
      .projects__product-value.projects__product-value_head Название проекта
      .projects__product-value.projects__product-value_head Статус
      .projects__product-value.projects__product-value_head Редактирование
    template(v-for="product in list" :key="product.id")
      .projects__product
        .projects__product-value.projects__product-value_title 
          img(v-if="product.photos.length" :src="getFile(product.photos[0])").projects__product-preview-image
          span {{ product.title }}
        .projects__product-value.projects__product-value_status(:class="{success: product.published}") {{ product.published ? "Опубликован" : "Не опубликован" }}
        nuxt-link.projects__product-value.projects__product-value_ctrl(:to="`/projects/${product.slug}`") Редактировать
</template>

<script setup>
const list = ref([]);
const backEndList = await getProjects();
list.value = backEndList.value;
</script>

<style lang="scss" src="./projects.scss"></style>
