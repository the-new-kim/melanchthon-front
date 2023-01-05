import { IBlock } from "@libs/types";
import Editor, { IEditorProps } from "./editor";
import PostList, { IPostListProps } from "./postList";

const getBlockComponent = ({ __component, ...rest }: IBlock, index: number) => {
  switch (__component) {
    case "blocks.editor":
      return <Editor key={__component + index} {...(rest as IEditorProps)} />;
    case "blocks.post-list":
      return (
        <PostList key={__component + index} {...(rest as IPostListProps)} />
      );

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
