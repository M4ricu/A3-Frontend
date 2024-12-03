import { motion } from "framer-motion";
import { Music } from "lucide-react";

/**
 * AnimatedMusicIcon component displays a loading animation based on a music icon.
 * The animation involves scaling and rotating the icon.
 */
function AnimatedMusicIcon() {
	return (
		<motion.div
			animate={{
				rotate: 360, // Rotates the icon 360 degrees
				transition: {
					duration: 1.5, // Animation duration
					ease: "linear", // Linear easing for smooth rotation
					repeat: Number.POSITIVE_INFINITY, // Repeats indefinitely
				},
			}}
			style={{ display: "inline-block" }}
		>
			<Music className="h-8 w-8 text-primary" />
		</motion.div>
	);
}

export default AnimatedMusicIcon;
