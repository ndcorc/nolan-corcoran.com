import Document, { Head, Html, Main, NextScript } from 'next/document';

import {
  createGetInitialProps,
  /*   createStylesServer,
  ServerStyles, */
} from '@mantine/next';

const getInitialProps = createGetInitialProps();
//const stylesServer = createStylesServer();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;0,6..72,800;1,6..72,200;1,6..72,300;1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700;1,6..72,800&display=swap'
            rel='stylesheet'
          />
          <link rel='icon' href='/dmg-favicon.ico' />
        </Head>

        <body
          style={{
            margin: '0px !important',
            /* position: 'absolute',
            width: '100vw !important', */
          }}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
