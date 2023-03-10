import StrapiImage from "@components/strapiImage";
import { fadeInVariants } from "@libs/motionVariants";
import { IBlock, IImage } from "@libs/types";
import { motion } from "framer-motion";
import BlockLayout from "./blockLayout";

export interface IHeroProps extends IBlock {
  description: string;
  title: string;
  image: { data: IImage };
}

export default function Hero({ title, description, image }: IHeroProps) {
  return (
    <BlockLayout className="w-full h-full min-h-screen relative flex flex-col justify-center items-center py-20 px-3">
      {title && (
        <motion.h2
          className="bg-blue text-white p-3 mb-5 max-w-4xl"
          variants={fadeInVariants}
          custom={5}
        >
          {title}
        </motion.h2>
      )}
      {description && (
        <motion.p
          variants={fadeInVariants}
          custom={10}
          className="bg-blue text-white p-3 max-w-5xl"
        >
          {description}
        </motion.p>
      )}
      {image && (
        <motion.div
          variants={fadeInVariants}
          custom={0}
          className="absolute top-0 left-0 w-full h-full min-h-screen -z-10"
        >
          <StrapiImage
            image={image.data}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-36" />
        </motion.div>
      )}
    </BlockLayout>
  );
}
