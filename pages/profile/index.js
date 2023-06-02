import Head from "next/head";
import DashboardLayout from "../../layouts/Dashboard";
import Profile from "../../components/organisms/Profile";
import { useSession } from "next-auth/react";
import Fetcher from "../../lib/Fetcher";
import { useContext, useEffect } from "react";
import { DrawContext } from "../_app";

const Page = () => {
  
	const { data:session } = useSession();
  const { draw, setDraw } = useContext(DrawContext);

  useEffect(() => {
   setDraw(false)
  }, [setDraw]);

  return (
    <>
      <Head>
        <title>Mon profil</title>
      </Head>
        <Profile {...session.user.data} />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;