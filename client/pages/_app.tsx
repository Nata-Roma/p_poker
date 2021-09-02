import { createContext, FC, useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import theme from '@styles/theme';
import { Footer } from 'components/Footer';
import '../styles/globals.css'
import { io } from 'socket.io-client';
import { BASE_URL } from 'utils/apiConfig';
import { AppContext, appStore } from 'store/store';


// export const AppContext = createContext(null);


const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  // const [ socket, setSocket ] = useState(null);
  
  // const socketConnect = () => {
  //   const socketIo = io(BASE_URL, {
  //     withCredentials: true,
  //     extraHeaders: {
  //       'my-custom-header': 'abcd',
  //     },
  //   });
  //   setSocket(socketIo);
  // };

  // useEffect(() => {
  //   socketConnect();
  // }, []);

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
        <AppContext.Provider value={appStore}>
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