import Head from "next/head";
import DashboardLayout from "../../layouts/Dashboard";
import Profile from "../../components/organisms/Profile";
import { useSession } from "next-auth/react";

const Page = () => {
  
	const { data } = useSession();

  console.log(data.user.data);
  return (
    <>
      <Head>
        <title>My Profile</title>
      </Head>
        <Profile {...data.user.data} />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;