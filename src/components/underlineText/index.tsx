import { motion } from "framer-motion";
import type { Target, Transition as FramerTransition } from "framer-motion";

interface Props {
  text: string;
  initial?: Target;
  animate?: Target;
  whileInView?: Target;
  viewport?: { once?: boolean; amount?: number | "some" | "all" };
  transition?: FramerTransition;
  className?: string;
  markerClassName?: string;
}

const defaultMarkerVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, originX: 0 },
};

function UnderlineText({
  text,
  initial,
  animate,
  whileInView,
  viewport = { once: true },
  transition = { duration: 0.5, ease: "easeInOut" },
  className,
  markerClassName,
}: Props) {
  const baseInitialStyle = { ...defaultMarkerVariants.hidden, ...initial };
  const baseVisibleStyle = defaultMarkerVariants.visible;

  const animateProps = animate ? { ...baseVisibleStyle, ...animate } : undefined;
  const whileInViewProps = !animate ? { ...baseVisibleStyle, ...whileInView } : undefined;

  return (
    <span className={`relative inline-block ${className || ""}`}>
      <motion.span
        className={`absolute left-0 top-0 w-full h-full bg-blue-200 rounded-sm origin-left z-0 ${markerClassName || ""}`}
        initial={baseInitialStyle}
        animate={animateProps}
        whileInView={whileInViewProps}
        viewport={viewport}
        transition={transition}
      />
      <span className="relative z-10">{text}</span>
    </span>
  );
}

export default UnderlineText;
