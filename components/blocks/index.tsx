import { IBlock } from "@libs/types";
import Editor, { IEditorProps } from "./editor";

const getBlockComponent = ({ __component, ...rest }: IBlock, index: number) => {
  switch (__component) {
    case "blocks.editor":
      return <Editor key={__component + index} {...(rest as IEditorProps)} />;

    default:
      return null;
  }
};

interface IBlocksProps {
  blocks: IBlock[];
}

const Blocks = ({ blocks }: IBlocksProps) => {
  return <>{blocks.map(getBlockComponent)}</>;
};

Blocks.defaultProps = {
  blocks: [],
};

export default Blocks;
