import Head from 'next/head';
import Wrapper from 'components/layout/Wrapper';
import Header from '../components/layout/Header';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { BreadcrumbsLink } from '../components/layout/Breadcrumbs/Breadcrumbs';

interface HomePageProps {
  breadcrumbsLinks: BreadcrumbsLink[];
}

export default function Index(props: HomePageProps) {
  return (
    <>
      <Head>
        <title>Elite Silver</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wrapper>
        <Header />
        <Breadcrumbs links={props.breadcrumbsLinks} />
      </Wrapper>
    </>
  );
}

export async function getStaticProps() {
  const breadcrumbsLinks = [{ label: 'Strona główna', href: '/' }];

  return {
    props: {
      breadcrumbsLinks,
    },
  };
}
