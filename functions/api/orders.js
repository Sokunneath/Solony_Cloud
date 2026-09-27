// functions/api/orders.js

import {
    strapiFetch,
} from "../lib/strapi";

export async function onRequestPost({
    request,
    env,
}) {
    try {
        const body =
            await request.json();

        if (
            !body.fullName ||
            !body.phone ||
            !body.address ||
            !body.items?.length
        ) {
            return Response.json(
                {
                    error:
                        "Missing required order information",
                },
                {
                    status: 400,
                }
            );
        }

        /*
          Later we should:
          1. Fetch product prices from Strapi
          2. Verify stock
          3. Calculate total server-side
          4. Never trust price/total from browser
        */

        const response =
            await strapiFetch(
                env,
                "/api/orders",
                {
                    method: "POST",

                    body: JSON.stringify({
                        data: body,
                    }),
                }
            );

        const data =
            await response.json();

        if (!response.ok) {
            return Response.json(
                {
                    error:
                        "Unable to create order",
                },
                {
                    status:
                        response.status,
                }
            );
        }

        return Response.json(
            data,
            {
                status: 201,
            }
        );
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