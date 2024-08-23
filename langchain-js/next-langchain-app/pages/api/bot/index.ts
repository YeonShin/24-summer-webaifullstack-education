// Next.js API route support: https://nextjs.org/docs/api/bot/transelatebot

// NextApiRequest 타입은 웹브라우저에서 서버로 전달되는 각종 정보를 추출하는 HTTPRequest 객체=req
// NextApiResponse 타입은 서버에서 웹브라우저롤 전달하는 응답처리를 위한 HttpResponese 객체=res
import { IArticle } from "@/interface/article";
import { IMemberMessage, IMessage, UserType } from "@/interface/message";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import type { NextApiRequest, NextApiResponse } from "next";

import {
  RunnableWithMessageHistory,
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";


// 프롬프트 템플릿 참조하기

type ResponseData = {
  code: number;
  data: string | null | IMemberMessage;
  msg: string;
};

//메모리 영역에 실제 대화이력이  저장되는 전역변수 선언 및 구조정의
//Record<string:사용자세션아이디, InMemoryChatMessageHistory:사용자별대화이력객체>
const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

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
      const prompt = req.body.message;
      const nickname = req.body.nickname;

      const llm = new ChatOpenAI({
        model: "gpt-4o",
        apiKey: process.env.OPEN_API_KEY,
      });

      //챗봇에게 대화이력기반 채팅을 할것을 알려주고 대화이력정보를 챗봇 제공하며
      //사용자메시지를 포함한 채팅전용 템플릿을 생성합니다.
      const promptTemplate = ChatPromptTemplate.fromMessages([
        ["system", "당신은 사용자와의 모든 대화이력을 기억합니다."],
        ["placeholder", "{chat_history}"],
        ["human", "{input}"],
      ]);

      // LLM OutPutParser를 생성
      const outputParser = new StringOutputParser();

      //llm 모델 체인 생성(llm기본작업)
      const llmChain = promptTemplate.pipe(llm).pipe(outputParser);

      // 대화 이력 관리를 위한 체인 생성(대화이력관리작업)
      // RunnableWithMessageHistory({runnable:llm모델 정보, getMessageHistory: ()=>{지정된사용자의대화이력반환}})
      //,inputMessagesKey:사용자입력프롬프트값전달,historyMessagesKey:지정된사용자의대화이력정보를 llm에게전달)
      const historyChain = new RunnableWithMessageHistory({
        runnable: llmChain,
        getMessageHistory:async(sessionId) => {
          if(messageHistories[sessionId] == undefined) {
            messageHistories[sessionId] = new InMemoryChatMessageHistory();
          }
          return messageHistories[sessionId];
        },
        inputMessagesKey:"input",
        historyMessagesKey:"chat_history"
      });

      // 사용자 세션 아이디 값 구성하기
      //현재 챗봇을 호출한 사용자 아이디값을 세션아이디로 설정해줍니다.
      //추후 프론트엔드서 전달된 사용자아디값을 세션아이디 값으로 설정해주면 되세요.. 
      const config = {
        configurable: { sessionId: "yeon"}
      }

      //대화이력관리 기반 챗봇 llm 호출하기
      //historyChain.invoke({input:사용자입력메시지프롬프트},config:현재접속한 사용자정보);
      const resultMessage = await historyChain.invoke({input: prompt}, config);


      // // 메시지 처리결과데이터
      const resultMsg: IMemberMessage = {
        user_type: UserType.BOT,
        message: resultMessage,
        nickname: nickname,
        send_date: new Date(),
      };

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
