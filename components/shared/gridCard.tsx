import { IImage } from "@libs/types";
import Link from "next/link";
import LinesEllipsis from "react-lines-ellipsis";
import StrapiImage from "../strapiImage";

export interface IGridCardProps {
  title: string;
  description: string;
  image: IImage;
  href: string;
  reversed?: boolean;
  responsible?: boolean;
}

export default function GridCard({
  title,
  description,
  image,
  href,
}: IGridCardProps) {
  return (
    <div className="flex flex-col h-full">
      <Link href={href} className="group">
        {/* IMAGE */}
        <div className="aspect-square w-full max-h-full overflow-hidden relative flex justify-center items-center">
          <StrapiImage
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
            image={image}
          />
        </div>
        {/* TEXT */}
        <div className="flex flex-col justify-between mt-1">
          <div>
            <h4 className="mb-1 inline-block relative leading-none">
              {title}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue group-hover:w-full transition-all duration-300" />
            </h4>
            <LinesEllipsis
              className="font-serif mb-1 text-sm"
              text={description}
              maxLine="3"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
