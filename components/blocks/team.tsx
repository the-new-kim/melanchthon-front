import { IBlock, IPerson } from "@libs/types";
import BlockLayout from "./blockLayout";

export interface ITeamProps extends IBlock {
  people: { data: IPerson[] };
}

export default function Team({ people }: ITeamProps) {
  return (
    <BlockLayout>
      <ul>
        {people.data.map((person) => (
          <li key={person.id}>{person.attributes.name}</li>
        ))}
      </ul>
    </BlockLayout>
  );
}
