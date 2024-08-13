import MainLayout from "@/components/main-layout";
import MyPageLayout from "@/components/mypage-layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const currentPath = router.pathname;
  console.log("현재 URL 경고: ", currentPath);

  let layoutMode: string = "general";
  if (currentPath === "/login" || currentPath === "/regist") {
    layoutMode = "auth";
  } else if (currentPath.indexOf("/mypage") > -1) {
    layoutMode = "mypage";
  } else {
    layoutMode = "general";
  }

  console.log("layoutMode:", layoutMode);

  const renderLayoutOnPath = () => {
    switch (layoutMode) {
      case "auth":
        return <Component {...pageProps} />;
      case "mypage":
        return (
          <MyPageLayout>
            <Component {...pageProps} />
          </MyPageLayout>
        );
      default:
        return (
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        );
    }
  };
  return (
    // <>
    // {currentPath.includes("/mypage") ? (
    //   <MyPageLayout>
    //     <Component {...pageProps} />
    //   </MyPageLayout>
    // ) : (
    //   <MainLayout>
    //     <Component {...pageProps} />
    //   </MainLayout>
    // )}
    // </>
    <>{renderLayoutOnPath()}</>
  );
}