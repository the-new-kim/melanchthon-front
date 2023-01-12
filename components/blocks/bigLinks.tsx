import { fadeInVariants } from "@libs/motionVariants";
import { IBlock, ILink } from "@libs/types";
import { Variants, motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import BlockLayout from "./blockLayout";
import { ArrowRight } from "phosphor-react";
import { cls } from "@libs/utils";

const underlineVariants: Variants = {
  initial: { x: "-100%" },
  animate: { x: "0%" },
  exit: { x: "100%" },
};

const arrowVariants: Variants = {
  initial: { x: "-100%", opacity: 0 },
  animate: { x: "0%", opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};

interface IBigLinkProps extends ILink {
  index: number;
}

const BigLink = ({ ...link }: IBigLinkProps) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <li
      key={link.id}
      className={`${cls(
        link.index === 0 ? "" : "mt-3"
      )} text-lg sm:text-3xl lg:text-5xl leading-none relative flex items-center`}
      // className="text-[10vw] lg:text-7xl leading-none mb-1 relative flex"
    >
      <Link
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
        href={link.href}
        className="relative inline-flex overflow-hidden"
      >
        {link.label}
        {/* <div className="absolute w-full h-[1px] bottom-0 left-0 bg-white" /> */}

        {/* UNDER LINE */}
        <AnimatePresence>
          {mouseEnter && (
            <motion.div
              key={link.id + "underline"}
              variants={underlineVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "tween" }}
              className="absolute w-full h-[1px] bottom-0 left-0 bg-white"
            />
          )}
        </AnimatePresence>
      </Link>

      {/* <div className="md:hidden ml-1">
        <ArrowRight weight="thin" />
      </div> */}

      {/* ARROW */}
      <div className="h-full flex justify-center items-center overflow-hidden ml-1">
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
        {links.map((link, index) => (
          <BigLink key={link.id} {...link} index={index} />
        ))}
      </motion.ul>
    </BlockLayout>
  );
}
