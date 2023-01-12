import { IBlock } from "@libs/types";
import BigLinks from "./bigLinks";
import Editor, { IEditorProps } from "./editor";
import Hero from "./hero";
import ImageCarousel, { IImageCarouselProps } from "./imageCarousel";
import PostList, { IPostListProps } from "./postList";
import Timeline, { ITimelineProps } from "./timeline";

const getBlockComponent = ({ __component, ...rest }: IBlock, index: number) => {
  switch (__component) {
    case "blocks.editor":
      return <Editor key={__component + index} {...(rest as IEditorProps)} />;
    case "blocks.post-list":
      return (
        <PostList key={__component + index} {...(rest as IPostListProps)} />
      );
    case "blocks.timeline":
      return (
        <Timeline key={__component + index} {...(rest as ITimelineProps)} />
      );
    case "blocks.image-carousel":
      return (
        <ImageCarousel
          key={__component + index}
          {...(rest as IImageCarouselProps)}
        />
      );
    case "blocks.hero":
      return <Hero key={__component + index} {...(rest as any)} />;
    case "blocks.big-links":
      return <BigLinks key={__component + index} {...(rest as any)} />;

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
