import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { motion } from "framer-motion";
import './App.css'

function App() {
  return (
    <>
      <div id="container">
        <div id="item-list">
            <h2>Browse Items</h2>
        </div>
        <div>
          <motion.img
            src="/shopping-cart.png"
            alt="Shopping cart image"
            initial={{ x: 0, y: 0 }}
            animate={{ x: [0, 200, 0] }}
            transition={{
              duration: 2,
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