import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCart, removeitem, updateitem } from "../store/actions/cart.actions";

export function ShoppingCart() {
  const { items, isLoading } = useSelector((state) => state.cartModule);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!items || !items.length) {
        console.log('loading items from server')
      dispatch(loadCart());
    }
  }, [dispatch]);

  const handleRemoveitem = (itemId) => {
    dispatch(removeitem(itemId));
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    console.log('update', itemId, quantity)
    console.log('dsjfhdskjfhsdkjfhsdkjfhdsjkfhdsjkfsdk')
    dispatch(updateitem({ itemId, quantity }));
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {isLoading ? (
        <p>Loading cart...</p>
      ) : (
        <>
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  {item.product_name} - {item.price} - Quantity: {item.quantity}
                  <button onClick={() => console.log('item: ', item.item.id,'\n', 'items: ', items)}>test</button>
                  <button onClick={() => handleRemoveitem(item.id)}>Remove</button>
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      <button onClick={() => console.log(items)}>Confirm</button>
    </div>
  );
}
