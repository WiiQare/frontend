import Head from "next/head";
import DashboardLayout from "../../layouts/Dashboard";

import Transaction from "../../components/organisms/Transaction";

const Page = () => {
  return (
    <>
      <Head>
        <title>Transactions</title>
      </Head>
      <Transaction />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;