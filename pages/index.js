import Head from "next/head";
import { getSession } from "next-auth/react";

import DashboardLayout from "../layouts/Dashboard";

import VoucherHome from "../components/organisms/Dashboard/Voucher";
import ProviderFilter from "../components/organisms/Dashboard/ProviderFilter";
import Carousel from "../components/organisms/Dashboard/Carousel";

const Page = () => {
  return (
    <>
      <Head>
        <title>JAMII - UNICEF CRYPTO</title>
        <script src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
      </Head>
      <Carousel />
      <VoucherHome />
      <ProviderFilter />
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
