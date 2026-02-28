import { motion, useAnimation } from "framer-motion";
import { useRef } from "react";

/**
 * SlingshotItem
 * - Drag the item; if released with enough offset or velocity it will fly
 *   toward the element with id="cart" and call `onAdd(item)`.
 */
export default function SlingshotItem({ item, onAdd }) {
	const controls = useAnimation();
	const ref = useRef(null);

	const handleDragEnd = async (event, info) => {
		// use offset (movement while dragging) rather than absolute pointer
		const distance = Math.hypot(info.offset.x, info.offset.y);
		const velocity = Math.hypot(info.velocity.x, info.velocity.y || 0);

		// thresholds - tweak if needed
		const DISTANCE_THRESHOLD = 120;
		const VELOCITY_THRESHOLD = 800;

		if (distance > DISTANCE_THRESHOLD || velocity > VELOCITY_THRESHOLD) {
			const cartEl = document.getElementById("cart");

			// fallback target: center of viewport
			let targetX = window.innerWidth / 2;
			let targetY = window.innerHeight / 2;

			const el = ref.current;
			if (!el) return;

			const fromRect = el.getBoundingClientRect();

			if (cartEl) {
				const toRect = cartEl.getBoundingClientRect();
				targetX = toRect.left + toRect.width / 2;
				targetY = toRect.top + toRect.height / 2;
			}

			const fromX = fromRect.left + fromRect.width / 2;
			const fromY = fromRect.top + fromRect.height / 2;

			const deltaX = targetX - fromX;
			const deltaY = targetY - fromY;

			await controls.start({
				x: deltaX,
				y: deltaY,
				scale: 0.5,
				rotate: 360,
				transition: { duration: 0.6, ease: "easeIn" },
			});

			if (typeof onAdd === "function") onAdd(item);

			// reset position so item is usable again
			controls.set({ x: 0, y: 0, scale: 1, rotate: 0 });
		} else {
			// snap back
			controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 300 } });
		}
	};

	return (
		<motion.div
			ref={ref}
			className="shopping-item"
			drag
			dragElastic={0.2}
			animate={controls}
			onDragEnd={handleDragEnd}
			whileTap={{ cursor: "grabbing" }}
			whileDrag={{ scale: 1.05 }}
		>
			<img src={item.image} alt={item.name} className="shopping-image" />
			<p className="shopping-label">{item.name}</p>
		</motion.div>
	);
}

