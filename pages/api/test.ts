import type { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";

export type PostResponse = {
  ok: boolean;
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostResponse>
) {
  return res.status(200).json({
    ok: true,
  });
}

export default withHandler({ methods: ["GET"], handler });
