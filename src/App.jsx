import ShoppingList from "./components/ShoppingList";
import { motion } from "framer-motion";
import './App.css'

function App() {
  const vWidth = window.innerWidth;
  const vHeight = window.innerHeight;

  return (
    <>
      <div id="container">
        <div id="item-list">
            <h2>Browse Items</h2>
            <ShoppingList />
        </div>
        <div>
          <motion.img
            id="cart"
            src="/shopping-cart.png"
            alt="Shopping cart image"
            initial={{ x: 0, y: vHeight - 300 }}
            animate={{ x: [0, vWidth - 600, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
          />
        </div>
      </div>
    </>
  )
}

export default App

