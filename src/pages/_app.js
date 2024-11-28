import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { store, persistor } from "@store";
import { PersistGate } from "redux-persist/integration/react";
import "@/styles/cart.css";
import { SessionProvider } from "next-auth/react";
import AuthWrapper from "@/components/shared/AuthWrapper"; 



const MyApp = ({ Component, pageProps }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>eCommerce</title>
        </Head>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {/* Wrap your Component with AuthWrapper */}
            <AuthWrapper>
              <Component {...pageProps} />
            </AuthWrapper>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
};

export default MyApp;
