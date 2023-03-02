import { Variants } from "framer-motion";

export const fadeInVariants: Variants = {
  initial: { opacity: 0 },
  animate: (custom: number = 0) => ({
    opacity: 1,
    transition: { delay: custom * 0.05 },
  }),
};

export const slideRightIn: Variants = {
  initial: { opacity: 0, x: "-100%" },
  animate: (custom: number = 0) => ({
    opacity: 1,
    x: "0%",
    transition: { delay: custom * 0.05, type: "tween", ease: "easeOut" },
  }),
};
