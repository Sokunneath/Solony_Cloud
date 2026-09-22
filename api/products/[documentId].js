export default async function handler(req, res) {
    const { documentId } = req.query;

    try {
        const response = await fetch(
            `${process.env.STRAPI_URL}/api/products/${documentId}?populate=*`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                },
            }
        );

        if (!response.ok) {
            return res.status(response.status).json({
                error: "Failed to fetch product from Strapi",
            });
        }

        const data = await response.json();

        if (data.data?.image?.length > 0) {
            data.data.image = data.data.image.map((img) => ({
                ...img,
                url: img.url.startsWith("http")
                    ? img.url
                    : `${process.env.STRAPI_URL}${img.url}`,
            }));
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
}