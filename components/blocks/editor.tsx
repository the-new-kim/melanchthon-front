import { IBlock } from "@libs/types";

export interface IEditorProps extends IBlock {
  content: string;
}

export default function Editor({ content }: IEditorProps) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
