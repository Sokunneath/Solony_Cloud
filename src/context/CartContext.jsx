import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const savedCart =
            localStorage.getItem("solony-cart");

        return savedCart
            ? JSON.parse(savedCart)
            : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "solony-cart",
            JSON.stringify(cart)
        );
    }, [cart]);

    function addToCart(product) {
        setCart((currentCart) => {
            const existing = currentCart.find(
                (item) =>
                    item.documentId === product.documentId
            );

            if (existing) {
                return currentCart.map((item) =>
                    item.documentId === product.documentId
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                );
            }

            return [
                ...currentCart,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        });
    }

    function increaseQuantity(documentId) {
        setCart((currentCart) =>
            currentCart.map((item) =>
                item.documentId === documentId
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    }

    function decreaseQuantity(documentId) {
        setCart((currentCart) =>
            currentCart
                .map((item) =>
                    item.documentId === documentId
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    function removeFromCart(documentId) {
        setCart((currentCart) =>
            currentCart.filter(
                (item) =>
                    item.documentId !== documentId
            )
        );
    }

    function clearCart() {
        setCart([]);
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}