import { motion } from "framer-motion";
import "./ShoppingList.css";
import SlingshotItem from "./SlingshotItem";

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

export default function ShoppingList({ onAdd }) {
  return (
    <div className="shopping-container">
      {items.map((item) => (
        <SlingshotItem key={item.id} item={item} onAdd={onAdd} />
      ))}
    </div>
  );
}