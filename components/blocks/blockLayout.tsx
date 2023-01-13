import { fadeInVariants } from "@libs/motionVariants";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cls } from "@libs/utils";
interface IBlockLayout {
  children: ReactNode;

  className?: string;
}

export default function BlockLayout({ children, className }: IBlockLayout) {
  return (
    <motion.section
      variants={fadeInVariants}
      initial="initial"
      whileInView="animate"
      className={cls(className ? className : "p-3 pt-20")}
    >
      {children}
    </motion.section>
  );
}
