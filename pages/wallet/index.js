import Head from "next/head";
import DashboardLayout from "../../layouts/Dashboard";
import Wallet from "../../components/organisms/Wallet";

const Page = () => {
  return (
    <>
      <Head>
        <title>My Wallet</title>
      </Head>
      <Wallet />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;
