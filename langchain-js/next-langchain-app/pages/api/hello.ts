// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// NextApiRequest 타입은 웹브라우저에서 서버로 전달되는 각종 정보를 추출하는 HTTPRequest 객체=req
// NextApiResponse 타입은 서버에서 웹브라우저롤 전달하는 응답처리를 위한 HttpResponese 객체=res
import { IArticle } from "@/interface/article";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  code: number;
  data: string | null | IArticle[] | IArticle;
  msg: string;
};

// 해당 업무(Hello)에 대한 C/R/U/D 처리를 위한 RESTFul API 기능구현 핸들러 함수
// 하나의 함수로 해당 업무의 모든 라우팅방식을 통합해서 기능을 제공하는 통합 라우팅 함수
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // API 호출 기본 응답 결과값 설정
  let apiResult: ResponseData = {
    code: 400,
    data: null,
    msg: "Failed",
  };

  try {
    // Step1: 로직구현
    // 클라이언트에서 GET 방식 요청해오는 경우 처리
    // 호출주소: http://localhost:3000/api/article
    // 호출방식: GET 방식
    // 호출결과: 게시글 전체목록 데이터 반환
    if (req.method == "GET") {
      const articles: IArticle[] = [
        {
          id: 1,
          title: "게시글 제목1입니다",
          content: "내용1입니다",
          view_cnt: 0,
          ip_address: "111.111.1.11.1",
          created_at: Date.now().toString(),
          created_member_id: 1,
        },
        {
          id: 2,
          title: "게시글 제목2입니다",
          content: "내용1입니다",
          view_cnt: 2,
          ip_address: "121.211.212.222",
          created_at: Date.now().toString(),
          created_member_id: 2,
        },
      ];
    }
    
    // 클라이언트에서 POST 요청이 오는 경우
    if (req.method === "POST") {
      // Step1: 프론트엔드 전달 데이터 추출하기
      const title:string = req.body.title;
      const contents:string = req.body.contents;
      const created_member_id:number = req.body.member_id;

      // Step2: DB 저장 처리
      const article = {
        id: 1,
        title: title,
        content: contents,
        view_cnt: 0,
        ip_address: "",
        created_at: Date.now().toString(),
        created_member_id: created_member_id,
      }

      // Step3: API 호출결과 설정
      apiResult.code = 200;
      apiResult.data = article;
      apiResult.msg = "Ok";
    }
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error";
  }
  res.status(200).json(apiResult);
}
