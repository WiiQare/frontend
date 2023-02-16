import Head from "next/head";
import { getSession } from "next-auth/react";
import DashboardLayout from "../layouts/Dashboard";
import Wallet from "../components/molecules/Wallet";

const Page = () => {
  return (
    <>
      <Head>
        <title>My Wallet</title>
      </Head>
      <div>
        <Wallet />
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
