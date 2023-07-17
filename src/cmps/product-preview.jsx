import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { additem, updateitem } from "../store/actions/cart.actions";

export function ProductPreview({ product }) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cartModule);

  useEffect(() => {
    const cartitem = items.find((item) => item.id === product.id);
      if (cartitem) {
      setQuantity(cartitem.quantity);
    }
  }, [items, product.id]);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
    console.log('product', product)
    dispatch(additem({ item: product, quantity: quantity + 1 }));
  };
  
  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      dispatch(updateitem({ item: product, quantity: quantity - 1 }));
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
