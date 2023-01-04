import { IBlock } from "@libs/types";
import Editor, { IEditorProps } from "./editor";
import Post, { IPostProps } from "./post";

const getBlockComponent = ({ __component, ...rest }: IBlock, index: number) => {
  switch (__component) {
    case "blocks.editor":
      return <Editor key={__component + index} {...(rest as IEditorProps)} />;
    case "blocks.post":
      return <Post key={__component + index} {...(rest as IPostProps)} />;

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
