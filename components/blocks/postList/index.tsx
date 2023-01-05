import {
  IBlock,
  IGlobalCategory,
  INewsArticle,
  IEvent,
  IExhibition,
  IPost,
  TApiNameTypes,
} from "@libs/types";
import BlockLayout from "../blockLayout";
import { useEffect, useState } from "react";
import { getPostsByCategoryId } from "@libs/strapi";

import News from "./news";
import Events from "./events";
import Exhibitions from "./exhibitions";

export interface IPostListProps extends IBlock {
  postType: TApiNameTypes;
  global_category: { data: IGlobalCategory };
}

export default function PostList({
  postType,
  global_category,
}: IPostListProps) {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getPostsByCategoryId(
        postType,
        global_category.data.id
      );

      setPosts(data);
    })();
  }, [postType, global_category]);

  return (
    <BlockLayout>
      {postType === "news-articles" && (
        <News newsArticles={posts as INewsArticle[]} />
      )}
      {postType === "events" && <Events events={posts as IEvent[]} />}
      {postType === "exhibitions" && (
        <Exhibitions exhibitions={posts as IExhibition[]} />
      )}
    </BlockLayout>
  );
}
