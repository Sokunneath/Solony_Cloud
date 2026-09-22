import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct } from "../services/api";
import { useCart } from "../context/CartContext";

function ProductPage() {
    const { id } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        async function loadProduct() {
            try {
                const data = await getProduct(id);
                setProduct(data);
            } catch (err) {
                console.error(err);
                setError("Unable to load product.");
            } finally {
                setLoading(false);
            }
        }

        loadProduct();
    }, [id]);

    if (loading) {
        return (
            <main className="page-container">
                <p>Loading product...</p>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className="page-container">
                <h1>Product not found</h1>

                <Link to="/shop" className="primary-button">
                    Back to Shop
                </Link>
            </main>
        );
    }

    const imagePath =
        product.image?.[0]?.formats?.large?.url ||
        product.image?.[0]?.formats?.medium?.url ||
        product.image?.[0]?.url;

    const imageUrl = imagePath
        ? imagePath.startsWith("http")
            ? imagePath
            : `${API_URL}${imagePath}`
        : "";

    return (
        <main className="product-detail-page">
            <div className="product-detail">

                {/* PRODUCT IMAGE */}
                <div className="product-detail-image">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={product.name}
                        />
                    ) : (
                        <div className="product-no-image">
                            No image
                        </div>
                    )}
                </div>

                {/* PRODUCT INFO */}
                <div className="product-detail-info">

                    <p className="product-category">
                        {product.category || "Stationery"}
                    </p>

                    <h1>{product.name}</h1>

                    <p className="product-detail-price">
                        ${Number(product.price).toFixed(2)}
                    </p>

                    <p className="product-description">
                        {product.description}
                    </p>

                    <p className="product-stock">
                        {product.stock > 0
                            ? `${product.stock} items available`
                            : "Out of stock"}
                    </p>

                    <button
                        className="add-cart-button"
                        disabled={product.stock <= 0}
                        onClick={() => addToCart(product)}
                    >
                        {product.stock > 0
                            ? "Add to Cart"
                            : "Out of Stock"}
                    </button>

                    <Link
                        to="/shop"
                        className="back-shop-link"
                    >
                        ← Back to Shop
                    </Link>

                </div>
            </div>
        </main>
    );
}

export default ProductPage;