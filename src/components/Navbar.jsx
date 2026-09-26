import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import logo from "../assets/solony-logo.png";

export default function Navbar() {
    const { cart } = useCart();

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <header className="navbar">
            <Link to="/" className="navbar-logo">
                <img src={logo} alt="Solony" />
                <span>SOLONY</span>
            </Link>

            <div className="navbar-center-graphic" aria-hidden="true">
                <span className="nav-line" />

                <div className="nav-badge">
                    <span className="leaf leaf-left" />
                    <span className="leaf leaf-right" />
                    <span className="sparkle sparkle-one" />
                    <span className="sparkle sparkle-two" />
                </div>

                <span className="nav-line" />
            </div>

            <nav className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/about">About</Link>

                <Link to="/cart" className="navbar-cart">
                    <ShoppingBag size={19} />
                    {cartCount > 0 && (
                        <span className="cart-badge">{cartCount}</span>
                    )}
                </Link>
            </nav>
        </header>
    );
}