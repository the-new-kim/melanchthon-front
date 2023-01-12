import SplitText from "@components/typo/splitText";
import { IBlock, ILink } from "@libs/types";
import { useInView, Variants, motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import BlockLayout from "./blockLayout";

const barVariants: Variants = {
  initial: { x: "-100%" },
  animate: { x: "0%" },
  exit: { x: "100%" },
};

const BigLink = ({ ...link }: ILink) => {
  const [mouseEnter, setMouseEnter] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <li
      ref={ref}
      key={link.id}
      className="text-[10vw] lg:text-8xl leading-none mb-1"
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
    </li>
  );
};

export interface IBigLinksProps extends IBlock {
  links: ILink[];
}

export default function BigLinks({ links }: IBigLinksProps) {
  return (
    <BlockLayout>
      <ul className="bg-blue text-white p-5">
        {links.map((link) => (
          <BigLink key={link.id} {...link} />
        ))}
      </ul>
    </BlockLayout>
  );
}
