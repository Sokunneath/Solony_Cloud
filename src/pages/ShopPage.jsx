import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";

function ShopPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error(err);
                setError("Unable to load products.");
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    if (loading) {
        return (
            <main className="page-container">
                <p>Loading products...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="page-container">
                <p>{error}</p>
            </main>
        );
    }

    return (
        <main className="page-container">
            <div className="page-heading">
                <p>Our Collection</p>
                <h1>Shop Solony</h1>
                <p>
                    Discover stationery for studying, planning,
                    writing, and creating.
                </p>
            </div>

            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.documentId || product.id}
                        product={product}
                    />
                ))}
            </div>
        </main>
    );
}

export default ShopPage;