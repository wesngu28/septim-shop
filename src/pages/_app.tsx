import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "./Navbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <SessionProvider session={session}>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-yellow-800 to-yellow-900 font-fjord">
        <Navbar />
        <div className="flex flex-1 flex-col items-center justify-center">
        <Component {...pageProps} />
        </div>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
