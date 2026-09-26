import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";

import matchaBackground from "../assets/matcha-desk-bg.jpg";

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [featuredIndex, setFeaturedIndex] = useState(0);

    /* =========================
       LOAD PRODUCTS
    ========================== */

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getProducts();

                setProducts(data.slice(0, 4));
            } catch (error) {
                console.error("Homepage products:", error);
            }
        }

        loadProducts();
    }, []);

    /* =========================
       ROTATE FEATURED PRODUCTS
    ========================== */

    useEffect(() => {
        if (products.length === 0) return;

        const interval = setInterval(() => {
            setFeaturedIndex((current) => {
                const max = Math.min(products.length, 3);

                return (current + 1) % max;
            });
        }, 3500);

        return () => clearInterval(interval);
    }, [products]);

    /* =========================
       SCROLL REVEAL
    ========================== */

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            {
                threshold: 0.12,
            }
        );

        const elements = document.querySelectorAll(".reveal");

        elements.forEach((element) => {
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    /* =========================
       CATEGORY DATA
    ========================== */

    const categories = [
        {
            name: "Notebooks",
            description: "A little space for every thought.",
            path: "/shop?category=Notebooks",
            symbol: "✎",
        },
        {
            name: "Pens",
            description: "For notes, doodles and everything between.",
            path: "/shop?category=Pens",
            symbol: "✦",
        },
        {
            name: "Planners",
            description: "Slow down and make space for your days.",
            path: "/shop?category=Planners",
            symbol: "♡",
        },
        {
            name: "Art Supplies",
            description: "Small tools for colorful ideas.",
            path: "/shop?category=Art Supplies",
            symbol: "✿",
        },
    ];

    /* =========================
       FEATURED PRODUCT DATA
    ========================== */

    const featuredProducts = products.slice(0, 3);

    const featuredProduct =
        featuredProducts.length > 0
            ? featuredProducts[featuredIndex]
            : null;

    const featuredImage =
        featuredProduct?.image?.[0]?.formats?.medium?.url ||
        featuredProduct?.image?.[0]?.formats?.small?.url ||
        featuredProduct?.image?.[0]?.url ||
        "";

    return (
        <main className="home">
            {/* =========================
          HERO
      ========================== */}

            <section className="home-hero">
                <img
                    src={matchaBackground}
                    alt=""
                    className="home-hero-background"
                />

                <div className="home-hero-overlay" />

                {/* floating doodles */}
                <div className="hero-doodle hero-doodle-one">✿</div>
                <div className="hero-doodle hero-doodle-two">✦</div>
                <div className="hero-doodle hero-doodle-three">♡</div>

                {/* hero text */}
                <div className="home-hero-content">
                    <span className="hero-label">
                        SOLONY STATIONERY
                    </span>

                    <h1>
                        little things
                        <span>for brighter ideas.</span>
                    </h1>

                    <p>
                        Soft stationery for quiet study days,
                        creative moments and all the little plans
                        in between.
                    </p>

                    <Link
                        to="/shop"
                        className="hero-button"
                    >
                        explore solony
                        <ArrowRight size={17} />
                    </Link>
                </div>

                {/* =========================
            FEATURED PRODUCT FRAME
        ========================== */}

                {featuredProduct && (
                    <div className="featured-floating-card">
                        <span className="featured-label">
                            featured pick ♡
                        </span>

                        <Link
                            to={`/products/${featuredProduct.documentId}`}
                            className="featured-product"
                        >
                            <div className="featured-image">
                                {featuredImage ? (
                                    <img
                                        src={featuredImage}
                                        alt={featuredProduct.name}
                                    />
                                ) : (
                                    <div className="featured-no-image">
                                        no image
                                    </div>
                                )}
                            </div>

                            <div className="featured-info">
                                <div>
                                    <h3>
                                        {featuredProduct.name}
                                    </h3>

                                    <p>
                                        $
                                        {Number(
                                            featuredProduct.price
                                        ).toFixed(2)}
                                    </p>
                                </div>

                                <span className="featured-arrow">
                                    →
                                </span>
                            </div>
                        </Link>

                        <div className="featured-dots">
                            {featuredProducts.map(
                                (product, index) => (
                                    <button
                                        type="button"
                                        key={product.documentId}
                                        className={
                                            index === featuredIndex
                                                ? "featured-dot active"
                                                : "featured-dot"
                                        }
                                        onClick={() =>
                                            setFeaturedIndex(index)
                                        }
                                        aria-label={`Show ${product.name}`}
                                    />
                                )
                            )}
                        </div>
                    </div>
                )}

                <div className="scroll-indicator">
                    <span />
                    scroll slowly
                </div>
            </section>

            {/* =========================
          MINI SHOP NAV
      ========================== */}

            <section className="home-mini-nav">
                <Link to="/shop">
                    all stationery
                </Link>

                <Link to="/shop">
                    new arrivals
                </Link>

                <Link to="/shop?category=Notebooks">
                    notebooks
                </Link>

                <Link to="/shop?category=Pens">
                    pens
                </Link>

                <Link to="/shop?category=Planners">
                    planners
                </Link>
            </section>

            {/* =========================
          CATEGORIES
      ========================== */}

            <section className="home-categories reveal">
                <div className="section-intro">
                    <span>
                        01 · FIND YOUR FAVORITE
                    </span>

                    <h2>
                        stationery for
                        <br />

                        <em>
                            every little mood.
                        </em>
                    </h2>
                </div>

                <div className="category-grid">
                    {categories.map(
                        (category, index) => (
                            <Link
                                key={category.name}
                                to={category.path}
                                className="category-card"
                            >
                                <div className="category-number">
                                    0{index + 1}
                                </div>

                                <div className="category-symbol">
                                    {category.symbol}
                                </div>

                                <div>
                                    <h3>
                                        {category.name}
                                    </h3>

                                    <p>
                                        {category.description}
                                    </p>
                                </div>

                                <div className="category-arrow">
                                    →
                                </div>
                            </Link>
                        )
                    )}
                </div>
            </section>

            {/* =========================
          PRODUCTS
      ========================== */}

            {products.length > 0 && (
                <section className="home-products reveal">
                    <div className="section-header">
                        <div>
                            <span>
                                02 · OUR LITTLE FAVORITES
                            </span>

                            <h2>
                                things we're
                                <em> loving lately ♡</em>
                            </h2>
                        </div>

                        <Link
                            to="/shop"
                            className="simple-link"
                        >
                            see everything
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="product-grid">
                        {products.map((product) => (
                            <ProductCard
                                key={product.documentId}
                                product={product}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* =========================
          COZY STORY
      ========================== */}

            <section className="home-story reveal">
                <div className="story-art">
                    <div className="story-paper" />

                    <div className="story-note">
                        <span>
                            a little reminder
                        </span>

                        <strong>
                            slow down.
                            <br />
                            write it down.
                            <br />
                            make it yours.
                        </strong>

                        <div className="story-heart">
                            ♡
                        </div>
                    </div>
                </div>

                <div className="story-content">
                    <span>
                        03 · A QUIET CORNER
                    </span>

                    <h2>
                        calm desk.
                        <br />

                        clear mind.
                        <br />

                        <em>
                            better ideas.
                        </em>
                    </h2>

                    <p>
                        Solony is for the small everyday
                        routines that make life feel a little
                        softer — studying, planning, drawing,
                        writing and creating at your own pace.
                    </p>

                    <Link
                        to="/about"
                        className="simple-link"
                    >
                        our little story

                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            {/* =========================
          FINAL CTA
      ========================== */}

            <section className="home-final reveal">
                <Sparkles size={23} />

                <span>
                    SOLONY · EVERYDAY STATIONERY
                </span>

                <h2>
                    make a little space
                    <br />

                    <em>
                        for your next idea.
                    </em>
                </h2>

                <Link
                    to="/shop"
                    className="final-button"
                >
                    find something lovely

                    <ArrowRight size={17} />
                </Link>
            </section>
        </main>
    );
}