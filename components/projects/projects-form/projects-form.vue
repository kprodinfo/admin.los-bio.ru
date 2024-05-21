<template lang="pug">
  .projects-form
    .projects-form__wrap
      ui-form(@submit="sendProject" :state="project" :schema="schema")
        ui-form-group(label="Название проекта" id="title").projects-form__field
          ui-input(v-model="project.title")
        
        ui-form-group(label="Краткое описание проекта" id="short_description").projects-form__field
          ui-editor(:text="project.short_description" file-catalog="projects" @save-data="project.short_description = $event")

        ui-form-group(label="Полное описание проекта" id="description").projects-form__field
          ui-editor(:text="project.description" file-catalog="projects" @save-data="project.description = $event")

        ui-form-group(label="Заказчик" id="customer").projects-form__field
          ui-input(v-model="project.customer")

        ui-form-group(label="Тип проделанных работ" id="works").projects-form__field
          ui-input(v-model="project.works")

        ui-form-group(label="Используемое оборудование" id="equipment").projects-form__field
          ui-input(v-model="project.equipment")

        ui-form-group(label="Когда был реализован проект" id="date").projects-form__field
          ui-input(v-model="project.date")
        
        ui-form-group(id="photos" label="Фотографии проекта").projects-form__field
          ui-input(v-model="photo" :files="project.photos" accept="image/*" file-preview-type="photos" :multiple="true" type="file" @get-files="uploadPhoto" @delete-file="removeFile")
        
        ui-form-group(id="published" label="Опубликовать проект на сайте").projects-form__field
          ui-checkbox(v-model="project.published") Да

        ui-info.projects-form__field(v-if="isSaved") Информация сохранена
        .projects-form__footer.projects-form__field
          ui-button(type="submit") {{ saveText }}
          ui-button(color="red" @click="deleteProjectFromDB" v-if="slug !== 'create'").projects-form__delete-btn {{ deleteText }}
</template>

<script setup>
import {useIndexStore} from "~/store/index.js";
import {generateSlug} from "~/utils/index.js";
import productSchema from "~/schemas/productSchema.js";

const indexStore = useIndexStore();
const schema = productSchema;
const route = useRoute();
const router = useRouter();
const slug = route.params.slug;
const isClickDelete = ref(false);
const isSaved = ref(false);
const photo = ref();

onMounted(() => {
  const query = route.query;

  if (query.isSaved === "true") {
    toggleRefBooleanAsTimeout(isSaved, true, false, 4000);
  }
})

const saveText = computed(() => {
  if (slug === "create") {
    return "Создать проект"
  }
  return "Сохранить проект"
});

const deleteText = computed(() => {
  if (isClickDelete.value) {
    return "Точно удалить?"
  }
  return "Удалить"
});

let project = ref({
  id: new Date().getTime(),
  title: "",
  description: [],
  short_description: [],
  slug: "",
  published: true,
  photos: [],
  customer: "",
  works: "",
  equipment: "",
  date: "",
});

const photos = computed(() => {
  return project.value.photos.filter(photo => !photo.isDeleted).map(photo => photo.id);
})

if (slug !== "create") {
  project = await getProject(slug);
  indexStore.setTitle(project.value.title);
} else {
  indexStore.setTitle("Новый проект");
}

watch(() => project.value.title, () => {
  project.value.slug = generateSlug(project.value.title);
})

async function deleteProjectFromDB() {
  if (isClickDelete.value) {
    const isDelete = await deleteProject(project.value.id);
    if (+isDelete === 1) {
      await router.push("/projects");
    }
    return
  }

  isClickDelete.value = true;
}

async function uploadPhoto($files) {
  let index = 0;
  for (const f of $files) {
    const $file = await uploadFiles($files[index], "projects", true);
    project.value.photos.push({...$file[0], isDeleted: false});
    index++;
  }
}

function removeFile($file) {
  deleteFile($file.id);
  $file.isDeleted = true;
}

async function sendProject() {
  /* Если создаём новый продукт */
  if (slug === "create") {
    const newProject = await createProject({...project.value, id: 1, photos: photos.value.filter(p => !p.isDeleted) });
    return await router.push({
      path: `/projects/${newProject.slug}`,
      query: {
        isSaved: "true"
      }
    });
  }

  toggleRefBooleanAsTimeout(isSaved, true, false, 4000);
  await updateProject(project.value.id, {...project.value, photos: photos.value.filter(p => !p.isDeleted) });
}

</script>

<style lang="scss" src="./projects-form.scss"></style>
