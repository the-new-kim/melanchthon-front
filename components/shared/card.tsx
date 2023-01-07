import StrapiImage from "@components/strapiImage";
import { IImage } from "@libs/types";
import Link from "next/link";
import LinesEllipsis from "react-lines-ellipsis";

interface ICardProps {
  image: IImage;
  title: string;
  description: string;
  date: string;
  location: string;
  href: string;
}

export default function Card({
  image,
  title,
  description,
  date,
  location,
  href,
}: ICardProps) {
  return (
    <Link href={href} className="flex flex-col md:flex-row items-center group">
      {/* IMAGE */}

      <div className="md:w-[50%] mb-5 md:mb-0 overflow-hidden">
        <StrapiImage
          image={image}
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* TEXT */}

      <div className="flex flex-col md:justify-center w-full md:px-10 md:max-w-[50%]">
        {/* TITLE & DATE */}
        <div className="mb-5">
          <h3>{title}</h3>
          {(date || location) && (
            <div className="font-serif">
              {date && <span className="mr-3">{date}</span>}
              {location && <span>{location}</span>}
            </div>
          )}
        </div>

        {/* DESCRIPTION */}

        {description && (
          <LinesEllipsis
            className="font-serif mb-1 text-sm"
            text={description}
            maxLine="5"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        )}

        <span className="mt-10 text-sm font-serif">READ MORE</span>
      </div>
    </Link>
  );
}
