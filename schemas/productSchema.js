import {object, string} from "yup";

const productSchema = object({
    title: string().required("Заполните название продукта"),
});

export default productSchema;
