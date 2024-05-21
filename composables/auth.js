export async function useAuth(email, password) {
    const {data, error} = await useAPI("/auth/login", {
        body: {
            email: email,
            password: password
        },
        method: "post"
    });

    if (error.value) {
        return {
            type: "error",
            error: error.value.data.message
        }
    }

    return {
        type: "token",
        data: data.value
    };
}
