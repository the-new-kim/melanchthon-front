import { ILinkWrapper } from "@libs/types";
import Link from "next/link";

interface IInternalLinkProps {
  label: string;
  url: string;
  openInNewTab: boolean;
}

export default function InternalLink({
  label,
  url,
  openInNewTab,
}: IInternalLinkProps) {
  return (
    <li>
      <Link href={url} target={openInNewTab ? "_blank" : "_self"}>
        {label}
      </Link>
    </li>
  );
}
