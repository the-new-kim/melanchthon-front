import StrapiImage from "@components/strapiImage";
import { IImage } from "@libs/types";
import { cls } from "@libs/utils";
import { ReactNode } from "react";

interface ICtaCardProps {
  image: IImage;
  children: ReactNode;
  reverse?: boolean;
}

export default function CtaCard({
  image,
  children,
  reverse = false,
}: ICtaCardProps) {
  return (
    <div
      className={`flex flex-col items-center group ${cls(
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      )}`}
    >
      {/* IMAGE */}
      <div className="md:w-[50%] mb-5 md:mb-0 overflow-hidden">
        <StrapiImage
          image={image}
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* TEXT */}
      <div className="flex flex-col md:justify-center w-full md:px-10 md:max-w-[50%]">
        {children}
      </div>
    </div>
  );
}
