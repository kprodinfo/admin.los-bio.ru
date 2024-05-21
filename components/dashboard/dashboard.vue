<template lang="pug">
  .dashboard
    .dashboard__list
      .dashboard__item
        .dashboard__item-title Посетителей
          span За неделю
        .dashboard__item-value 3024
        ui-icon-about.dashboard__item-icon
      .dashboard__item
        .dashboard__item-title Просмотров каталога
          span За неделю
        .dashboard__item-value 1512
        ui-icon-categories.dashboard__item-icon
      .dashboard__item
        .dashboard__item-title Заявок
          span За неделю
        .dashboard__item-value 143
        ui-icon-advantages.dashboard__item-icon
      .dashboard__item
        .dashboard__item-title Позиций в каталоге
        .dashboard__item-value 72
        ui-icon-projects.dashboard__item-icon
      
</template>

<script>
export default defineComponent({
  name: "AppDashboard"
})
</script>

<style lang="scss" src="./dashboard.scss"></style>
