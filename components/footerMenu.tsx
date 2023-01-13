import { ILink } from "@libs/types";
import { cls } from "@libs/utils";
import Link from "next/link";
import { useRouter } from "next/router";

interface IFotterMenuProps {
  links: ILink[];
}

export default function FooterMenu({ links }: IFotterMenuProps) {
  const { asPath } = useRouter();

  return (
    <footer className="bg-green p-3 pb-20 mt-10 font-sans font-bold">
      <ul>
        {links.map((link) => (
          <li
            key={link.id}
            className={`${cls(
              link.href === asPath ? "text-white" : ""
            )} transition-colors duration-300`}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
