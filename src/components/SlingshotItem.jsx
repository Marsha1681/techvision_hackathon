import { motion, useAnimation } from "framer-motion";
import { useRef } from "react";

export default function SlingshotItem({ item, onAdd }) {
  const controls = useAnimation();
  const ref = useRef(null);

  const handleDragEnd = async (event, info) => {
    const element = ref.current;
    if (!element) return;

    // Only allow left drag
    if (info.offset.x > -20) {
      controls.start({ x: 0, y: 0 });
      return;
    }

    // Use velocity to determine throw direction
    const throwX = info.velocity.x * 0.4;
    const throwY = info.velocity.y * 0.4 + 150; // add slight gravity downwards

    await controls.start({
      x: throwX,
      y: throwY,
      transition: { duration: 0.8, ease: "easeOut" },
    });

    // Check collision AFTER throw
    const cart = document.getElementById("cart");
    if (cart) {
      const itemRect = element.getBoundingClientRect();
      const cartRect = cart.getBoundingClientRect();

      const hit =
        itemRect.right > cartRect.left &&
        itemRect.left < cartRect.right &&
        itemRect.bottom > cartRect.top &&
        itemRect.top < cartRect.bottom;

      if (hit && onAdd) {
        onAdd(item);
      }
    }

    // Reset back to list
    controls.set({ x: 0, y: 0 });
  };

  return (
    <div className="shopping-item">
      {/* ICON ONLY DRAGS */}
      <motion.img
        ref={ref}
        src={item.image}
        alt={item.name}
        className="shopping-image"
        drag
        dragConstraints={{ left: -200, right: 0, top: -100, bottom: 100 }}
        dragElastic={0.1}
        animate={controls}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
      />

      {/* TEXT STAYS IN LIST */}
      <p className="shopping-label">{item.name}</p>
    </div>
  );
}