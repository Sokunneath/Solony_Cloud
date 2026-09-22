import { useCart } from "../context/CartContext";

function CartPage() {
    const {
        cart,
        removeFromCart,
        clearCart,
    } = useCart();

    if (cart.length === 0) {
        return (
            <main className="page-container">
                <div className="page-heading">
                    <h1>Your Cart</h1>
                    <p>Your cart is currently empty.</p>
                </div>
            </main>
        );
    }

    const total = cart.reduce(
        (sum, item) =>
            sum + Number(item.price) * item.quantity,
        0
    );

    return (
        <main className="page-container">
            <div className="page-heading">
                <h1>Your Cart</h1>
            </div>

            <div className="cart-list">
                {cart.map((item) => (
                    <div
                        key={item.documentId}
                        className="cart-item"
                    >
                        <div>
                            <h3>{item.name}</h3>

                            <p>
                                ${Number(item.price).toFixed(2)}
                            </p>

                            <p>
                                Quantity: {item.quantity}
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                removeFromCart(item.documentId)
                            }
                            className="remove-cart-button"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <h2>
                    Total: ${total.toFixed(2)}
                </h2>

                <button
                    onClick={clearCart}
                    className="secondary-button"
                >
                    Clear Cart
                </button>
            </div>
        </main>
    );
}

export default CartPage;