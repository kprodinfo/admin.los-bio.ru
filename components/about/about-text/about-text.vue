<template lang="pug">
  .about-text
    ui-form(@submit="saveAbout")
      ui-form-group(id="about-1" label="Текст о компании")
        ui-editor(:save-id="aboutSaveId" :text="aboutText" @save-data="aboutText = $event")
      .about-text__footer
        ui-info(v-if="isAboutSaved") Информация сохранена
        ui-button(v-else type="submit") Сохранить
</template>

<script setup>
const aboutSaveId = ref(0);
const aboutText = ref([]);
const isAboutSaved = ref(false);
const aboutTextInBase = await getInfo("about-1");
aboutText.value = aboutTextInBase;

async function saveAbout() {
  toggleRefBooleanAsTimeout(isAboutSaved, true, false, 4000);
  await saveInfo("about-1", JSON.stringify(aboutText.value));
}
</script>

<style lang="scss" src="./about-text.scss"></style>
