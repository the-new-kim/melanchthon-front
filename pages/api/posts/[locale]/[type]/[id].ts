import type { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import { IPost } from "@libs/types";
import qs from "qs";

export type PostsResponse = {
  ok: boolean;
  results: IPost[];
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostsResponse>
) {
  const {
    query: { type, id, locale },
  } = req;

  const query = qs.stringify(
    {
      locale,

      filters: {
        global_category: { id: { $eq: id } },
      },
      sort:
        type === "events"
          ? ["eventDate:desc"]
          : type === "exhibitions"
          ? ["dateFrom:desc"]
          : ["createdAt:desc"],

      populate: "*",
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const json = await (
    await fetch(`${process.env.STRAPI_BASE_URL}${type}?${query}`)
  ).json();

  return res.status(200).json({
    ok: true,
    results: json.data,
  });
}

export default withHandler({ methods: ["GET"], handler });
