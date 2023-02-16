import Head from "next/head";
import { getSession } from "next-auth/react";
import DashboardLayout from "../layouts/Dashboard";

import Home from "../components/organisms/Home";

const Page = () => {
  return (
    <>
      <Head>
        <title>JAMII - UNICEF CRYPTO</title>
      </Head>
      <Home />
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
