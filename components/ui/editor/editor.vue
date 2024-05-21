<template lang="pug">
  .ui-input.editor
    .ui-input__field(:id="inputId")
</template>

<script>
import {defineComponent} from "vue";
import EditorJS from '@editorjs/editorjs';
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from '@editorjs/table';
import ImageTool from "@editorjs/image";
import ProductProperty from "~/utils/editorjs/product-property/product-property.js";
import YoutubeTools from "~/utils/editorjs/youtube.js";

export default defineComponent({
  name: "UiEditor",
  props: {
    text: {
      type: Array,
      required: false,
      default: () => ([]),
    },
    fileCatalog: {
      type: String,
      default: "all",
    }
  },
  inheritAttrs: false,
  emits: ["saveData"],
  setup(props, { emit }) {
    let editor;
    const id = inject("inputId", undefined);

    onMounted(() => {
      editor = new EditorJS({
        holder: id,
        placeholder: "Введите текст...",
        data: props.text,
        onChange: function (api, event) {
          editor.save().then((outputData) => {
            emit("saveData", outputData);
          });
        },
        tools: {
          productProperty: {
            class: ProductProperty,
            inlineToolbar: true,
          },
          youtube: {
            class: YoutubeTools,
            inlineToolbar: true,
          },
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              defaultLevel: 4,
              placeholder: "Введите заголовок"
            }
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          table: {
            class: Table,
          },
          image: {
            class: ImageTool,
            inlineToolbar: true,
            config: {
              uploader: {
                uploadByFile: async function (file) {
                  const uploadedFile = await uploadFiles(file, props.fileCatalog, true);
                  return {
                    success: 1,
                    file: {
                      url: getFile(uploadedFile[0])
                    }
                  }
                }
              }
            }
          },
        }
      });
    })
    
    return {
      inputId: id,
    }
  }
})
</script>

<style lang="scss" src="./ui-editor.scss"></style>
