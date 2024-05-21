<template lang="pug">
  .app-contacts
    .app-contacts__tabs
      .app-contacts__tabs-inner
        .app-contacts__tab(v-for="t in contactsList" @click="tab = t.id" :class="{active: tab === t.id}")
          .app-contacts__tab-title {{ t.title }}
          .app-contacts__tab-description {{ t.description }}
    .app-contacts__content
      component(:is="tab" @save="save" :contacts="contacts")
        ui-info.app-contacts__field(v-if="saved") Данные успешно сохранены
</template>

<script>
import mainContacts from "./main-contacts.vue";
import footerContacts from "./footer-contacts.vue";
import topBarContacts from "./top-bar-contacts.vue";
import requisites from "./requisites.vue";

export default defineComponent({
  name: "AppContacts",
  components: {
    'main-contacts': mainContacts,
    'top-bar-contacts': topBarContacts,
    'footer-contacts': footerContacts,
    requisites
  },
  async setup() {
    const tab = ref("main-contacts");
    const saved = ref(false);
    let contactsTopBar = await getInfo("top-bar-contacts");
    let contactsMain = await getInfo("main-contacts");
    let contactsFooter = await getInfo("footer-contacts");
    let requisites = await getInfo("requisites");
    const contactsList = ref([
      {
        id: "main-contacts",
        title: "Основные контакты",
        description: "Настройка контактов в блоке с картой",
      },
      {
        id: "top-bar-contacts",
        title: "Контакты в топ-баре",
        description: "Настройка контактов, которые указаны над шапкой сайта",
      },
      {
        id: "footer-contacts",
        title: "Контакты в футере",
        description: "Настройка контактов, которые указаны в подвале сайта",
      },
      {
        id: "requisites",
        title: "Реквизиты",
        description: "Реквизиты для страницы «О компании»",
      },
    ])


    const contacts = computed(() => {
      if (tab.value === "main-contacts") {
        return contactsMain
      }
      if (tab.value === "top-bar-contacts") {
        return contactsTopBar
      }
      if (tab.value === "requisites") {
        return requisites
      }
      return contactsFooter;
    });

    async function getContacts() {
      contactsTopBar = await getInfo("top-bar-contacts");
      contactsMain = await getInfo("main-contacts");
      contactsFooter = await getInfo("footer-contacts");
      requisites = await getInfo("requisites");
    }

    async function save($info) {
      console.log($info);
      await saveInfo(tab.value, $info);
      await getContacts();
      showSaveInfo();
    }

    function showSaveInfo() {
      saved.value = true;
      setTimeout(() => {
        saved.value = false;
      }, 3000);
    }

    return {
      tab,
      save,
      saved,
      contacts,
      contactsList
    }
  }
})
</script>

<style lang="scss" src="./app-contacts.scss"></style>
