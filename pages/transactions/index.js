import Head from "next/head";
import { getSession } from "next-auth/react";
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

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}
