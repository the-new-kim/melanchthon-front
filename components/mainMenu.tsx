import { IImage, ILinkWrapper } from "@libs/types";
import Image from "next/image";

interface IMainMenuProps {
  logo: IImage;
  links: ILinkWrapper[];
}

export function MainMenu({ logo, links }: IMainMenuProps) {
  return (
    <nav className="fixed top-0 left-0 w-full h-full grid grid-cols-12 pointer-events-none [&>*]:pointer-events-auto">
      <div className="bg-red-200 col-span-2 w-full h-full">
        <Image
          src={logo.attributes.formats.small.url}
          width={logo.attributes.formats.small.width}
          height={logo.attributes.formats.small.height}
          alt={logo.attributes.name}
          priority
        />
        <ul>
          {links.map((link) => (
            <li key={link.id}>{link.label}</li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
