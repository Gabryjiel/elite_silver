import Head from 'next/head';
import Wrapper from '../components/Wrapper';

export default function Home() {
    return (
        <>
            <Head>
                <title>Prokrastynatorzy</title>
                <meta
                    name='description'
                    content='Generated by create next app'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Wrapper></Wrapper>
        </>
    );
}