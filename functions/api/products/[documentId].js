import { strapiFetch } from "../../lib/strapi";

export async function onRequestGet(context) {
    const { env, params } = context;

    const documentId = params.documentId;

    if (!documentId) {
        return Response.json(
            {
                error: "Product ID is required",
            },
            {
                status: 400,
            }
        );
    }

    try {
        const response = await strapiFetch(
            env,
            `/api/products/${encodeURIComponent(documentId)}?populate=*`
        );

        const data = await response.json();

        if (!response.ok) {
            console.error(
                "Unable to get product:",
                response.status,
                data
            );

            return Response.json(
                {
                    error: "Unable to retrieve product",
                },
                {
                    status: response.status,
                }
            );
        }

        return Response.json(data);
    } catch (error) {
        console.error(
            "Product detail error:",
            error
        );

        return Response.json(
            {
                error: "Internal server error",
            },
            {
                status: 500,
            }
        );
    }
}