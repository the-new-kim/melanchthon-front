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
    <ul className="flex justify-around text-center absolute top-0 left-0 w-full">
      {globalMenu.links.map((link) => (
        <li className="w-full" key={link.id}>
          <Link
            href={
              link.global_category.data.attributes.homepage.data.attributes.url
            }
          >
            <div className="w-full h-3">
              {link.global_category.data.attributes.title ===
                currentPageCategory && (
                <div className="w-full h-full bg-[#B6983B]" />
              )}
            </div>

            <div>{link.global_category.data.attributes.title}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
