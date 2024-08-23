// 호출주소: http://localhost:3000/api/agent/pagebot
// 웹페이지 지식베이스 Agent 챗봇 구현하기
import type { NextApiRequest, NextApiResponse } from "next";

//프론트엔드로 반환할 메시지 데이터 타입 참조하기
import { IMemberMessage, UserType } from "@/interfaces/message";

//OpenAI LLM 서비스 객체 참조하기
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";

//시스템,휴먼 메시지 객체를 참조합니다.
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

//프롬프트 템플릿 참조하기
import { ChatPromptTemplate } from "@langchain/core/prompts";

//LLM 응답메시지 타입을 원하는 타입결과물로 파싱(변환)해주는 아웃풋파서참조하기
//StringOutputParser는 AIMessage타입에서 content속성값만 문자열로 반환해주는 파서입니다.
import { StringOutputParser } from "@langchain/core/output_parsers";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

//서버에서 웹브라우저로 반환하는 처리결과 데이터 타입
type ResponseData = {
  code: number;
  data: string | null | IMemberMessage;
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  //API 호출 기본 결과값 설정
  let apiResult: ResponseData = {
    code: 400,
    data: null,
    msg: "Failed",
  };

  try {
    //클라이언트에서 POST방식 요청해오는 경우 처리
    if (req.method == "POST") {
      //Step1:프론트엔드에서 사용자 프롬프트 추출하기
      const prompt = req.body.message; //사용자 입력 메시지 추출
      const nickName = req.body.nickName; //사용자 대화명 추출

      //Step2:LLM 모델 생성하기
      const llm = new ChatOpenAI({
        model: "gpt-4o",
        apiKey: process.env.OPENAI_API_KEY,
      });

      // Step3: 
      const loader = new CheerioWebBaseLoader("http://mixedcode.com/blog/31");

      const rawDocs = await loader.load();
      console.log("Cheerio를 통해 로딩한 로우 웹페이지 데이터: ", rawDocs);
      
      // Step4: 텍스트 스플릿팅 처리하기
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });
      // 스플릿팅된 단어의 집합문서 생성
      const docs = await splitter.splitDocuments(rawDocs);

      // Step5: Splitting된 문서의 단어들을 임베딩(벡터화처리)처리해서 메모리벡터저장소에 저장하기
      // MemoryVectorStore.fromDocuments(임베딩된 문서, 사용할 임베딩 처리기);
      const vectorStore = await MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings());

      // Step6: 메모리 벡터 저장소에서 사용자 질문으로 Query하기 
      // Vector 저장소 기반 검색기 변수 정의
      const retriever = vectorStore.asRetriever();
      const searchResult = await retriever.invoke(prompt);

      //프론트엔드로 반환되는 메시지 데이터 생성하기
      const resultMsg: IMemberMessage = {
        user_type: UserType.BOT,
        nick_name: "bot",
        message: searchResult[0].pageContent,
        send_date: new Date(),
      };

      apiResult.code = 200;
      apiResult.data = resultMsg;
      apiResult.msg = "Ok";
    }
  } catch (err) {
    const resultMsg:IMemberMessage = {
      user_type: UserType.BOT,
      nick_name: "BOT",
      message: "조회결과가 존재하지 않거나 조회에 실패했습니다.",
      send_date: new Date()
    }

    //Step2:API 호출결과 설정
    apiResult.code = 500;
    apiResult.data = resultMsg;
    apiResult.msg = "Server Error Failed";
  }

  res.json(apiResult);
}