import App, { Container } from 'next/app';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import GlobalStyle from '../globalStyle';
import Layout from '../components/Layout';
import theme from '../utils/Theme';

export default class MyApp extends App {
  componentDidMount() {
    // For service worker registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => {
          // console.log('service worker registration successful');
        })
        .catch(err => {
          console.warn('service worker registration failed', err.message);
        });
    }
    // For material-ui
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  componentDidCatch(error, errorInfo) {
    // console.log('CUSTOM ERROR HANDLING', error);
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>Heimbach Nextjs Boilerplate</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <GlobalStyle />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Container>
    );
  }
}
