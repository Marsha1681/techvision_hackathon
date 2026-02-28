// src/components/Cart.jsx
import "./Cart.css";

function Cart({ items }) {
    const MAX_ITEMS = 8;
    const isFull = items.length >= MAX_ITEMS;

  return (
    <div id="cart">
      <div id="cart-stack">
        {items.slice(0, MAX_ITEMS).map((item, index) => (
          <div
            key={index}
            className="cart-item"
            style={{
              bottom: index * 18,
              transform: `rotate(${((index * 137) % 21) - 10}deg)`,
              zIndex: index,
            }}
          >
            <img src={item.image} alt={item.name} style={{ width: 50, height: 50, objectFit: "contain" }} />
          </div>
        ))}
      </div>
      {isFull && <div className="cart-full">Cart is full!</div>}
    </div>
  );
}

export default Cart;
