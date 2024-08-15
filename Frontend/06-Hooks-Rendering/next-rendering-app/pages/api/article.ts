import { NextApiRequest, NextApiResponse } from "next";

type ResponseDataType = {
  code: number;
  data: [];
  msg: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDataType>
) {
  const results: ResponseDataType = {
    code: 200,
    data: [
      {
        article_id: 1,
        board_type_code: 1,
        title: "제목입니다.",
        article_type_cpde: 1,
        content: "내용입니다.",
        view_count: 0,
        ip_address: "111.111.111.111",
        is_display_code: 1,
        reg_data: "2024-08-14",
        reg_member_id: 1,
        edit_date: null,
        edit_member_id: null
      },
    ],
    msg: "ok",
  }

  res.status(200).json(results);
}