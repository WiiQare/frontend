import Head from "next/head";
import DashboardLayout from "../../layouts/Dashboard";

import Hospital from "../../components/organisms/Hospitals";
import { useContext, useEffect } from "react";
import { DrawContext } from "../_app";

const Page = () => {

  const { draw, setDraw } = useContext(DrawContext);

  useEffect(() => {
   setDraw(false)
  }, [setDraw]);

  return (
    <>
      <Head>
        <title>Liste des hôpitaux</title>
      </Head>
      <Hospital />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;