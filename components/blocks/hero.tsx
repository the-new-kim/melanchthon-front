import StrapiImage from "@components/strapiImage";
import { IImage } from "@libs/types";

export interface IHeroProps {
  description: string;
  title: string;
  image: { data: IImage };
}
export default function Hero({ title, description, image }: IHeroProps) {
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col justify-center items-center py-20 px-5">
      <h2 className="bg-blue text-white p-3 mb-5">{title}</h2>
      <p className="bg-blue text-white p-3">{description}</p>
      <div className="absolute top-0 left-0 w-full h-full min-h-screen -z-10">
        <StrapiImage
          image={image.data}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-36 bg-gradient-to-b from-white to-transparent" />
      </div>
    </div>
  );
}
