import IArticle from "@/interface/article";
import { useState } from "react";

const SSR = () => {
    //게시글 목록 상태 데이터 정의 및 초기값 세팅하기
    const [articles, setArticles] = useState<IArticle[]>([]);

    //화면이 최초로 렌더링 되는시점(마운팅시점)을 캐치하기 위해 useEffect훅 사용하기
    //useEffect(() => {
    //최초 화면 렌더링(CSR) 되기전에 백엔드 API에서 게시글 목록 가져오기 구현
    //동기 방식의 ECMAScript 표준 AJAX 통신 기능인 fecth를 이용해 데이터 가져오기
  
    //fetch("http://localhost:5000/api/article/list")
    //  .then((res) => res.json())
    //  .then((result) => {
    //    console.log("백엔드 RTESFul API에서 전달된 게시글 데이터목록:", result);
    //    setArticles(result.data);
    //  });
    //}, []);
  
  return (
<div>
      CSR-Client Side Rendering 예시코드
      <table className="w-full">
        <thead>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>조회수</th>
            <th>아이피</th>
            <th>등록일시</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={index}>
              <td>{article.article_id}</td>
              <td>{article.title}</td>
              <td>{article.view_count}</td>
              <td>{article.ip_address}</td>
              <td>{article.reg_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const getServerSideProps = async()=> {
  
}

export default SSR;