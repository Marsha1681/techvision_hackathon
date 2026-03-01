import { useState } from "react";
import ShoppingList from "./components/ShoppingList";
import Cart from "./components/Cart";
import { motion } from "framer-motion";
import './App.css'

function App() {
  const [cartItems, setCartItems] = useState([]);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const vWidth = window.innerWidth;
  const vHeight = window.innerHeight;
  const [popup, setPopup] = useState(null);
  const MAX_ITEMS = 8;

  function openPopup(p) {
    setPopup(p);
  }

  function closePopup(){
    setPopup(null);
  }

  function addToCart(item) {
    setCartItems((prev) => {
      if (prev.length >= MAX_ITEMS) return prev;
      return [...prev, item];
  });
  }

  return (
    <>
      <div id="container">
        <div id="topbar">
          <div id="topbar-left">
            <button className="icon-btn" aria-label="Profile">👤</button>
            <button className="icon-btn" aria-label="Cart">🛒</button>
          </div>
          <div id="topbar-right">
            <span id="brand">SlingshotShopping</span>
          </div>
        </div>
        <div id="total-badge">£{total.toFixed(2)}</div>
        <div id="item-list">
            <h2>Browse Items</h2>
            <ShoppingList onAddToCart={(item) => {
              if (cartItems.length >= MAX_ITEMS) {
                return;
              }

              addToCart(item);
              openPopup({
                type: "success",
                title: "added to cart :)",
                text: `${item.name} — £${item.price.toFixed(2)}`
              });
            }}
            onMiss={() =>
              openPopup({
                type: "miss",
                title: "MISS",
                text: "do better lol"
              })
            }
            />
        </div>
      <div>
          <motion.div
            initial={{ x: 0, y: vHeight - 300 }}
            animate={{ x: [0, vWidth - 600, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          >
            <img id="shopcart" src="/shopping-cart.png" alt="Shopping cart" />
            <Cart items={cartItems} />
          </motion.div>
        </div>
        <div className="vacuum-hole vacuum-one"></div>
        <div className="vacuum-hole vacuum-two"></div>
      </div>
      {popup && (
        <div className="popup-overlay">
          <div className={`popup-modal ${popup.type}`}>
            <button
              type="button"
              className="popup-close"
              onClick={closePopup}
              aria-label="Close"
            >
              ×
            </button>

            <h3 className="popup-title">{popup.title}</h3>
            <p className="popup-text">{popup.text}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default App