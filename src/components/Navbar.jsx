import { Link } from "react-router-dom";
import logo from "../assets/solony-logo.png";

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <img src={logo} alt="Solony logo" className="logo-image" />
                <span>SOLONY</span>
            </Link>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/about">About</Link>
                <Link to="/cart">Cart</Link>
            </div>
        </nav>
    );
}

export default Navbar;