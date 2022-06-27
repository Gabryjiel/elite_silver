import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import {
  getPlayerCardInfos,
  getUserBans,
  getUserById,
  PlayerCardInfo,
  pluckPlayerIds,
} from '../../../../prisma/queries';
import { PlayerPageLayout } from '../../../components/layouts';
import { NextPageWithLayout } from '../../../types';
import { GlobalContext } from '../../_app';

type Paths = {
  id: string;
};

type Props = {
  cardInfos: PlayerCardInfo[];
  user: Awaited<ReturnType<typeof getUserById>>;
  bans: Awaited<ReturnType<typeof getUserBans>>;
};

type PageProps = Props & GlobalContext;

export const getStaticPaths: GetStaticPaths<Paths> = async () => {
  const userIds = await pluckPlayerIds();

  return {
    fallback: false,
    paths: userIds.map(({ id }) => ({
      params: {
        id: id.toString(),
      },
    })),
  };
};

export const getStaticProps: GetStaticProps<Props, Paths> = async (context) => {
  const userId = parseInt(context.params?.id ?? '0');
  const user = await getUserById(userId);
  const cardInfos = await getPlayerCardInfos(userId);
  const bans = await getUserBans(userId);

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      bans,
      cardInfos,
      user,
    },
  };
};

const PlayerBans: NextPageWithLayout<PageProps> = ({ bans, user }) => {
  return (
    <>
      <Head>
        <title>ES - {user?.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div data-role="bans-table" className="flex h-full w-full flex-col px-8">
        <div
          data-rol="bans-table-header"
          className="flex w-full justify-evenly rounded-t-xl border-2 border-stone-400 bg-stone-700 py-3 pr-4 text-center text-xl font-semibold"
        >
          <span className="flex-1 text-center">Banuje</span>
          <span className="flex-1 text-center">Liczba banów</span>
          <span className="flex-1 text-center">Przeciwko</span>
        </div>
        <div
          data-role="bans-table-body"
          className="flex h-11/12 flex-col overflow-y-auto border-2 border-t-0 border-stone-600 bg-stone-800 py-2"
        >
          {bans.map((ban) => {
            return (
              <div
                key={`picks-${ban.name}`}
                className="flex h-64 w-full items-center border-b-2 border-b-stone-600 py-4 last:border-b-0"
              >
                <div className="grid flex-1 place-items-center">
                  <div className="relative aspect-square h-16">
                    <Image
                      layout="fill"
                      objectFit="contain"
                      src={ban.icon}
                      alt={ban.name}
                      title={ban.name}
                      className="grayscale"
                    />
                  </div>
                </div>
                <span className="flex-1 text-center">{ban.count}</span>
                <span className="flex-1 text-center text-sm">
                  {ban.opponents.map((op) => {
                    return (
                      <div key={`ban-${ban.name}-${op.id}`}>
                        <Link href={`/players/${op.id}`} passHref>
                          <a className="cursor-pointer hover:underline">
                            {op.name}
                          </a>
                        </Link>
                        <span>{` x${op.count}`}</span>
                      </div>
                    );
                  })}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

PlayerBans.getLayout = (page) => {
  return (
    <PlayerPageLayout cardInfos={page.props.cardInfos} user={page.props.user}>
      {page}
    </PlayerPageLayout>
  );
};

export default PlayerBans;