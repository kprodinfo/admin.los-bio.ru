import {object, string} from "yup";

const categorySchema = object({
    name: string().required("Заполните название категории"),
    full_description: string().required("Заполните описание категории"),
    slug: string().required("Введите адрес категории"),
});

export default categorySchema;
