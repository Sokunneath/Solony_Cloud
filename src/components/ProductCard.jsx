import { Link } from "react-router-dom";

function ProductCard({ product }) {
    const API_URL = import.meta.env.VITE_API_URL;

    let imageUrl = "";

    if (product.image?.url) {
        imageUrl = product.image.url.startsWith("http")
            ? product.image.url
            : `${API_URL}${product.image.url}`;
    }

    return (
        <Link
            to={`/products/${product.documentId || product.id}`}
            className="product-card"
        >
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="product-image"
                />
            )}

            <div className="product-info">
                <h3>{product.name}</h3>
                <p>${product.price}</p>
            </div>
        </Link>
    );
}

export default ProductCard;