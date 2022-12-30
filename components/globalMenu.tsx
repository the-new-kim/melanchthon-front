import { IGlobalMenu } from "@libs/types";
import Link from "next/link";

interface IGlobalMenuProps {
  globalMenu: IGlobalMenu;
  currentPageCategory: string;
}

export default function GlobalMenu({
  globalMenu,
  currentPageCategory,
}: IGlobalMenuProps) {
  return (
    <ul className="flex justify-around text-center">
      {globalMenu.links.map((link) => (
        <li className="bg-red-200 w-full" key={link.id}>
          <div className="w-full h-3">
            {link.global_category.data.attributes.title ===
              currentPageCategory && (
              <div className="w-full h-full bg-red-300" />
            )}
          </div>
          <Link
            href={
              link.global_category.data.attributes.homepage.data.attributes.url
            }
          >
            {link.global_category.data.attributes.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
