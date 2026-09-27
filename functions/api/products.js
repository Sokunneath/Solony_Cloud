// functions/api/products.js

import {
    strapiFetch,
} from "../lib/strapi";

export async function onRequestGet({
    env,
}) {
    try {
        const response =
            await strapiFetch(
                env,
                "/api/products?populate=*"
            );

        const data =
            await response.json();

        if (!response.ok) {
            return Response.json(
                {
                    error:
                        "Unable to retrieve products",
                },
                {
                    status:
                        response.status,
                }
            );
        }

        return Response.json(data);
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                error:
                    "Internal server error",
            },
            {
                status: 500,
            }
        );
    }
}