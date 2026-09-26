import {
    useEffect,
    useState,
} from "react";

import {
    Link,
    useParams,
} from "react-router-dom";

import {
    ArrowLeft,
    ShoppingBag,
} from "lucide-react";

import { getProduct } from "../services/api";

import { useCart } from "../context/CartContext";

export default function ProductPage() {
    const { documentId } = useParams();

    const { addToCart } = useCart();

    const [product, setProduct] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [added, setAdded] =
        useState(false);

    useEffect(() => {
        async function loadProduct() {
            try {
                setLoading(true);

                const data =
                    await getProduct(documentId);

                setProduct(data);
            } catch (error) {
                console.error(error);

                setError(
                    "Unable to load this product."
                );
            } finally {
                setLoading(false);
            }
        }

        loadProduct();
    }, [documentId]);

    if (loading) {
        return (
            <main className="product-detail-page">
                <p>
                    finding your stationery...
                </p>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className="product-detail-page">
                <div className="empty-state">
                    <span>☁</span>
                    <h2>product unavailable</h2>
                    <p>{error}</p>
                </div>
            </main>
        );
    }

    const image =
        product.image?.[0]?.formats?.large?.url ||
        product.image?.[0]?.formats?.medium?.url ||
        product.image?.[0]?.url ||
        "";

    function handleAddToCart() {
        addToCart(product);

        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 1500);
    }

    return (
        <main className="product-detail-page">
            <Link
                to="/shop"
                className="back-link"
            >
                <ArrowLeft size={16} />
                back to shop
            </Link>

            <section className="product-detail">
                <div className="product-detail-image">
                    {image ? (
                        <img
                            src={image}
                            alt={product.name}
                        />
                    ) : (
                        <span>
                            no image
                        </span>
                    )}
                </div>

                <div className="product-detail-info">
                    <span className="product-category">
                        {product.category}
                    </span>

                    <h1>{product.name}</h1>

                    <p className="product-detail-description">
                        {product.description}
                    </p>

                    <div className="product-detail-price">
                        $
                        {Number(
                            product.price
                        ).toFixed(2)}
                    </div>

                    <p className="product-stock">
                        {product.stock > 0
                            ? `${product.stock} left in stock`
                            : "out of stock"}
                    </p>

                    <button
                        className={`add-cart-button ${added ? "added" : ""
                            }`}
                        onClick={handleAddToCart}
                        disabled={
                            product.stock <= 0
                        }
                    >
                        <ShoppingBag
                            size={17}
                        />

                        {product.stock <= 0
                            ? "out of stock"
                            : added
                                ? "added ♡"
                                : "add to cart"}
                    </button>
                </div>
            </section>
        </main>
    );
}