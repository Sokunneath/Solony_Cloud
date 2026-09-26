import {
    useEffect,
    useMemo,
    useState,
} from "react";

import { useSearchParams } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";

export default function ShopPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [searchParams] = useSearchParams();

    const category =
        searchParams.get("category");

    useEffect(() => {
        async function loadProducts() {
            try {
                setLoading(true);

                const data =
                    await getProducts();

                setProducts(data);

                setError("");
            } catch (error) {
                console.error(error);

                setError(
                    "We couldn't load the stationery right now."
                );
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    const filteredProducts =
        useMemo(() => {
            return products.filter(
                (product) => {
                    const matchesSearch =
                        product.name
                            ?.toLowerCase()
                            .includes(
                                search.toLowerCase()
                            );

                    const matchesCategory =
                        !category ||
                        product.category === category;

                    return (
                        matchesSearch &&
                        matchesCategory
                    );
                }
            );
        }, [
            products,
            search,
            category,
        ]);

    return (
        <main className="shop-page">
            <section className="shop-heading">
                <span>
                    SOLONY COLLECTION
                </span>

                <h1>
                    find something
                    <em> lovely.</em>
                </h1>

                <p>
                    Little stationery pieces for
                    your everyday ideas.
                </p>
            </section>

            <section className="shop-tools">
                <input
                    type="search"
                    placeholder="search stationery..."
                    value={search}
                    onChange={(event) =>
                        setSearch(
                            event.target.value
                        )
                    }
                />

                {category && (
                    <span className="active-category">
                        {category}
                    </span>
                )}
            </section>

            {loading && (
                <section className="product-grid">
                    {[1, 2, 3, 4].map(
                        (item) => (
                            <div
                                className="skeleton-card"
                                key={item}
                            >
                                <div className="skeleton-image" />

                                <div className="skeleton-body">
                                    <div className="skeleton-line short" />
                                    <div className="skeleton-line" />
                                    <div className="skeleton-line medium" />
                                </div>
                            </div>
                        )
                    )}
                </section>
            )}

            {error && (
                <div className="empty-state">
                    <span>☁</span>

                    <h2>
                        something went wrong
                    </h2>

                    <p>{error}</p>
                </div>
            )}

            {!loading &&
                !error &&
                filteredProducts.length ===
                0 && (
                    <div className="empty-state">
                        <span>✿</span>

                        <h2>
                            nothing here yet
                        </h2>

                        <p>
                            Try another search.
                        </p>
                    </div>
                )}

            {!loading &&
                !error &&
                filteredProducts.length >
                0 && (
                    <section className="product-grid">
                        {filteredProducts.map(
                            (product) => (
                                <ProductCard
                                    key={
                                        product.documentId
                                    }
                                    product={product}
                                />
                            )
                        )}
                    </section>
                )}
        </main>
    );
}