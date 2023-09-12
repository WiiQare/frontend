import Head from 'next/head';
import DashboardLayout from '../../layouts/Dashboard';
import DetailsTransaction from '../../components/organisms/Transaction/details';
import Fetcher from '../../lib/Fetcher';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Page = () => {
  const { data: session } = useSession();
  const { query } = useRouter();
  const { data, isLoading, isError } = Fetcher(
    `/savings/details/${query.slug}`,
    session.user.data.access_token,
  );

  return (
    <>
      <Head>
        <title>Épargne de Santé</title>
      </Head>
      <DetailsTransaction
        data={data}
        isLoading={isLoading}
        isError={isError}
        slug={query.slug}
        fullname={session.user.data.names}
        email={session.user.data.email}
        phone={session.user.data.phoneNumber}
      />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;
