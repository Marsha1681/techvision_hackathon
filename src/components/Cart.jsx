// src/components/Cart.jsx
import "./Cart.css";

function Cart({ items }) {
  return (
    <div id="cart">
      <div id="cart-stack">
        {items.map((item, index) => (
          <div
            key={index}
            className="cart-item"
            style={{
              bottom: index * 18,
              transform: `rotate(${((index * 137) % 21) - 10}deg)`,
              zIndex: index,
            }}
          >
            <img src={item.image} alt={item.name} style={{ width: 30, height: 30, objectFit: "contain" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
