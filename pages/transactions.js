import Head from "next/head";
import { getSession } from "next-auth/react";
import DashboardLayout from "../layouts/Dashboard";

const Page = () => {
  return (
    <>
      <Head>
        <title>Transactions</title>
      </Head>

      <div>
        <h2 className="text-black font-w700 mt-4">Transactions</h2>
      </div>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}
