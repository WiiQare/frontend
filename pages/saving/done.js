import Head from 'next/head';
import DashboardLayout from '../../layouts/Dashboard';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Page = () => {
  const { redirect_status } = useRouter().query;

  return (
    <>
      <Head>
        <title>Paiement épargne fini</title>
      </Head>

      {redirect_status == 'succeeded' ? (
        <div className="flex flex-col gap-3 items-center mt-14">
          <Image
            src={'https://i.goopics.net/22c5x7.png'}
            width={80}
            height={80}
            className="w-36 opacity-90"
            alt="checkmark"
          />
          <span className="text-sm text-gray-600 ">
            Paiement effectué avec succès !
          </span>
        </div>
      ) : (
        <>Paiement échoué...</>
      )}
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;
