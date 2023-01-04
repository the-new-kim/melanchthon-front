import { IBlock, IGlobalCategory, IPost, TApiNameTypes } from "@libs/types";
import BlockLayout from "./blockLayout";
import { useEffect, useState } from "react";
import { getPostsByCategoryId, STRAPI_BASE_URL } from "@libs/strapi";
import Link from "next/link";
import { useRouter } from "next/router";

export interface IPostProps extends IBlock {
  postType: TApiNameTypes;
  global_category: { data: IGlobalCategory };
}

export default function Post({ postType, global_category }: IPostProps) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const data = await getPostsByCategoryId(
        postType,
        global_category.data.id
      );

      setPosts(data);
    })();
  }, [postType, global_category]);

  const postsExist = posts && posts.length;

  return (
    <BlockLayout>
      {postsExist && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`${router.asPath}/${post.attributes.slug}`}>
                {post.attributes.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </BlockLayout>
  );
}
