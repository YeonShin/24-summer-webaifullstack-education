import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";

export const AppContext = createContext({
  msg: "",
  setMsg: (msg: string) => {},
});

function MsgProvider({ children }: { children: React.ReactNode }) {
  const [msg, setMsg] = useState("기본값");
  return (
    <AppContext.Provider value={{ msg, setMsg }}>
      {children}
    </AppContext.Provider>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return(
  <MsgProvider>
    <Component {...pageProps} />
  </MsgProvider>);
}
