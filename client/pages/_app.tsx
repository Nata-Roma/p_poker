import { createContext, FC, useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import theme from '@styles/theme';
import { Footer } from 'components/Footer/footer';
import '../styles/globals.css'
import { io } from 'socket.io-client';
import { BASE_URL } from 'utils/apiConfig';
import AppContext, { appStore } from 'store/store';
import { useReducer } from 'react';
import { appReducer } from 'store/reducer';


const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [state, dispatch] = useReducer(appReducer, appStore)
  
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={{state, dispatch}}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
        <Footer />
        </AppContext.Provider>
      </ThemeProvider>
    </>
  );
};

export default MyApp;