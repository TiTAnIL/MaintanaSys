import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/actions/cart.actions";

// component to display the product preview and the quantity controls
// the productPreview component gets the product from the productList component and renders it
// the productPreview component also has the quantity controls, which update the quantity
// when quantity of chosen product is updated, the productPreview component will send the product and its quantity to the productList component
// the productList component will then send the product and its quantity to the cart component
// each product card has a quantity input, which is set to 0 by default
// when the user clicks on the + button, the quantity will increase by 1
// when the user clicks on the - button, the quantity will decrease by 1
// when the user clicks on the add to cart button, the product and its quantity, the chosen site and the user will be sent to the cart component
// the quantity can be 0 but no less than 0
// each product card has name, price, quantity controls, quantity input and addToCart button

// quantity 


export function ProductPreview({ product }) {

  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    setQuantity(0)
  }, [product])

  const handleUpdateQuantity = (quantity) => {
    if (quantity < 0) return
    setQuantity(quantity)
  }


  const onAddToCart = (quantity) => {
    const updatedProduct = { ...product, quantity }
    dispatch(addItem(updatedProduct))
  }

  return (
    <div className="preview-card">
      <div className="preview-card-container">
        <div className="preview-card-header">
          <h3>{product.product_name}</h3>
          <h3>{product.price}₪</h3>
        </div>
        <div className="preview-card-body">
          <div className="quantity-controls">
            <button onClick={() => handleUpdateQuantity(quantity + 1)}>+</button>
            <input type="number" value={quantity} onChange={(event) => handleUpdateQuantity(+event.target.value)} />
            <button onClick={() => handleUpdateQuantity(quantity - 1)}>-</button>
          </div>
          <button className="add-to-cart-btn" onClick={() => onAddToCart(quantity)}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}
