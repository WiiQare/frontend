import Head from "next/head";
import DashboardLayout from "../../layouts/Dashboard";
import DetailsTransaction from "../../components/organisms/Transaction/details";

const Page = () => {
  return (
    <>
      <Head>
        <title>Épargne de Santé</title>
      </Head>
      <DetailsTransaction />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;
