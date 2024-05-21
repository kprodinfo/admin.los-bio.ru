export async function deleteFile(fileId) {
    const {data} = await useAPI("/files", {
        method: "delete",
        body: {
            id: fileId
        }
    })

    return data.value;
}
