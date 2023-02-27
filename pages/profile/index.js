import Head from "next/head";
import { getSession } from "next-auth/react";
import DashboardLayout from "../../layouts/Dashboard";
import Profile from "../../components/organisms/Profile";

const Page = () => {
  return (
    <>
      <Head>
        <title>My Profile</title>
      </Head>
        <Profile />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

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
