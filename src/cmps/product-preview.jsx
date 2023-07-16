import { useState } from "react";

export function ProductPreview({ product }) {
    const [quantity, setQuantity] = useState(0);

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="preview-card">
            <p className="product-name">{product.product_name}</p>
            <p className="product-price">{product.price}</p>
            <div className="quantity-controls">
                <button onClick={handleDecrease}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncrease}>+</button>
            </div>
        </div>
    );
}