<template lang="pug">
  ui-form.certificates__form(@submit="saveCertificates")
    ui-form-group(id="file" label="Сертификаты")
      ui-input(v-model="certificate" :files="certificates" accept="image/*" file-preview-type="photos" type="file" @get-files="upload" @delete-file="removeFile")
    .certificates__footer
      ui-info(v-if="isCertificatesSaved") Сертификаты сохранены
      ui-button(v-else type="submit") Сохранить сертификаты
</template>

<script setup>
const certificate = ref(null);
const certificates = ref([]);
const certificatesToSave = computed(() => {
  return certificates.value.filter(c => !c.isDeleted)
})
const isCertificatesSaved = ref(false);
const certificatesList = await getInfo("certificates");

console.log("cL", certificatesList);

certificates.value = certificatesList;

function removeFile($file) {
  deleteFile($file.id);
  $file.isDeleted = true;
  saveInfo("certificates", JSON.stringify(certificatesToSave.value));
}

async function upload($files) {
  let index = 0;
  for (const f of $files) {
    const $file = await uploadFiles($files[index], "certificates", true);
    certificates.value.push({...$file[0], isDeleted: false});
    index++;
  }
}

async function saveCertificates() {
  toggleRefBooleanAsTimeout(isCertificatesSaved, true, false, 4000);
  await saveInfo("certificates", JSON.stringify(certificatesToSave.value));
}
</script>

<style lang="scss" src="./certificates.scss"></style>
