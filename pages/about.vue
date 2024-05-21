<template lang="pug">
  .about
    about-text.about__component
    certificates.about__component
    
    ui-form.certificates__form(@submit="savePDFCertificate")
      ui-form-group(id="PDFCertificates" label="Сертификаты в PDF")
        ui-input(v-model="certificate" :files="certificates" :multiple="false" accept="application/pdf" type="file" @get-files="upload" @delete-file="removeFile")
      .certificates__footer
        ui-info(v-if="isPDFSaved") Сертификаты сохранены
        ui-button(v-else type="submit") Сохранить сертификаты
</template>

<script setup>
import Certificates from "~/components/about/certificates/certificates.vue";
import AboutText from "~/components/about/about-text/about-text.vue";

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
})

const certificate = ref();
const certificates = ref([]);
const baseCertificates = await getInfo("pdf-certificates");
certificates.value = baseCertificates;
const isPDFSaved = ref(false);

async function savePDFCertificate() {
  toggleRefBooleanAsTimeout(isPDFSaved, true, false, 4000);
  await saveInfo("pdf-certificates", JSON.stringify(certificates.value));
}

async function upload($files) {
  let index = 0;
  for (const f of $files) {
    const $file = await uploadFiles($files[index], "certificates", true);
    certificates.value = [{...$file[0], isDeleted: false}];
    index++;
  }
}

function removeFile($file) {
  deleteFile($file.id);
  $file.isDeleted = true;
}
</script>

<style lang="scss">
.about {
  padding: 20px;

  &__component {
    &:not(:first-child) {
      margin-top: 50px;
    }
  }
}
</style>
