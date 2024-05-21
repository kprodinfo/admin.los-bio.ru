<template lang="pug">
  .catalog
    .catalog__header
      .catalog__count 
        b Продуктов в базе: 
        | {{ list.length }}
      nuxt-link(to="/catalog/create")
        ui-button Добавить продукт
    .catalog__product.catalog__product_head
      .catalog__product-value.catalog__product-value_head Название продукта
      .catalog__product-value.catalog__product-value_head Категория
      .catalog__product-value.catalog__product-value_head Цена
      .catalog__product-value.catalog__product-value_head Статус
      .catalog__product-value.catalog__product-value_head Редактирование
    template(v-for="product in list" :key="product.id")
      .catalog__product
        .catalog__product-value.catalog__product-value_title 
          img(v-if="product.photos.length" :src="getFile(product.photos[0])").catalog__product-preview-image
          span {{ product.title }}
        .catalog__product-value.catalog__product-value_category {{ product.category.name }}
        .catalog__product-value.catalog__product-value_category 
          span.old-price(v-if="product.old_price > 0") {{ product.old_price }} ₽
          span(v-if="product.price > 0") {{ product.price }} ₽
          span(v-else) По запросу
        .catalog__product-value.catalog__product-value_status(:class="{success: product.published}") {{ product.published ? "Опубликован" : "Не опубликован" }}
        nuxt-link.catalog__product-value.catalog__product-value_ctrl(:to="`/catalog/${product.slug}`") Редактировать

</template>

<script setup>
const list = ref([]);
const backEndList = await getProducts(0);
list.value = backEndList.value;
</script>

<style lang="scss" src="./catalog.scss"></style>
