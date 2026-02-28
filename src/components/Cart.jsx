import "./Cart.css";

function Cart({ items }) {
  return (
    <div id="cart">
      <div id="cart-icon"></div>

      <div id="cart-stack">
        {items.map((item, index) => (
          <div
            key={index}
            className="cart-item"
            style={{
              top: -index * 14,
              transform: `rotate(${index * 5}deg)`,
              zIndex: index,
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;