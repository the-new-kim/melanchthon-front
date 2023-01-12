import StrapiImage from "@components/strapiImage";
import { IBlock, IButton, IImage } from "@libs/types";
import Link from "next/link";
import { useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import BlockLayout from "./blockLayout";
import { AnimatePresence, motion } from "framer-motion";
import { cls } from "@libs/utils";

export interface IImageCarouselProps extends IBlock {
  images: {
    id: number;
    button: IButton;
    description: string;
    title: string;
    image: { data: IImage };
  }[];
}

export default function ImageCarousel({ images }: IImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onBtnClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <BlockLayout>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-11 relative flex justify-center items-center">
          <div className="relative w-full max-w-4xl h-full flex justify-center items-center aspect-video overflow-hidden">
            <AnimatePresence initial={false}>
              {images.map(
                (item, index) =>
                  index === currentIndex && (
                    <motion.div
                      key={`${item}${index}`}
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: "0%", opacity: 1 }}
                      exit={{ x: "100%", opacity: 0 }}
                      transition={{ type: "tween", duration: 1 }}
                      className="w-full h-full absolute top-0 left-0"
                    >
                      <StrapiImage
                        image={item.image.data}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 left-0 p-5 flex flex-col justify-between items-start h-full w-full">
                        <h3 className="bg-blue text-white py-1 px-2 sm:py-2 sm:px-3 mb-10">
                          {item.title}
                        </h3>
                        <div className="text-white flex justify-end lg:justify-between items-end w-full">
                          <LinesEllipsis
                            className="max-w-lg bg-blue p-3 invisible hidden lg:visible lg:block text-sm"
                            text={item.description}
                            maxLine="4"
                            ellipsis="..."
                            trimRight
                            basedOn="letters"
                          />

                          <Link
                            className="bg-blue p-3 text-xs sm:text-sm"
                            href={item.button.link}
                          >
                            {item.button.label}
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="hidden md:flex  md:col-start-12 justify-center items-end w-full">
          <div className="font-sans">
            {currentIndex + 1}/{images.length}
          </div>
        </div>
        <ul className="flex justify-between w-full col-span-12 mt-1">
          {images.map((item, index) => (
            <li
              onClick={() => onBtnClick(index)}
              key={item.id + "btn"}
              className={`bg-slate-200 h-2 w-full cursor-pointer relative overflow-hidden ${cls(
                index === 0 ? "" : "ml-1"
              )}`}
            >
              {currentIndex === index && (
                <motion.div
                  key="carouselBar"
                  layoutId="carouselBar"
                  className="w-full h-full bg-orange absolute top-0 left-0"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </BlockLayout>
  );
}