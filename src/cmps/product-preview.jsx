import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/actions/cart.actions";

export function ProductPreview({ product }) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const updatedProduct = { ...product, quantity: quantity };
  //   dispatch(addItem(updatedProduct));
  // }, [quantity, dispatch, product]);


  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity)
      const updatedProduct = { ...product, quantity: newQuantity };
      dispatch(addItem(updatedProduct));
    }
  }

  return (
    <div className="preview-card">
      <p className="product-name">{product.product_name}</p>
      <p className="product-price">{product.price}</p>
      <div className="quantity-controls">
        <button onClick={() => handleUpdateQuantity(quantity - 1)}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => handleUpdateQuantity(quantity + 1)}>
          +
        </button>
      </div>
    </div>
  );
}