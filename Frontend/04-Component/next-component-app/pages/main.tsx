import { Inter } from 'next/font/google';
import Header from '@/components/header';
import LogoContents from '@/components/logo-contents';
import Guide from '@/components/guide';
import { IGuide } from '@/interface/main';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });



function Main() {
  const [title, setTitle] = useState("메인 페이지");

  const logoPath = '/next.svg';

  const guides:IGuide[] = [
    {
      href: 'https://nextjs.org/',
      title: 'Next.js',
      desc: 'Next.js의 최신 기술을 경험해보세요.',
    },
    {
      href: 'https://tailwindcss.com/',
      title: 'Tailwind',
      desc: 'Tailwind CSS Framework에 대해 알아보세요.',
    },
    {
      href: 'https://js.langchain.com/v0.2/docs/introduction/',
      title: 'Langchain.js',
      desc: 'Langchain.js의 최신 기술을 알아보세요.',
    },
    {
      href: 'https://mixedcode.com/',
      title: 'MixedCode.com',
      desc: '여러분의 기술과 경험을 공유해보세요',
    },
  ];

  const handleChildClick = (url: string) => {
    console.log("이동할 URL 데이터:", url)
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>{title}</h1>

      {/* 헤더 컴포넌트 영역 */}
      <Header  mainPage="pages/main.tsx" onClick={handleChildClick}>
        자식 컴포넌트 전달하기
      </Header>

      {/* 로고 컴포넌트 영역 */}
      <LogoContents logoPath={logoPath}/>

      {/* 가이드 컴포넌트 영역 */}
      <Guide guides={guides}/>
    </main>
  );
}

export default Main;
