<template lang="pug">
  PerfectScrollbar.app-aside
    .app-aside__head
      ui-icon-logo.app-aside__logo
    .app-aside__content
      .app-aside__list
        nuxt-link.app-aside__item(v-for="item in menu" :key="item.to" :to="item.to" active-class="active")
          .app-aside__item-icon-box
            component(:is="`ui-icon-${item.icon}`").app-aside__item-icon
          .app-aside__item-name {{ item.title }}
</template>

<script>
export default defineComponent({
  name: "AppAside",
  setup() {
    const menu = ref([
      {
        to: "/",
        icon: "home",
        title: "Главная"
      },
      {
        to: "/catalog",
        icon: "catalog",
        title: "Каталог продуктов"
      },
      {
        to: "/categories",
        icon: "categories",
        title: "Категории"
      },
      {
        to: "/projects",
        icon: "projects",
        title: "Проекты"
      },
      {
        to: "/advantages",
        icon: "advantages",
        title: "Преимущества"
      },
      {
        to: "/slider",
        icon: "slider",
        title: "Слайдер"
      },
      {
        to: "/about",
        icon: "about",
        title: "О компании"
      },
      {
        to: "/contacts",
        icon: "phone",
        title: "Контакты"
      },
    ]);
    
    return {
      menu
    }
  }
})
</script>

<style lang="scss" src="./app-aside.scss"></style>
