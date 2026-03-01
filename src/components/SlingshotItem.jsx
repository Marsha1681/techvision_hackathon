import { motion, useAnimation } from "framer-motion";
import { useRef } from "react";
import whooshSound from '../assets/sounds/whoosh.mp3';
import popSound from '../assets/sounds/pop.mp3';
import suctionSound from '../assets/sounds/suction.mp3';

/**
 * SlingshotItem
 * - Drag the item; if released with enough offset it will fly
 *   toward the cart and can also get sucked into the vacuum hole.
 */
export default function SlingshotItem({ item, onAdd, onMiss }) {
	const controls = useAnimation();
	const ref = useRef(null);
	const playSound = (soundFile) => {
		const audio = new Audio(soundFile);
		audio.volume = 0.3; // subtle, not annoying
		audio.play();
	};

	const handleDragEnd = async (event, info) => {
		const distance = Math.hypot(info.offset.x, info.offset.y);
		const DISTANCE_THRESHOLD = 120;

		if (distance > DISTANCE_THRESHOLD) {
			playSound(whooshSound);
			const dx = info.offset.x;
			const dy = info.offset.y;

			const v0x = -dx * 7;
			const v0y = -dy * 7;

			controls.set({ x: 0, y: 0 });
			launchWithGravity(v0x, v0y);
		} else {
            onMiss?.();
			controls.start({
				x: 0,
				y: 0,
				transition: { type: "spring", stiffness: 300 }
			});
		}
	};

	const launchWithGravity = (v0x, v0y) => {
		let start = null;
		let hasAdded = false;
		let hasSucked = false; // NEW FLAG

		const gravity = 2000;
		const startX = 0;
		const startY = 0;

		const animate = (timestamp) => {
			if (hasSucked) return; // STOP EVERYTHING IF SUCKED

			if (!start) start = timestamp;
			const t = (timestamp - start) / 1000;

			const x = startX + v0x * t;
			const y = startY + v0y * t + 0.5 * gravity * t * t;

			controls.set({ x, y });

			const element = ref.current;
			if (!element) return;

			const itemRect = element.getBoundingClientRect();

			//  CART COLLISION
			if (!hasAdded) {
				const cartEl = document.querySelector("#cart-stack");

				if (cartEl) {
					const cartRect = cartEl.getBoundingClientRect();

					const isTouching = !(
						itemRect.right < cartRect.left ||
						itemRect.left > cartRect.right ||
						itemRect.bottom < cartRect.top ||
						itemRect.top > cartRect.bottom
					);

					if (isTouching) {
						hasAdded = true;
						onAdd(item);
						playSound(popSound);
						controls.set({ x: 0, y: 0 });
						return;
					}
				}
			}

			// VACUUM COLLISION
			const vacuums = document.querySelectorAll(".vacuum-hole");

			for (let i = 0; i < vacuums.length; i++) {
				const vacuumRect = vacuums[i].getBoundingClientRect();

				const sucked = !(
					itemRect.right < vacuumRect.left ||
					itemRect.left > vacuumRect.right ||
					itemRect.bottom < vacuumRect.top ||
					itemRect.top > vacuumRect.bottom
				);

				if (sucked) {
					hasSucked = true; // STOP LOOP
					playSound(suctionSound);
					controls
						.start({
							scale: 0,
							opacity: 0,
							transition: { duration: 0.15 }
						})
						.then(() => {
							controls.set({
								x: 0,
								y: 0,
								scale: 1,
								opacity: 1
							});
						});

					return;
				}
			}

			// -----------------------------
			// STOP IF OFF SCREEN
			// -----------------------------
			if (y < window.innerHeight + 200) {
				requestAnimationFrame(animate);
			} else {
                if (!hasAdded) onMiss?.();
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
			<img
				src={item.image}
				alt={item.name}
				className="shopping-image"
			/>
			<p className="shopping-label">{item.name}</p>
		</motion.div>
	);
}