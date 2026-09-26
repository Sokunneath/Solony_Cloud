export default async function handler(
    req,
    res
) {
    if (req.method !== "GET") {
        return res.status(405).json({
            error: "Method not allowed",
        });
    }

    try {
        const response = await fetch(
            `${process.env.STRAPI_URL}/api/products?populate=*`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                },
            }
        );

        if (!response.ok) {
            return res
                .status(response.status)
                .json({
                    error:
                        "Unable to retrieve products",
                });
        }

        const result =
            await response.json();

        const products =
            result.data.map((product) => {
                if (product.image?.length) {
                    product.image =
                        product.image.map(
                            (image) => ({
                                ...image,

                                url: makeAbsolute(
                                    image.url
                                ),

                                formats:
                                    makeFormatsAbsolute(
                                        image.formats
                                    ),
                            })
                        );
                }

                return product;
            });

        return res.status(200).json({
            ...result,
            data: products,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
}

function makeAbsolute(url) {
    if (!url) return url;

    if (url.startsWith("http")) {
        return url;
    }

    return `${process.env.STRAPI_URL}${url}`;
}

function makeFormatsAbsolute(formats) {
    if (!formats) return formats;

    const updated = {};

    for (const [
        key,
        value,
    ] of Object.entries(formats)) {
        updated[key] = {
            ...value,
            url: makeAbsolute(value.url),
        };
    }

    return updated;
}