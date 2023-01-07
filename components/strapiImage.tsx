import { IImage } from "@libs/types";
import Image from "next/image";

interface IStrapiImageProps {
  image: IImage;
  className?: string;
}

export default function StrapiImage({ image, className }: IStrapiImageProps) {
  return (
    <>
      <Image
        className={className}
        src={image.attributes.url}
        width={image.attributes.width}
        height={image.attributes.height}
        alt={image.attributes.alternativeText || image.attributes.name}
        priority
      />
    </>
  );
}
