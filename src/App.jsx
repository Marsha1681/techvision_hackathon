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

  function addToCart(item) {
    setCartItems((prev) => [...prev, item]);
  }

  return (
    <>
      <div id="container">
        <div id="total-badge">${total.toFixed(2)}</div>
        <div id="item-list">
            <h2>Browse Items</h2>
            <ShoppingList onAddToCart={addToCart} />
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
    </>
  )
}

export default App

