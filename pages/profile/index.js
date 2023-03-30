import Head from "next/head";
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