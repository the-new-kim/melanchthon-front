import { IBlock } from "@libs/types";
import BlockLayout from "./blockLayout";

export interface IEditorProps extends IBlock {
  content: string;
}

export default function Editor({ content }: IEditorProps) {
  return (
    <BlockLayout>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </BlockLayout>
  );
}
