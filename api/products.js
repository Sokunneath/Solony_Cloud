export default async function handler(req, res) {
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
            return res.status(response.status).json({
                error: "Failed to fetch products from Strapi",
            });
        }

        const data = await response.json();

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
}