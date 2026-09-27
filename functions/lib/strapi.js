export async function strapiFetch(
    env,
    path,
    options = {}
) {
    return fetch(
        `${env.STRAPI_URL}${path}`,
        {
            ...options,

            headers: {
                Authorization:
                    `Bearer ${env.STRAPI_API_TOKEN}`,

                Accept: "application/json",

                ...(options.body
                    ? {
                        "Content-Type":
                            "application/json",
                    }
                    : {}),

                ...(options.headers || {}),
            },
        }
    );
}