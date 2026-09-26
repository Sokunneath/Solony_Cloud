import { Link } from "react-router-dom";

import {
    Minus,
    Plus,
    Trash2,
} from "lucide-react";

import { useCart } from "../context/CartContext";

export default function CartPage() {
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
    } = useCart();

    const total = cart.reduce(
        (sum, item) =>
            sum +
            Number(item.price) *
            item.quantity,
        0
    );

    if (cart.length === 0) {
        return (
            <main className="cart-page">
                <div className="empty-state">
                    <span>♡</span>

                    <h1>
                        your cart is quiet
                    </h1>

                    <p>
                        Maybe it needs a little
                        stationery.
                    </p>

                    <Link
                        to="/shop"
                        className="final-button"
                    >
                        explore the shop
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="cart-page">
            <div className="cart-heading">
                <span>YOUR LITTLE PICKS</span>

                <h1>shopping bag ♡</h1>
            </div>

            <section className="cart-items">
                {cart.map((item) => {
                    const image =
                        item.image?.[0]?.formats
                            ?.small?.url ||
                        item.image?.[0]?.url ||
                        "";

                    return (
                        <article
                            className="cart-item"
                            key={item.documentId}
                        >
                            <div className="cart-item-image">
                                {image && (
                                    <img
                                        src={image}
                                        alt={item.name}
                                    />
                                )}
                            </div>

                            <div className="cart-item-info">
                                <span>
                                    {item.category}
                                </span>

                                <h3>
                                    {item.name}
                                </h3>

                                <p>
                                    $
                                    {Number(
                                        item.price
                                    ).toFixed(2)}
                                </p>

                                <div className="quantity-control">
                                    <button
                                        onClick={() =>
                                            decreaseQuantity(
                                                item.documentId
                                            )
                                        }
                                    >
                                        <Minus size={14} />
                                    </button>

                                    <span>
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            increaseQuantity(
                                                item.documentId
                                            )
                                        }
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>

                            <button
                                className="remove-cart-item"
                                onClick={() =>
                                    removeFromCart(
                                        item.documentId
                                    )
                                }
                                aria-label="Remove product"
                            >
                                <Trash2 size={17} />
                            </button>
                        </article>
                    );
                })}
            </section>

            <section className="cart-summary">
                <div>
                    <span>Total</span>

                    <strong>
                        ${total.toFixed(2)}
                    </strong>
                </div>

                <button className="checkout-button">
                    continue to checkout
                    →
                </button>

                <button
                    className="clear-cart"
                    onClick={clearCart}
                >
                    clear cart
                </button>
            </section>
        </main>
    );
}