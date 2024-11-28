import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Google Fonts */}
          <link
            href="https://fonts.googleapis.com/css?family=Raleway:400,300,500,600,700"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,700,300"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700"
            rel="stylesheet"
          />

          {/* Font Awesome */}
          <link href="/font-awesome/css/font-awesome.css" rel="stylesheet" />

          {/* Styles */}
          <link href="/css/bootstrap.min.css" rel="stylesheet" />
          <link href="/css/style.css" rel="stylesheet" />
          <link href="/css/responsiveness.css" rel="stylesheet" />
          <link href="/css/owl.carousel.css" rel="stylesheet" />
          <link href="/css/owl.theme.css" rel="stylesheet" />
          <link href="/css/owl.transitions.css" rel="stylesheet" />
          <link href="/css/prettyPhoto.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* External JS Libraries */}
          <script src="/js/library.js"></script>
          <script src="/js/bootstrap.min.js"></script>
          <script src="/js/owl.carousel.min.js"></script>
          <script src="/js/jquery.raty.js"></script>
          <script src="/js/ui.js"></script>
          <script src="/js/jquery.prettyPhoto.js"></script>
          <script src="/js/jquery.selectbox-0.2.js"></script>
          <script src="/js/theme-script.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
