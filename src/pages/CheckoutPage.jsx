import { useState } from "react";
import { Link } from "react-router-dom";

import {
    ArrowLeft,
    ShoppingBag,
} from "lucide-react";

import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
    const {
        cart,
        cartTotal,
        clearCart,
    } = useCart();

    const [form, setForm] =
        useState({
            fullName: "",
            phone: "",
            email: "",
            address: "",
            city: "",
            note: "",

            paymentMethod:
                "cash_on_delivery",
        });

    const [submitting, setSubmitting] =
        useState(false);

    function handleChange(event) {
        const {
            name,
            value,
        } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (cart.length === 0) {
            alert(
                "Your cart is empty."
            );

            return;
        }

        setSubmitting(true);

        try {
            const orderData = {
                customer_name:
                    form.fullName,

                email:
                    form.email,

                phone:
                    form.phone,

                shipping_address:
                    form.address,

                city:
                    form.city,

                note:
                    form.note || "",

                items:
                    cart.map((item) => ({
                        documentId:
                            item.documentId,

                        name:
                            item.name,

                        quantity:
                            item.quantity,

                        price:
                            Number(item.price),
                    })),

                total:
                    Number(cartTotal),

                payment_method:
                    form.paymentMethod,
            };

            console.log(
                "Sending order:",
                orderData
            );

            const response =
                await fetch(
                    "/api/orders",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify(
                                orderData
                            ),
                    }
                );

            const result =
                await response.json();

            console.log(
                "Order response:",
                result
            );

            if (!response.ok) {
                console.error(
                    "Order error:",
                    result
                );

                alert(
                    result.error ||
                    "Unable to place your order."
                );

                return;
            }

            alert(
                "Order placed successfully!"
            );

            clearCart();

        } catch (error) {
            console.error(
                "Checkout error:",
                error
            );

            alert(
                `Something went wrong: ${error.message}`
            );

        } finally {
            setSubmitting(false);
        }
    }

    if (cart.length === 0) {
        return (
            <main className="checkout-page">
                <div className="empty-state">
                    <span>♡</span>

                    <h1>
                        Your cart is empty
                    </h1>

                    <p>
                        Add something lovely
                        before checking out.
                    </p>

                    <Link
                        to="/shop"
                        className="final-button"
                    >
                        shop stationery
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="checkout-page">

            <Link
                to="/cart"
                className="back-link"
            >
                <ArrowLeft size={16} />

                back to cart
            </Link>

            <div className="checkout-heading">
                <span>
                    ALMOST YOURS ♡
                </span>

                <h1>
                    checkout
                    <em>.</em>
                </h1>

                <p>
                    Tell us where your
                    little Solony package
                    should go.
                </p>
            </div>

            <div className="checkout-layout">

                {/* =========================
            CUSTOMER FORM
        ========================== */}

                <form
                    className="checkout-form"
                    onSubmit={handleSubmit}
                >

                    {/* CONTACT DETAILS */}

                    <div className="checkout-section-heading">
                        <span>
                            01
                        </span>

                        <div>
                            <h2>
                                contact details
                            </h2>

                            <p>
                                We'll use these
                                details for your
                                order.
                            </p>
                        </div>
                    </div>

                    <div className="checkout-fields">

                        <div className="form-field full">
                            <label htmlFor="fullName">
                                Full name
                            </label>

                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Your full name"
                                value={form.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="phone">
                                Phone number
                            </label>

                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="012 345 678"
                                value={form.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="checkout-divider" />

                    {/* DELIVERY DETAILS */}

                    <div className="checkout-section-heading">
                        <span>
                            02
                        </span>

                        <div>
                            <h2>
                                delivery details
                            </h2>

                            <p>
                                Where should we
                                send your order?
                            </p>
                        </div>
                    </div>

                    <div className="checkout-fields">

                        <div className="form-field full">
                            <label htmlFor="address">
                                Delivery address
                            </label>

                            <textarea
                                id="address"
                                name="address"
                                placeholder="House number, street, district..."
                                value={form.address}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-field full">
                            <label htmlFor="city">
                                City / Province
                            </label>

                            <input
                                id="city"
                                name="city"
                                type="text"
                                placeholder="Phnom Penh"
                                value={form.city}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-field full">
                            <label htmlFor="note">
                                Delivery note
                                <small>
                                    {" "}
                                    optional
                                </small>
                            </label>

                            <textarea
                                id="note"
                                name="note"
                                placeholder="Landmark, preferred delivery time, special instructions..."
                                value={form.note}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className="checkout-divider" />

                    {/* PAYMENT */}

                    <div className="checkout-section-heading">
                        <span>
                            03
                        </span>

                        <div>
                            <h2>
                                payment
                            </h2>

                            <p>
                                Choose how you
                                would like to pay.
                            </p>
                        </div>
                    </div>

                    <div className="payment-options">

                        {/* CASH ON DELIVERY */}

                        <label
                            className={
                                form.paymentMethod ===
                                    "cash_on_delivery"
                                    ? "payment-option active"
                                    : "payment-option"
                            }
                        >
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cash_on_delivery"
                                checked={
                                    form.paymentMethod ===
                                    "cash_on_delivery"
                                }
                                onChange={handleChange}
                            />

                            <div>
                                <strong>
                                    Cash on delivery
                                </strong>

                                <span>
                                    Pay when your
                                    order arrives.
                                </span>
                            </div>
                        </label>

                        {/* BANK TRANSFER */}

                        <label
                            className={
                                form.paymentMethod ===
                                    "bank_transfer"
                                    ? "payment-option active"
                                    : "payment-option"
                            }
                        >
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="bank_transfer"
                                checked={
                                    form.paymentMethod ===
                                    "bank_transfer"
                                }
                                onChange={handleChange}
                            />

                            <div>
                                <strong>
                                    Bank transfer
                                </strong>

                                <span>
                                    Payment
                                    instructions can
                                    be provided after
                                    order
                                    confirmation.
                                </span>
                            </div>
                        </label>

                    </div>

                    <button
                        type="submit"
                        className="place-order-button"
                        disabled={submitting}
                    >
                        <ShoppingBag size={17} />

                        {submitting
                            ? "placing order..."
                            : "place order"}
                    </button>

                </form>

                {/* =========================
            ORDER SUMMARY
        ========================== */}

                <aside className="checkout-summary">

                    <span className="summary-label">
                        YOUR ORDER
                    </span>

                    <h2>
                        little favorites ♡
                    </h2>

                    <div className="checkout-products">

                        {cart.map((item) => {
                            const image =
                                item.image?.[0]
                                    ?.formats?.small
                                    ?.url ||
                                item.image?.[0]
                                    ?.url ||
                                "";

                            return (
                                <div
                                    className="checkout-product"
                                    key={item.documentId}
                                >

                                    <div className="checkout-product-image">

                                        {image && (
                                            <img
                                                src={image}
                                                alt={item.name}
                                            />
                                        )}

                                        <span>
                                            {item.quantity}
                                        </span>

                                    </div>

                                    <div>
                                        <strong>
                                            {item.name}
                                        </strong>

                                        <p>
                                            $
                                            {(
                                                Number(
                                                    item.price
                                                ) *
                                                item.quantity
                                            ).toFixed(2)}
                                        </p>
                                    </div>

                                </div>
                            );
                        })}

                    </div>

                    <div className="summary-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            $
                            {cartTotal.toFixed(2)}
                        </strong>

                    </div>

                    <p className="checkout-note">
                        Shipping fees can be
                        confirmed before
                        delivery.
                    </p>

                </aside>

            </div>
        </main>
    );
}