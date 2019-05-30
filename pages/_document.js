/* eslint prefer-destructuring: 0 */
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import { ServerStyleSheet } from 'styled-components';
import flush from 'styled-jsx/server';
import React from 'react';
import theme from '../utils/Theme';

// This custom document style is used to ssr styled components
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => ({
            ...sheet.collectStyles(<App {...props} />),
            ...sheets.collect(<App {...props} />),
          }),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <React.Fragment>
            {sheets.getStyleElement()}
            {sheet.getStyleElement()}
            {flush() || null}
          </React.Fragment>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta name="description" content="Heimbach Nextjs Boilerplate" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="manifest" href="/static/manifest.json" />
          <link
            rel="preconnect"
            as="font"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <div id="app">
            <noscript>
              <div>
                <p>Your browser does not support JavaScript!</p>
              </div>
            </noscript>
            <Main />
            <NextScript />
          </div>
        </body>
      </html>
    );
  }
}

export default MyDocument;
