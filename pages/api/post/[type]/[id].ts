import type { NextApiRequest, NextApiResponse } from "next";

export type PostResponse = {
  ok: boolean;
  data: any;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostResponse>
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
    data: json.data,
  });
}

export default handler;
