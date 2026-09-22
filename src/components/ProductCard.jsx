import { Link } from "react-router-dom";

function ProductCard({ product }) {
    const API_URL = import.meta.env.VITE_API_URL;

    const imagePath = product.image?.[0]?.url;

    const imageUrl = imagePath
        ? imagePath.startsWith("http")
            ? imagePath
            : `${API_URL}${imagePath}`
        : "";

    return (
        <Link
            to={`/products/${product.documentId}`}
            className="product-card"
        >
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="product-image"
                />
            ) : (
                <div className="product-image product-no-image">
                    No image
                </div>
            )}

            <div className="product-info">
                <p className="product-category">
                    {product.category || "Stationery"}
                </p>

                <h3>{product.name}</h3>

                <p className="product-description">
                    {product.description}
                </p>

                <p className="product-price">
                    ${Number(product.price).toFixed(2)}
                </p>

                <p className="product-stock">
                    {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of stock"}
                </p>
            </div>
        </Link>
    );
}

export default ProductCard;