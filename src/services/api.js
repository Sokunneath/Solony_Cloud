export async function getProducts() {
    const response =
        await fetch("/api/products");

    if (!response.ok) {
        throw new Error(
            `Failed to get products: ${response.status}`
        );
    }

    const result =
        await response.json();

    return result.data;
}

export async function createOrder(
    order
) {
    const response =
        await fetch("/api/orders", {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body:
                JSON.stringify(order),
        });

    if (!response.ok) {
        throw new Error(
            `Failed to create order: ${response.status}`
        );
    }

    return response.json();
}

export async function createUser(
    user
) {
    const response =
        await fetch("/api/users", {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json",
            },

            body:
                JSON.stringify(user),
        });

    if (!response.ok) {
        throw new Error(
            `Failed to create user: ${response.status}`
        );
    }

    return response.json();
}