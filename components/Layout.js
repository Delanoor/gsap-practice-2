import Head from "next/head";

function Layout(pageProps) {
  return (
    <>
      <Head>
        <title>{pageProps.title}</title>
        <meta name="description" content="website build with gsap" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{pageProps.children}</div>
    </>
  );
}

export default Layout;
