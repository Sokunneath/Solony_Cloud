import { Link } from "react-router-dom";

function ProductCard({ product }) {
    const imageUrl =
        product.image?.[0]?.formats?.medium?.url ||
        product.image?.[0]?.formats?.small?.url ||
        product.image?.[0]?.url ||
        "";

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
            </div>
        </Link>
    );
}

export default ProductCard;