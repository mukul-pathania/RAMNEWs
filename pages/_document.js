import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charset="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="description" content="A simple news app" />
          <meta name="theme-color" content="#000" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-icon.png" />
          <link href="favicon-16.png" rel="icon" type="image/png" sizes="16x16" />
          <link href="favicon-32.png" rel="icon" type="image/png" sizes="32x32" />
          <link href="icons/icon-192x192.png" rel="icon" sizes="192x192" />
          <link href="icons/icon-256x256.png" rel="icon" sizes="256x256" />
          <link href="icons/icon-384x384.png" rel="icon" sizes="384x384" />
          <link href="icons/icon-512x512.png" rel="icon" sizes="512x512" />
          <link href="icons/maskable.png" rel="icon" size="any" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
