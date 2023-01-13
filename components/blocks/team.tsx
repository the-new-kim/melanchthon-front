import SectionTitle from "@components/shared/sectionTitle";
import StrapiImage from "@components/strapiImage";
import { IBlock, IPerson } from "@libs/types";
import { useState } from "react";
import BlockLayout from "./blockLayout";

export interface ITeamProps extends IBlock {
  people: { data: IPerson[] };
  title?: string;
}

export default function Team({ people, title }: ITeamProps) {
  const [person, setPerson] = useState();

  return (
    <BlockLayout>
      {title && <SectionTitle>{title}</SectionTitle>}

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {people.data.map((person) => (
          <li key={person.id}>
            <div className="aspect-[2/2.5] overflow-hidden w-full flex justify-center">
              <StrapiImage
                image={person.attributes.image.data}
                className="w-full object-cover"
              />
            </div>
            <h4>{person.attributes.name}</h4>
            <small>{person.attributes.position}</small>
          </li>
        ))}
      </ul>
    </BlockLayout>
  );
}
