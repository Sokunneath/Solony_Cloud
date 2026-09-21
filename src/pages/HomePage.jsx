import { Link } from "react-router-dom";
import heroImage from "../assets/hero-stationery.png";


function HomePage() {
    return (
        <main>
            {/* HERO SECTION */}
            <section className="hero">
                <div className="hero-content">
                    <p className="hero-label">Welcome to Solony</p>

                    <h1>
                        Little things for
                        <br />
                        brighter ideas.
                    </h1>

                    <p>
                        Thoughtfully selected stationery for studying,
                        planning, creating, and making everyday moments
                        a little more beautiful.
                    </p>

                    <a href="/shop" className="primary-button">
                        Explore Solony
                    </a>
                </div>

                <div className="hero-image-wrapper">
                    <img
                        src={heroImage}
                        alt="Solony stationery collection"
                        className="hero-image"
                    />
                </div>
            </section>

            {/* CATEGORY SECTION */}
            <section className="section">
                <div className="section-heading">
                    <p>Explore</p>
                    <h2>Shop by Category</h2>
                </div>

                <div className="category-grid">
                    <Link
                        to="/shop"
                        className="category-card"
                    >
                        <h3>Notebooks</h3>
                        <p>For notes, ideas and creativity.</p>
                    </Link>

                    <Link
                        to="/shop"
                        className="category-card"
                    >
                        <h3>Pens</h3>
                        <p>Write your ideas beautifully.</p>
                    </Link>

                    <Link
                        to="/shop"
                        className="category-card"
                    >
                        <h3>Planners</h3>
                        <p>Organize your everyday life.</p>
                    </Link>

                    <Link
                        to="/shop"
                        className="category-card"
                    >
                        <h3>Art Supplies</h3>
                        <p>Create something you love.</p>
                    </Link>
                </div>
            </section>

            {/* BRAND SECTION */}
            <section className="section solony-message">
                <div className="message-content">
                    <p className="hero-label">Made for your ideas</p>

                    <h2>
                        Simple stationery.
                        <br />
                        Thoughtful moments.
                    </h2>

                    <p>
                        Solony brings together useful and beautiful stationery
                        for studying, planning, writing, and creating.
                    </p>

                    <a href="/shop" className="secondary-button">
                        Shop the Collection
                    </a>
                </div>
            </section>
        </main>
    );
}

export default HomePage;