<template lang="pug">
  .category-form
    .category-form__wrap
      ui-form(@submit="sendCategory" :state="category" :schema="schema")
        ui-form-group(label="Название категории" id="name").category-form__field
          ui-input(v-model="category.name")
        ui-form-group(label="Короткое описание категории" id="short_description").category-form__field
          ui-textarea(v-model="category.short_description" autoresize)
        ui-form-group(label="Полное описание категории" id="full_description").category-form__field
          ui-textarea(v-model="category.full_description" autoresize)
        ui-info.category-form__field(v-if="isSaved") Информация сохранена
        .category-form__footer.category-form__field
          ui-button(type="submit") {{ saveText }}
          ui-button(color="red" @click="deleteCategoryFromDB" v-if="slug !== 'create'").category-form__delete-btn {{ deleteText }}
</template>

<script setup>
import {useIndexStore} from "~/store/index.js";
import {getCategory} from "~/composables/getCategory.js";
import categorySchema from "~/schemas/categorySchema.js";
import {generateSlug} from "~/utils/index.js";
import {saveCategory} from "~/composables/saveCategory.js";
import {deleteCategory} from "~/composables/deleteCategory.js";

const indexStore = useIndexStore();
const schema = categorySchema;
const route = useRoute();
const router = useRouter();
const slug = route.params.slug;
const isClickDelete = ref(false);
const isSaved = ref(false);

onMounted(() => {
  const query = route.query;
  
  if(query.isSaved === "true") {
    toggleRefBooleanAsTimeout(isSaved, true, false, 4000);
  }
})

const saveText = computed(() => {
  if (slug === "create") {
    return "Создать категорию"
  }
  return "Сохранить категорию"
});

const deleteText = computed(() => {
  if (isClickDelete.value) {
    return "Точно удалить?"
  }
  return "Удалить"
});

let category = reactive({
  id: new Date().getTime(),
  name: "",
  full_description: "",
  short_description: "",
  slug: ""
});

if (slug !== "create") {
  category = await getCategory(slug);
  indexStore.setTitle(category.name);
} else {
  indexStore.setTitle("Новая категория");
}

watch(category, () => {
  category.slug = generateSlug(category.name);
})

async function deleteCategoryFromDB() {
  if (isClickDelete.value) {
    const isDelete = await deleteCategory(category.slug);
    console.log(isDelete);
    if (+isDelete === 1) {
      await router.push("/categories");
    }
    return
  }

  isClickDelete.value = true;
}

async function sendCategory() {
  const newCategory = await saveCategory(category);
  if (newCategory?.slug) {
    await router.push({
      path: `/categories/${newCategory.slug}`,
      query: {
        isSaved: "true"
      }
    });
  } else {
    toggleRefBooleanAsTimeout(isSaved, true, false, 4000);
  }
}

</script>

<style lang="scss" src="./cateogry-form.scss"></style>
