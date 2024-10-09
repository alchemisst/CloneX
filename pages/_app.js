import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import {  Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets:['latin'],
  weight:['400','600','700','800']
})

export default function App({ Component, pageProps:{session,...pageProps} }) {
  return (
   <main className={openSans.className}>
      <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
   </main>
  
  );
}