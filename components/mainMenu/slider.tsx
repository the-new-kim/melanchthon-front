import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ISliderProps {
  children: ReactNode;
  index: number;
  linkId: string;
}

export default function Slider({ children, index, linkId }: ISliderProps) {
  return (
    <motion.li
      key={linkId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: index * 0.05 } }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.li>
  );
}
