import PageTitle from "@components/shared/pageTitle";
import StrapiImage from "@components/strapiImage";
import { IBlock, IImage } from "@libs/types";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export interface ITimelineProps extends IBlock {
  intro: {
    title: string;
  };

  items: {
    id: number;
    title: string;
    description: string;
    label: string;
    link: string;
    image: { data: IImage };
  }[];
}

interface ISectionProps {
  item: {
    id: number;
    title: string;
    description: string;
    label: string;
    link?: string;
    image: { data: IImage };
  };
  setLabel: Dispatch<SetStateAction<string>>;
}

const Section = ({ item, setLabel }: ISectionProps) => {
  const labelRef = useRef(null);
  const labelInView = useInView(labelRef);

  useEffect(() => {
    if (!labelInView) return;
    setLabel(item.label);
  }, [labelInView]);

  return (
    <motion.section
      id={item.label}
      key={item.id}
      className="flex flex-col relative justify-center items-center w-full min-h-screen snap-center p-5 text-white"
    >
      <div className="flex flex-col justify-center items-center max-w-xl">
        <h3 className="bg-blue p-3 mb-4">{item.title}</h3>
        <h4
          ref={labelRef}
          className="bg-blue p-3 mb-4 sm:opacity-0 sm:invisible sm:p-0 sm:m-0"
        >
          {item.label}
        </h4>

        <p className="flex flex-col bg-blue p-3 mb-10">{item.description}</p>

        {item.link && (
          <div className="flex justify-end items-center">
            <Link
              className="text-blue border-blue border-2 px-3 py-1 font-sans font-bold"
              href={item.link}
            >
              READ MORE
            </Link>
          </div>
        )}
      </div>
      {/* BGIMAGE */}
      <AnimatePresence>
        {labelInView && (
          <motion.div
            key={item.label + "bg"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 -z-10 w-full h-screen"
          >
            <div className="w-full h-full bg-[rgba(255,255,255,0.2)] absolute top-0 left-0" />

            <StrapiImage
              image={item.image.data}
              className="object-cover w-full h-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default function Timeline({ intro, items }: ITimelineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const [label, setLabel] = useState(items[0].label);

  return (
    <div className="w-full" ref={ref}>
      <section className="flex flex-col relative justify-center items-center w-full h-screen">
        <h3 className="bg-blue text-white p-3">{intro.title}</h3>
      </section>
      <div className="relative w-full">
        {/* LABELS */}
        <AnimatePresence>
          {isInView && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-0 right-5 h-screen pt-[20vh] flex flex-col justify-start items-center z-10 invisible opacity-0 sm:visible sm:opacity-100"
            >
              <ul className="bg-white rounded-lg p-2 drop-shadow-lg">
                {items.map((item) => (
                  <li
                    key={item.id + "label"}
                    className="p-1 relative text-center"
                  >
                    <a href={`#${item.label}`}>{item.label}</a>
                    {label === item.label && (
                      <motion.div
                        className="w-full h-1 bg-orange absolute bottom-0 left-0"
                        key="labelBar"
                        layoutId="labelBar"
                      />
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {items.map((item) => (
          <Section item={item} key={item.id} setLabel={setLabel} />
        ))}
      </div>
    </div>
  );
}
