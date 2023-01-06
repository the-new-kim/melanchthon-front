import type { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import { IPost } from "@libs/types";

export type PostsResponse = {
  ok: boolean;
  results: IPost[];
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostsResponse>
) {
  const {
    query: { type, id },
  } = req;

  const json = await (
    await fetch(
      `${process.env.STRAPI_BASE_URL}${type}?filters[global_category][id]=${id}&populate=*`
    )
  ).json();

  return res.status(200).json({
    ok: true,
    results: json.data,
  });
}

export default withHandler({ methods: ["GET"], handler });
