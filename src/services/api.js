const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts() {
    const response = await fetch(
        `${API_URL}/api/products?populate=*`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
}

export async function getProduct(documentId) {
    const response = await fetch(
        `${API_URL}/api/products/${documentId}?populate=*`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`);
    }

    const result = await response.json();

    return result.data;
}