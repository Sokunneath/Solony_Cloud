export async function onRequest(context) {
    const { request, next } = context;

    const response = await next();

    const updatedResponse =
        new Response(
            response.body,
            response
        );

    updatedResponse.headers.set(
        "X-App",
        "Solony"
    );

    updatedResponse.headers.set(
        "X-Content-Type-Options",
        "nosniff"
    );

    updatedResponse.headers.set(
        "Referrer-Policy",
        "same-origin"
    );

    return updatedResponse;
}