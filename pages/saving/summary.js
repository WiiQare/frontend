import Head from "next/head";
import DashboardLayout from "../../layouts/Dashboard";
import SummarySaving from "../../components/organisms/Wallet/Summary";

const Page = () => {
  return (
    <>
      <Head>
        <title>{"Résumé & Premier paiement de l'épargne"}</title>
      </Head>
      <SummarySaving />

    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;
