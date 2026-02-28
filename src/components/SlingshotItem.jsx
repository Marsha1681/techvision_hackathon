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

		if (distance > DISTANCE_THRESHOLD) {

			const dx = info.offset.x;
			const dy = info.offset.y;

			const v0x = -dx * 7;
			const v0y = -dy * 7;

			// snap back instantly to base before launch
			controls.set({ x: 0, y: 0 });

			launchWithGravity(v0x, v0y);
		} else {
			// snap back
			controls.start({ x: 0, y: 0, transition: { type: "spring", stiffness: 300 } });
		}
	};

	const launchWithGravity = (v0x, v0y) => {
		let start = null;
		const gravity = 2000; // tweak this
		const startX = 0;
		const startY = 0;

		const animate = (timestamp) => {
			if (!start) start = timestamp;
			const t = (timestamp - start) / 1000; // seconds

			const x = startX + v0x * t;
			const y = startY + v0y * t + 0.5 * gravity * t * t;

			controls.set({ x, y });

			// stop when it falls off screen
			if (y < window.innerHeight + 200) {
				requestAnimationFrame(animate);
			} else {
				controls.set({ x: 0, y: 0 });
			}
		};

		requestAnimationFrame(animate);
	};

	return (
		<motion.div
			ref={ref}
			className="shopping-item"
			drag
			dragMomentum={false}
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