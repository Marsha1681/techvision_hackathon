import { motion } from "framer-motion";
import "./ShoppingList.css";

const items = [
  { id: 1, name: "Dress", image: "/dress.png" },
  { id: 2, name: "Earring", image: "/earring.png" },
  { id: 3, name: "Purse", image: "/purse.png" },
  { id: 4, name: "Shoes", image: "/shoes.png" },
  { id: 5, name: "Necklace", image: "/necklace.png" },
  { id: 6, name: "Skirt", image: "/skirt.png" },
  { id: 7, name: "Coat", image: "/coat.png" },
  { id: 8, name: "Makeup", image: "/makeup.png" },
  { id: 9, name: "Scarf", image: "/scarf.png" },
  { id: 10, name: "Perfume", image: "/perfume.png" },
];

export default function ShoppingList({onAddToCart}) {
  return (
    <div className="shopping-container">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="shopping-item"
          drag
          onClick={() => onAddToCart(item)}
        >
          <img
            src={item.image}
            alt={item.name}
            className="shopping-image"
          />
          <p className="shopping-label">{item.name}</p>
        </motion.div>
      ))}
    </div>
  );
}