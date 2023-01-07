import { IImage } from "@libs/types";
import Link from "next/link";
import LinesEllipsis from "react-lines-ellipsis";
import StrapiImage from "../strapiImage";
import Button from "./button";

interface ITextColumnProps {
  title: string;
  description: string;
}

interface IImageColumnProps {
  image: IImage;
}

export interface IGridCardProps {
  text: ITextColumnProps;
  image: IImage;
  href: string;
  reversed?: boolean;
  responsible?: boolean;
}

const ImageColumn = ({ image }: IImageColumnProps) => {
  return (
    <div className="aspect-square w-full max-h-full overflow-hidden relative flex justify-center items-center">
      <StrapiImage
        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
        image={image}
      />
    </div>
  );
};

const TextColumn = ({ title, description }: ITextColumnProps) => {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <h5 className="mb-1 inline-block relative">
          {title}
          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue group-hover:w-full transition-all duration-300" />
        </h5>
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
  );
};

export default function GridCard({ text, image, href }: IGridCardProps) {
  return (
    <div className="flex flex-col h-full">
      <Link href={href} className="group">
        <ImageColumn image={image} /> <TextColumn {...text} />
      </Link>
    </div>
  );
}
