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
      const result = await (
        await fetch(`/api/post/${postType}/${global_category.data.id}`)
      ).json();

      setPosts(result.data);
    })();
  }, [postType, global_category]);

  console.log(posts);

  return (
    <>
      {posts && (
        <BlockLayout>
          {postType === "news-articles" && (
            <News newsArticles={posts as INewsArticle[]} />
          )}
          {postType === "events" && <Events events={posts as IEvent[]} />}
          {postType === "exhibitions" && (
            <Exhibitions exhibitions={posts as IExhibition[]} />
          )}
        </BlockLayout>
      )}
    </>
  );
}
