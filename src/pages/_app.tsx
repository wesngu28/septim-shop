import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Navbar from "./Navbar";
import { Provider } from "react-redux";
import { persistor, store } from "~/redux/store";
import { PersistGate } from 'redux-persist/integration/react';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={session}>
          <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-yellow-800 to-yellow-900 font-fjord">
            <Navbar />
            <div className="flex flex-1 flex-col items-center justify-center">
            <Component {...pageProps} />
            </div>
          </main>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
};

export default api.withTRPC(MyApp);
