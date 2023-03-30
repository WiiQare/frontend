import Head from "next/head";
import DashboardLayout from "../layouts/Dashboard";

const Page = () => {
  return (
    <>
      <Head>
        <title>Invoices</title>
      </Head>
      <div>
        <h2 className="text-black font-w700 mt-4">Invoices</h2>
      </div>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;