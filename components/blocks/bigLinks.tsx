import SplitText from "@components/typo/splitText";
import { fadeInVariants } from "@libs/motionVariants";
import { IBlock, ILink } from "@libs/types";
import { Variants, motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import BlockLayout from "./blockLayout";
import { ArrowRight } from "phosphor-react";

const barVariants: Variants = {
  initial: { x: "-100%" },
  animate: { x: "0%" },
  exit: { x: "100%" },
};

const arrowVariants: Variants = {
  initial: { x: "-100%", opacity: 0 },
  animate: { x: "0%", opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};

const BigLink = ({ ...link }: ILink) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <li
      key={link.id}
      className="text-[10vw] lg:text-7xl leading-none mb-1 relative flex"
    >
      <Link
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
        href={link.page.data?.attributes.url}
        className="relative inline-flex overflow-hidden"
      >
        <SplitText text={link.label} scroll />
        <AnimatePresence>
          {mouseEnter && (
            <motion.div
              key={link.id + "bar"}
              variants={barVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "tween" }}
              className="absolute w-full h-[1px] bottom-0 left-0 bg-white"
            />
          )}
        </AnimatePresence>
      </Link>
      <div className="h-full flex justify-center items-center relative overflow-hidden">
        <AnimatePresence>
          {mouseEnter && (
            <motion.div
              key={link.id + "arrow"}
              variants={arrowVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "tween" }}
            >
              <ArrowRight weight="thin" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
};

export interface IBigLinksProps extends IBlock {
  links: ILink[];
}

export default function BigLinks({ links }: IBigLinksProps) {
  return (
    <BlockLayout>
      <motion.ul
        variants={fadeInVariants}
        initial="initial"
        whileInView="animate"
        className="bg-blue text-white p-5"
      >
        {links.map((link) => (
          <BigLink key={link.id} {...link} />
        ))}
      </motion.ul>
    </BlockLayout>
  );
}
