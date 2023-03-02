import StrapiImage from "@components/strapiImage";
import useScrolled from "@libs/client/useScrolled";
import { IBlock, IImage, ILink } from "@libs/types";
import { cls } from "@libs/utils";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Link from "next/link";
import { CaretLeft } from "phosphor-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface ITimelineItem {
  id: number;
  title: string;
  label: string;
  description?: string;
  image?: { data: IImage };
  body?: {
    id: number;
    text: string;
  };
  link?: ILink;
}

export interface ITimelineProps extends IBlock {
  intro: {
    title: string;
  };

  items: ITimelineItem[];
}

interface ISectionProps {
  item: ITimelineItem;
  currentItemId: number;
  setcurrentItemId: Dispatch<SetStateAction<number>>;
}

const Section = ({ item, currentItemId, setcurrentItemId }: ISectionProps) => {
  const centerRef = useRef(null);
  const centerInView = useInView(centerRef);

  useEffect(() => {
    if (!centerInView) return;
    setcurrentItemId(item.id);
  }, [centerInView]);

  return (
    <motion.section
      id={item.title.toLowerCase().replaceAll(" ", "-")}
      key={item.id}
      className="flex flex-col relative justify-center items-center w-full min-h-screen snap-center py-32 text-white"
    >
      <div className="flex flex-col justify-center items-center max-w-5xl">
        <h3 className="bg-blue p-3 mb-4">{item.title}</h3>
        {item.label && (
          <h4 className="bg-blue p-3 mb-4 sm:opacity-0 sm:invisible sm:p-0 sm:m-0">
            {item.label}
          </h4>
        )}

        {item.description && (
          <p className="flex flex-col bg-blue p-3 mb-10">{item.description}</p>
        )}

        {item.body && (
          <div
            className="bg-blue py-2 px-3 mb-4"
            dangerouslySetInnerHTML={{ __html: item.body.text }}
          />
        )}

        {item.link && (
          <div className="flex justify-end items-center">
            <Link
              className="text-blue border-blue border-2 px-3 py-1 font-sans font-bold"
              href={item.link.href}
            >
              READ MORE
            </Link>
          </div>
        )}
      </div>
      {/* BGIMAGE */}
      {item.image && item.image.data && (
        <AnimatePresence>
          {currentItemId === item.id && (
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
      )}

      {/* CENTER (IN VIEW TRIGGER) */}
      <div className="absolute w-full h-full flex justify-center items-center -z-50">
        <div className="w-full h-[93%] opacity-0 bg-red-700" ref={centerRef} />
      </div>
    </motion.section>
  );
};

export default function Timeline({ intro, items }: ITimelineProps) {
  const [currentItemId, setcurrentItemId] = useState(items[0].id);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const scrolled = useScrolled(100);
  const [navOpen, setNavOpen] = useState(false);

  const toggleNavOpen = () => {
    setNavOpen((prev) => !prev);
  };

  useEffect(() => {
    setcurrentItemId(items[0].id);
  }, [items]);

  return (
    <div className="w-full px-3" ref={ref}>
      <section className="flex flex-col relative justify-center items-center w-full h-screen">
        <h3 className="bg-blue text-white p-3">{intro.title}</h3>
      </section>
      <div className="relative w-full">
        {/* NAV */}
        <AnimatePresence>
          {isInView && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`fixed right-5 top-0 m-auto rounded-lg h-fit flex items-center z-50
              backdrop-blur-3xl bg-white/10 transition-transform duration-300
              ${cls(
                scrolled ? "translate-y-3" : "translate-y-10 md:translate-y-20"
              )}
              `}
            >
              {/* DROP SHADOW */}
              <div className="absolute w-full h-full drop-shadow-2xl bg-white opacity-70 rounded-lg -z-10" />
              {/* ARROW */}

              <button className="pl-2" onClick={toggleNavOpen}>
                <CaretLeft
                  weight="bold"
                  className={`${cls(
                    navOpen ? "rotate-180" : "rotate-0"
                  )} transition-transform duration-300 ease-out`}
                />
              </button>

              {/* NAV LIST  */}
              <ul className="p-2">
                {items.map((item, index) => (
                  <li
                    key={item.id + "title"}
                    className="flex justify-center items-center"
                  >
                    <a
                      href={`#${item.title.toLowerCase().replaceAll(" ", "-")}`}
                      className="relative p-1"
                    >
                      <span>{navOpen ? item.title : index + 1}</span>
                      {currentItemId === item.id && (
                        <motion.div
                          className="w-full h-1 bg-orange absolute bottom-0 left-0"
                          key="underline"
                          layoutId="underline"
                        />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {items.map((item) => (
          <Section
            item={item}
            key={item.id}
            currentItemId={currentItemId}
            setcurrentItemId={setcurrentItemId}
          />
        ))}
      </div>
    </div>
  );
}
