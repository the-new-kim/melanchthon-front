import { cls } from "@libs/utils";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const { asPath } = useRouter();

  return (
    <Link
      href={url}
      target={openInNewTab ? "_blank" : "_self"}
      className={`${cls(
        asPath === url ? "text-green" : "text-white"
      )} transition-colors duration-300`}
    >
      {label}
    </Link>
  );
}
