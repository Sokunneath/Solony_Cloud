import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

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
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <main className="page-container">
            <h1>Shop Solony</h1>

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