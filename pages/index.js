import Head from "next/head";

import DashboardLayout from "../layouts/Dashboard";

import VoucherHome from "../components/organisms/Dashboard/Voucher";
import Carousel from "../components/organisms/Dashboard/Carousel";
import HistoryWallet from "../components/organisms/Wallet/History";

const Page = () => {

  return (
    <>
      <Head>
        <title>JAMII - UNICEF CRYPTO</title>
        <script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
      </Head>
      <Carousel />
      <VoucherHome />
			<HistoryWallet />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;
