import Head from "next/head";

import DashboardLayout from "../layouts/Dashboard";

import VoucherHome from "../components/organisms/Dashboard/Voucher";
import ProviderFilter from "../components/organisms/Dashboard/ProviderFilter";
import Carousel from "../components/organisms/Dashboard/Carousel";

const Page = () => {

  return (
    <>
      <Head>
        <title>WiiQare - A smart and secure way to save and pay for your health</title>
        <script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
      </Head>
      <Carousel />
      <VoucherHome />
      <ProviderFilter />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;
