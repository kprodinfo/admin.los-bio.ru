<template lang="pug">
  .dashboard-layout
    app-aside.dashboard-layout__aside
    PerfectScrollbar.dashboard-layout__content(ref="scrollbar")
      h1.dashboard-layout__title
        span {{ title }}
        a(href="https://los-bio.ru" target="_blank" title="Перейти на сайт").dashboard-layout__site-link
          ui-icon-home.dashboard-layout__site-icon
      NuxtPage
</template>
<script setup>
import {useIndexStore} from "~/store/index.js";

const titles = {
  "/": "Аналитика проекта",
  "/catalog": "Каталог товаров",
  "/categories": "Категории товаров",
  "/projects": "Реализованные проекты",
  "/advantages": "Преимущества",
  "/slider": "Слайдер на главной странице",
  "/about": "Информация о компании",
  "/contacts": "Контактная информация",
}
const store = useIndexStore();
const route = useRoute();
const scrollbar = ref(null);

const title = computed(() => {
  if (titles[route.fullPath] === undefined) {
    return store.customTitle;
  }

  return titles[route.fullPath];
});

watch(title, () => {
  if(scrollbar.value?.$el) {
    scrollbar.value.$el.scrollTop = 0;
  }
})
</script>

<style lang="scss" src="./dashboard.scss"></style>
