import Head from "next/head";

function Layout(pageProps) {
  return (
    <>
      <Head>
        <title>{pageProps.title}</title>
        <meta name="description" content="website build with gsap" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kosugi&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div>{pageProps.children}</div>
    </>
  );
}

export default Layout;
