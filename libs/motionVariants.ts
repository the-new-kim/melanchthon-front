import { Variants } from "framer-motion";

export const fadeInVariants: Variants = {
  initial: { opacity: 0 },
  animate: (custom: number = 0) => ({
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
};
