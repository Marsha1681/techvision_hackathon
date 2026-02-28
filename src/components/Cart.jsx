// src/components/Cart.jsx
import "./Cart.css";

function Cart({ items }) {
  return (
    <div id="cart-ui">
      <div id="cart-icon">🛒</div>

      <div id="cart-stack">
        {items.map((item, index) => (
          <div
            key={index}
            className="cart-item"
            style={{
              top: -index * 14,
              transform: `rotate(${index * 4}deg)`,
              zIndex: index + 1,
            }}
          >
            {/* show text (name) in the cart stack */}
            <div className="cart-item-label">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;