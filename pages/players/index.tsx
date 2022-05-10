import Head from 'next/head';
import Header from '../../components/layout/Header';
import Wrapper from '../../components/layout/Wrapper';

export default function Players() {
  return (
    <>
      <Head>
        <title>Elite Silver - Zawodnicy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wrapper>
        <Header />
      </Wrapper>
    </>
  );
}
