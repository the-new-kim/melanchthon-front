import CtaCard from "@components/shared/ctaCard";
import PageTitle from "@components/shared/pageTitle";
import { IBlock, IImage, ILink } from "@libs/types";
import Link from "next/link";

import LinesEllipsis from "react-lines-ellipsis";
import BlockLayout from "./blockLayout";

export interface ICtaProps extends IBlock {
  title: string;
  items: {
    id: number;
    title: string;
    label: string;
    description: string;
    reverse: boolean;
    image: { data: IImage };
    button: ILink;
  }[];
}

export default function Cta({ title, items }: ICtaProps) {
  return (
    <BlockLayout>
      {title && <PageTitle>{title}</PageTitle>}
      <ul>
        {items.map((item) => (
          <li key={item.id} className="mb-20">
            <CtaCard image={item.image.data} reverse={item.reverse}>
              <div className="mb-5">
                <h3>{item.title}</h3>
                {item.label && <span className="mr-3">{item.label}</span>}
              </div>

              {item.description && (
                <LinesEllipsis
                  className="font-serif mb-1 text-sm"
                  text={item.description}
                  maxLine="5"
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                />
              )}

              {item.button && (
                <span className="mt-5">
                  <Link
                    className="border-blue border-[1px] px-1 py-1"
                    href={item.button.href}
                    target={item.button.target}
                  >
                    {item.button.label}
                  </Link>
                </span>
              )}
            </CtaCard>
          </li>
        ))}
      </ul>
    </BlockLayout>
  );
}
