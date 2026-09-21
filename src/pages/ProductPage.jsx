import { useParams } from "react-router-dom";

function ProductPage() {
    const { id } = useParams();

    return (
        <main className="page-container">
            <h1>Product</h1>

            <p>Product ID: {id}</p>
        </main>
    );
}

export default ProductPage;