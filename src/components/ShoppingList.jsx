import { motion } from "framer-motion";
import "./ShoppingList.css";
import SlingshotItem from "./SlingshotItem";

const items = [
  { id: 1, name: "Dress", price: 29.99, image: "/dress.png" },
  { id: 2, name: "Earring", price: 14.99, image: "/earring.png" },
  { id: 3, name: "Purse", price: 39.99, image: "/purse.png" },
  { id: 4, name: "Shoes", price: 59.99, image: "/shoes.png" },
  { id: 5, name: "Necklace", price: 24.99, image: "/necklace.png" },
  { id: 6, name: "Skirt", price: 19.99, image: "/skirt.png" },
  { id: 7, name: "Coat", price: 49.99, image: "/coat.png" },
  { id: 8, name: "Makeup", price: 12.99, image: "/makeup.png" },
  { id: 9, name: "Scarf", price: 8.99, image: "/scarf.png" },
  { id: 10, name: "Perfume", price: 34.99, image: "/perfume.png" },
];

export default function ShoppingList({ onAddToCart }) {
  return (
    <div className="shopping-container">
      {items.map((item) => (
        <SlingshotItem key={item.id} item={item} onAdd={onAddToCart} />
      ))}
    </div>
  );
}