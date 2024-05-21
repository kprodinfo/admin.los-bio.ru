export async function uploadFiles(file, catalog = "all", save = false) {
    const body = new FormData();
    body.append("catalog", catalog);
    body.append("files", file);
    body.append("save", save);

    const {data} = await useAPI("/files", {
        method: "post",
        body
    })
    
    return data.value;
}
