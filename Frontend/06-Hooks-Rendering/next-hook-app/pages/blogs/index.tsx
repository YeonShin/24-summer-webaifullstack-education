// 현재 컴포넌트의 생애주기 관리를 위해 useEffect훅 참조
// 컴포넌트 내에서의 데이터 상태 관리를 위해 useStaet훅 참조
import { useEffect, useState } from "react";

interface BlogItem {
  id: number;
  title: string;
  view_cnt: number;
  created_date: string;
}

const originalBlogData = [
  {
    id: 1,
    title: "제목1입니다.",
    view_cnt: 12,
    created_date: "2024-08-14",
  },
  {
    id: 2,
    title: "제목2입니다.",
    view_cnt: 24,
    created_date: "2024-08-12",
  },
  {
    id: 3,
    title: "제목3입니다.",
    view_cnt: 21,
    created_date: "2024-08-14",
  },
  {
    id: 4,
    title: "제목4입니다.",
    view_cnt: 3,
    created_date: "2024-08-14",
  },
  {
    id: 5,
    title: "제목5입니다.",
    view_cnt: 84,
    created_date: "2024-08-14",
  },
];

const BlogList = () => {
  // 검색어 키워드 상태 데이터 값 정의 및 초기화
  const [searchWord, setSearchWord] = useState("");

  // 검색 결과 블로그 목록 상태 데이터 값 정의 초기화
  const [blogs, setBlogs] = useState<BlogItem[]>([]);

  // 현재 컴포넌트 최초로 화면에 렌더링되는 시점(Mount.7)에 실행되는 useEffect훅 정의
  // useEffect('최초 마운팅될때 실행할 콜백함수', 생애주기시점정의 [] 빈 배열의 경우 최초 마운팅되는 시점);
  useEffect(() => {
    console.log("최초 마운팅시점에 호출됩니다.");

    // 최초 해당 컴포넌트가 마운팅될때 백엔드 RESTAPI를 호출해서 블로그 목록을 조회해온다
    // 조회해온 블로그 목록데이터ㅗ를 setBlogs()세터 함수를 통해 상태 데이터로 저장한다.
    setBlogs(originalBlogData);

    // 해당 컴포넌트가 사라지는 시점에 실행되는 콜백함수 정의
    return () => {
      console.log("블로그 목록 페이지가 사라지기전에 실행됩니다.");
    };
  }, []);

  // 화면 내 변화가 일어날때마다 실행되는 useEffect훅 정의하기
  useEffect(() => {
    console.log(
      "화면내에서 상태데이터가 변경되어 렌더링이 일어날때마다 실행됩니다"
    );
  });

  useEffect(() => {
    blogSearch();
  }, [searchWord]);

  // 검색어 기반 블로그 검색 처리 함수 정의
  // 검색 버튼 클릭시 호출되는 함수
  const blogSearch = () => {
    let searchResult: BlogItem[] = [];
    if (searchWord.length > 0) {
      searchResult = originalBlogData.filter((item) => item.title.includes(searchWord));
      setBlogs(searchResult);
    } else {
      setBlogs(originalBlogData);
    }
  };
  return (
    <div>
      <h1 className="m-4">블로그 조회하기</h1>
      <div className="m-4">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            type="text"
            placeholder="검색어를 입력해주세요"
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <button
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            type="button"
            onClick={blogSearch}
          >
            검색
          </button>
        </div>
      </div>
      <div className="m-4">
        <table className="w-full">
          <thead>
            <tr>
              <th>글번호</th>
              <th>제목</th>
              <th>조회수</th>
              <th>등록일자</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.view_cnt}</td>
                <td>{item.created_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogList;
