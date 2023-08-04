import Head from "next/head";
import DashboardLayout from "../../layouts/Dashboard";
import NewSaving from "../../components/organisms/Wallet/New";

const Page = () => {
  return (
    <>
      <Head>
        <title>{"Ajout d'un nouvelle épargne santé"}</title>
      </Head>
      <NewSaving />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;
