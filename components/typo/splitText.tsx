import { motion, Variant, Variants } from "framer-motion";
import { cls } from "@libs/utils";
import { Dispatch, SetStateAction } from "react";

const parentTransition: Variant = {
  transition: {
    type: "tween",
    staggerChildren: 0.03,
  },
};
const parentVariants: Variants = {
  show: parentTransition,
  hide: parentTransition,
  exit: parentTransition,
};
const childTransition = {
  duration: 0.4,
  ease: "easeOut",
};
const childVariants: Variants = {
  show: {
    y: "0%",
    transition: childTransition,
  },
  hide: {
    y: "100%",
    transition: childTransition,
  },
  exit: {
    y: "-100%",
    transition: childTransition,
  },
};

interface ISplitProps {
  text: string;
  scroll?: boolean;
  setState?: Dispatch<SetStateAction<boolean>>;
  once?: boolean;
}

export default function SplitText({
  text,
  scroll = false,
  setState,
  once = false,
}: ISplitProps) {
  return (
    <motion.span
      variants={parentVariants}
      initial="hide"
      whileInView="show"
      viewport={{ once }}
      className="flex w-fit"
    >
      {text.split("").map((letter, index) => (
        <span key={"text" + index} className="overflow-hidden">
          <motion.span
            key={"text" + index}
            className={cls(
              "h-full flex items-center",
              letter === " " ? "opacity-0" : ""
            )}
            variants={childVariants}
            onAnimationComplete={() =>
              index === text.length - 1 && setState && setState(true)
            }
          >
            {letter === " " ? "'" : letter}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
