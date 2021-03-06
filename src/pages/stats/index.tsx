import Head from 'next/head';
import { GetStaticProps } from 'next/types';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { BreadcrumbsLink } from '../../components/layout/Breadcrumbs/Breadcrumbs';
import { Header } from '../../components/layout/Header';
import { Wrapper } from '../../components/layout/Wrapper';

interface Props {
  breadcrumbsLinks: BreadcrumbsLink[];
}

export default function Stats(props: Props) {
  return (
    <>
      <Head>
        <title>ES - Statystyki</title>
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

export const getStaticProps: GetStaticProps<Props> = async () => {
  const breadcrumbsLinks = [
    { label: 'Strona główna', href: '/' },
    { label: 'Statystyki', href: '/stats' },
  ];

  return {
    props: {
      breadcrumbsLinks,
    },
  };
};
