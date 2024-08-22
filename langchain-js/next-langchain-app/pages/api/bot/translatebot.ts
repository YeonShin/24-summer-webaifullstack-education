// Next.js API route support: https://nextjs.org/docs/api/bot/transelatebot

// NextApiRequest 타입은 웹브라우저에서 서버로 전달되는 각종 정보를 추출하는 HTTPRequest 객체=req
// NextApiResponse 타입은 서버에서 웹브라우저롤 전달하는 응답처리를 위한 HttpResponese 객체=res
import { IArticle } from "@/interface/article";
import { IMessage, UserType } from "@/interface/message";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import type { NextApiRequest, NextApiResponse } from "next";

// 프롬프트 템플릿 참조하기

type ResponseData = {
  code: number;
  data: string | null | IMessage;
  msg: string;
};

// 해당 업무(Hello)에 대한 C/R/U/D 처리를 위한 RESTFul API 기능구현 핸들러 함수
// 하나의 함수로 해당 업무의 모든 라우팅방식을 통합해서 기능을 제공하는 통합 라우팅 함수
export default async function handler(
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

    // 클라이언트에서 POST 요청이 오는 경우
    if (req.method === "POST") {
      // Step1: 프론트엔드 전달 데이터 추출하기
      const role = req.body.role;
      const prompt = req.body.message;

      const llm = new ChatOpenAI({
        apiKey: process.env.OPEN_API_KEY,
      });

      // Case1: ChatPromptTemplate를 이용한 프롬프트 전달하기
      // 프롬프트 템플릿이란? LLM에게 전달할 수있는 다양한 질문 템플릿을 제공하여 보다 효율적인 질문형식을
      // 만들어 LLM에게 제공해 좋은 답변을 만들기 위한 방식제공
      // 의도 : 좋은 질문이 좋은 답변을 만든다.
      // const promptTempalte = ChatPromptTemplate.fromMessages([
      //   ["system", role],
      //   ["user", "{input}"],
      // ]);

      // // template.pipe(LLM모델) : chain객체 반환(chain은 처리할 작업의 기본 단위)
      // // chain(처리할작업)을 여러개 생성하고 chain연결해 로직을 구현하는 방식이 LangChain이다..
      // const chain = promptTempalte.pipe(llm);
      // const result = await chain.invoke({ input: prompt   });

      // Case2: System, Human Message를 이용한 llm호출을 구현해주세요
      // const message = [
      //   new SystemMessage(role),
      //   new HumanMessage(prompt)
      // ];

      // const result = await llm.invoke(message);

      // Case3: StringOutParser를 이용한 결과물 파싱처리 코드를 작성해주세요.
      const outputParser = new StringOutputParser();
      const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", role],
        ["user", "{input}"]
      ]);

      const chain = promptTemplate.pipe(llm).pipe(outputParser);
      const resultMessage = await chain.invoke({input: prompt});

      // // 메시지 처리결과데이터
      const resultMsg: IMessage = {
        user_type: UserType.BOT,
        message: resultMessage,
        send_date: Date.now().toString(),
      };

      // 메시지 처리결과데이터
      // const resultMsg: IMessage = {
      //   user_type: UserType.BOT,
      //   message: result.content as string,
      //   send_date: Date.now().toString(),
      // };

      // Step3: API 호출결과 설정
      apiResult.code = 200;
      apiResult.data = resultMsg;
      apiResult.msg = "Ok";
    }
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error";
  }
  res.status(200).json(apiResult);
}
