import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    const image =
        product.image?.[0]?.formats?.medium?.url ||
        product.image?.[0]?.formats?.small?.url ||
        product.image?.[0]?.url ||
        "";

    return (
        <Link
            to={`/products/${product.documentId}`}
            className="product-card"
        >
            <div className="product-card-image">
                {image ? (
                    <img
                        src={image}
                        alt={product.name}
                    />
                ) : (
                    <div className="no-product-image">
                        no image
                    </div>
                )}

                {product.stock <= 3 &&
                    product.stock > 0 && (
                        <span className="product-tag">
                            almost gone
                        </span>
                    )}
            </div>

            <div className="product-card-info">
                <span className="product-category">
                    {product.category || "Stationery"}
                </span>

                <h3>{product.name}</h3>

                <div className="product-card-bottom">
                    <span className="product-price">
                        ${Number(product.price).toFixed(2)}
                    </span>

                    <span className="product-arrow">
                        →
                    </span>
                </div>
            </div>
        </Link>
    );
}