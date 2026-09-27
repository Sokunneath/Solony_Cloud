// functions/api/users.js

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
            !body.email ||
            !body.password
        ) {
            return Response.json(
                {
                    error:
                        "Email and password are required",
                },
                {
                    status: 400,
                }
            );
        }

        const response =
            await strapiFetch(
                env,
                "/api/users",
                {
                    method: "POST",

                    body: JSON.stringify({
                        data: body,
                    }),
                }
            );

        const data =
            await response.json();

        return Response.json(
            data,
            {
                status:
                    response.status,
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