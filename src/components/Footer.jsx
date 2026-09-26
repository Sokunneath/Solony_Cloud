import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-main">
                <div>
                    <h2>SOLONY</h2>

                    <p>
                        Little stationery for brighter ideas.
                    </p>
                </div>

                <div className="footer-links">
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                    <Link to="/about">About</Link>
                    <Link to="/cart">Cart</Link>
                </div>
            </div>

            <div className="footer-bottom">
                <span>
                    © {new Date().getFullYear()} Solony
                </span>

                <span>
                    Made for quiet ideas ♡
                </span>
            </div>
        </footer>
    );
}