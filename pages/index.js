import Head from 'next/head';

import DashboardLayout from '../layouts/Dashboard';

import VoucherHome from '../components/organisms/Dashboard/Voucher';
import ProviderFilter from '../components/organisms/Dashboard/ProviderFilter';
import Carousel from '../components/organisms/Dashboard/Carousel';
import { useContext, useEffect } from 'react';
import { DrawContext } from './_app';

const Page = () => {
  const { draw, setDraw } = useContext(DrawContext);

  useEffect(() => {
    setDraw(false);
  }, [setDraw]);

  return (
    <>
      <Head>
        <title>
          WiiQare - Un moyen intelligent et sécurisé d&apos;économiser et de payer pour votre santé
        </title>
        <script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
      </Head>
      <Carousel />
      <VoucherHome />
      {/* <ProviderFilter /> */}
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;
