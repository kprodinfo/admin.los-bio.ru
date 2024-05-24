<template lang="pug">
  .product-form
    .product-form__wrap
      ui-form(@submit="sendProduct" :state="product" :schema="schema")
        ui-form-group(label="Название продукта" id="title").product-form__field
          ui-input(v-model="product.title")

        ui-form-group(label="Категория товара" id="link").product-form__field
          ui-select(v-model="product.categoryId" option-attribute="name" value-attribute="id" :options="categories")
        
        ui-form-group(label="Краткое описание продукта" id="short_description").product-form__field
          ui-editor(:text="product.short_description" file-catalog="products" @save-data="product.short_description = $event")

        ui-form-group(label="Полное описание продукта" id="full_description").product-form__field
          ui-editor(:text="product.full_description" file-catalog="products" @save-data="product.full_description = $event")

        ui-form-group(label="Характеристики" id="characteristics").product-form__field
          ui-editor(:text="product.characteristics" file-catalog="products" @save-data="product.characteristics = $event")

        ui-form-group(label="Схема" id="schema").product-form__field
          ui-editor(:text="product.schema" file-catalog="products" @save-data="product.schema = $event")
        
        ui-form-group(label="Старая цена" id="old_price").product-form__field
          ui-input(v-model="product.old_price")
          
        ui-form-group(label="Цена" id="price").product-form__field
          ui-input(v-model="product.price")
        
        ui-form-group(id="photos" label="Фотографии товара").product-form__field
          ui-input(v-model="photo" :files="product.photos" accept="image/*" file-preview-type="photos" :multiple="true" type="file" @get-files="uploadPhoto" @delete-file="removeFile")
        
        ui-form-group(id="published" label="Опубликовать продукт на сайте").product-form__field
          ui-checkbox(v-model="product.published") Да

        ui-info.product-form__field(v-if="isSaved") Информация сохранена
        .product-form__footer.product-form__field
          ui-button(type="submit") {{ saveText }}
          ui-button(color="red" @click="deleteProductFromDB" v-if="slug !== 'create'").product-form__delete-btn {{ deleteText }}
</template>

<script setup>
import {useIndexStore} from "~/store/index.js";
import {generateSlug} from "~/utils/index.js";
import productSchema from "~/schemas/productSchema.js";
import {getCategories} from "~/composables/getCategories.js";

const indexStore = useIndexStore();
const schema = productSchema;
const route = useRoute();
const router = useRouter();
const slug = route.params.slug;
const isClickDelete = ref(false);
const isSaved = ref(false);
const photo = ref();
const categoriesList = await getCategories();
const categories = ref(categoriesList.value);

onMounted(() => {
  const query = route.query;

  if (query.isSaved === "true") {
    toggleRefBooleanAsTimeout(isSaved, true, false, 4000);
  }
})

const saveText = computed(() => {
  if (slug === "create") {
    return "Создать продукт"
  }
  return "Сохранить продукт"
});

const deleteText = computed(() => {
  if (isClickDelete.value) {
    return "Точно удалить?"
  }
  return "Удалить"
});

let product = ref({
  title: "",
  full_description: [],
  short_description: [],
  characteristics: [],
  schema: [],
  slug: "",
  price: null,
  old_price: null,
  categoryId: 0,
  published: true,
  photos: [],
});

const photos = computed(() => {
  return product.value.photos.filter(photo => !photo.isDeleted).map(photo => photo.id);
})

if (slug !== "create") {
  product = await getProduct(slug);
  indexStore.setTitle(product.value.title);
} else {
  indexStore.setTitle("Новый продукт");
}

watch(() => product.value.title, () => {
  product.value.slug = generateSlug(product.value.title);
})

async function deleteProductFromDB() {
  if (isClickDelete.value) {
    const isDelete = await deleteProduct(product.value.id);
    if (+isDelete === 1) {
      await router.push("/catalog");
    }
    return
  }

  isClickDelete.value = true;
}

async function uploadPhoto($files) {
  let index = 0;
  for (const f of $files) {
    const $file = await uploadFiles($files[index], "products", true);
    product.value.photos.push({...$file[0], isDeleted: false});
    index++;
  }
}

function removeFile($file) {
  deleteFile($file.id);
  $file.isDeleted = true;
}

async function sendProduct() {
  /* Если создаём новый продукт */
  if (slug === "create") {
    const newProduct = await createProduct({...product.value, photos: photos.value.filter(p => !p.isDeleted) });
    return await router.push({
      path: `/catalog/${newProduct.slug}`,
      query: {
        isSaved: "true"
      }
    });
  }

  toggleRefBooleanAsTimeout(isSaved, true, false, 4000);
  await updateProduct(product.value.id, {...product.value, photos: photos.value.filter(p => !p.isDeleted) });
}

</script>

<style lang="scss" src="./product-form.scss"></style>
