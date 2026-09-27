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

                "CF-Access-Client-Id":
                    env.CF_ACCESS_CLIENT_ID,

                "CF-Access-Client-Secret":
                    env.CF_ACCESS_CLIENT_SECRET,

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