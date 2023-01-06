import {
  IBlock,
  IGlobalCategory,
  INewsArticle,
  IEvent,
  IExhibition,
  TApiNameTypes,
} from "@libs/types";
import BlockLayout from "../blockLayout";
import News from "./news";
import Events from "./events";
import Exhibitions from "./exhibitions";
import useSWR from "swr";
import { PostsResponse } from "pages/api/posts/[type]/[id]";

export interface IPostListProps extends IBlock {
  postType: TApiNameTypes;
  global_category: { data: IGlobalCategory };
  pageUrl: string;
}

export default function PostList({
  postType,
  global_category,
  pageUrl,
}: IPostListProps) {
  const { data } = useSWR<PostsResponse>(
    `/api/posts/${postType}/${global_category.data.id}`
  );

  console.log("POST DATA", data);

  return (
    <>
      {data?.results && (
        <BlockLayout>
          {postType === "news-articles" && (
            <News
              newsArticles={data.results as INewsArticle[]}
              pageUrl={pageUrl}
            />
          )}
          {postType === "events" && (
            <Events events={data.results as IEvent[]} pageUrl={pageUrl} />
          )}
          {postType === "exhibitions" && (
            <Exhibitions
              exhibitions={data.results as IExhibition[]}
              pageUrl={pageUrl}
            />
          )}
        </BlockLayout>
      )}
    </>
  );
}
