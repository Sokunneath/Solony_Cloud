export async function getProducts() {
    const response = await fetch("/api/products");

    if (!response.ok) {
        throw new Error(
            `Failed to get products: ${response.status}`
        );
    }

    const result = await response.json();

    return result.data;
}

export async function getProduct(documentId) {
    const response = await fetch(
        `/api/products/${encodeURIComponent(documentId)}`
    );

    if (!response.ok) {
        throw new Error(
            `Failed to get product: ${response.status}`
        );
    }

    const result = await response.json();

    return result.data;
}