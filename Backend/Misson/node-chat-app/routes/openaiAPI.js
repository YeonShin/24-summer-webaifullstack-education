var express = require("express");
var router = express.Router();

const axios = require("axios");

var db = require('../models/index');

var sequelize = db.sequelize;
const { QueryTypes } = require("sequelize");

const fs = require("fs");

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/dalle", async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    // Step1: 프론트엔드에서 전달된 사용자 프롬프트 정보 추출하기
    const model = req.body.model;
    const prompt = req.body.prompt;

    // Step2: OpenAI Dalle API 호출하기
    const response = await openai.images.generate({
      model: model, // dall-e-2
      prompt: prompt,
      n: 1, // 이미지 생성개수 (dalle2는 최대 10개, dalle3는 1개)
      size: "1024x1024", // dalle2: 256*258, 512*512, 1024*1024 dalle3: 1024*1024, 1792*1024, 1792 지원
      style: "vivid", // 기본값 vivid, natural:dalle3만 지원 - 더 자연스럽고 초 현실적인 이미지 생성
      response_format: "url", // url:openai사이트에 생성된 이미지 풀주소경로반환, b64_json : 바이너리 데이터
    });

    // Step3: Dalle API 호출결과에서 물리적 이미지 생성/서버공간에 저장하기
    // url 방식으로 이미지생성값을 반환받는경우는 최대 1시간 이후에 openai이미지 서버에서 해당 이미지 삭제됨
    // 해당 이미지가 영구적으로 필요하다면 반환된 url주소를 이용해 이미지를 백엔드에 생성하시면 됩니다.
    const imageURL = response.data[0].url;
    console.log("dall 이미지 생성 URL경로: ", imageURL);

    const imgFileName = `sample-${Date.now()}.png`;
    const imgFilePath = `./public/ai/${imgFileName}`;

    axios({
      url: imageURL,
      responseType: "stream",
    })
      .then((response) => {
        response.data
          .pipe(fs.createWriteStream(imgFilePath))
          .on("finish", () => {
            console.log("Image saved successfully.");
          })
          .on("error", (err) => {
            console.error("Error saving image:", err);
          });
      })
      .catch((err) => {
        console.error("Error downloading image:", err);
      });

    // Step4: 최종 생성된 이미지 데이터 추출하기
    const article = {
      board_type_code: 3,
      title: prompt,
      article_type_code: 0,
      view_count: 0,
      ip_address: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
      is_display_code: 1,
      reg_date: Date.now(),
      reg_member_id: 1
    };

    // 신규 등록된 게시글 정보를 반환받는다.
    const registedArticle = await db.Article.create(article);

    // 생성된 이미지 정보 만들고 저장하기
    const articleFile = {
      article_id: registedArticle.article_id,
      file_name: imgFileName,
      file_size: 0,
      file_path: `${process.env.DALLE_IMG_DOMAIN}/ai/${imgFileName}`,
      file_type: 'PNG',
      reg_date: Date.now(),
      reg_member_id: 1,
    }

    // Step5: DB 게시글 테이블에 사용자 이미지 생성요청 정보 등록처리하기
    await db.ArticleFile.create(articleFile);

    // Step6: 최종 생성된 이미지 정보를 프론트엔드로 반환하기
    apiResult.code = 200;
    apiResult.data = imageURL;
    apiResult.msg = "Ok";
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error";
    console.error("API 호출 에러 발생.", err);
  }

  // 최종 처리결과 값을 프론트엔드로 반환
  res.json(apiResult);
});

router.get('/all', async (req, res) => {
  let apiResult = {
    code: 400,
    data: null,
    msg: "",
  };

  try {
    const query = `
      SELECT 
      A.article_id,
      A.title,
      A.contents,
      A.reg_member_id,
      F.article_file_id as file_id,
      F.file_name,
      F.file_path,
      M.name as reg_member_name
      From edu_community.article A INNER JOIN edu_community.article_file F ON A.article_id  = F.article_id
      INNER JOIN edu_community.member M ON A.reg_member_id = M.member_id;
    `

    const blogFiles = await sequelize.query(query, {
      raw: true,
      type: QueryTypes.SELECT,
    });
    apiResult.code = 200;
    apiResult.data = blogFiles;
    apiResult.msg = "Ok";

  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Server Error";
    console.error('Server Error.', err);
  }
  res.json(apiResult);
});

router.post('/gpt', async (req, res) => {
  // Step1: 프론트엔드에서 사용자 질문 프롬프트 메시지 추출하기
  // Step2: ChatGPT API 호출하기
  // Step3: ChatGPT 응답 메시지 추출하기
  // ChatGPT: 응답 메시지 반환하기 
});

module.exports = router;
