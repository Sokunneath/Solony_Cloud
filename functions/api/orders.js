import { strapiFetch } from "../lib/strapi";

export async function onRequestPost({ request, env }) {
    try {
        const body = await request.json();

        const {
            customer_name,
            email,
            phone,
            shipping_address,
            city,
            note,
            items,
            total,
            payment_method,
        } = body;

        if (
            !customer_name ||
            !email ||
            !phone ||
            !shipping_address ||
            !items?.length
        ) {
            return Response.json(
                {
                    error: "Missing required order information",
                },
                {
                    status: 400,
                }
            );
        }

        const response = await strapiFetch(
            env,
            "/api/orders",
            {
                method: "POST",
                body: JSON.stringify({
                    data: {
                        customer_name,
                        email,
                        phone,
                        shipping_address,
                        city,
                        note: note || "",
                        items,
                        total,
                        payment_method,
                        order_status: "pending",
                    },
                }),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            console.error(
                "Strapi order error:",
                response.status,
                result
            );

            return Response.json(
                {
                    error: "Unable to create order",
                },
                {
                    status: response.status,
                }
            );
        }

        return Response.json(result, {
            status: 201,
        });
    } catch (error) {
        console.error("Order error:", error);

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