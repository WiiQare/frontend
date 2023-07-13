import Head from "next/head";
import DashboardLayout from "../../layouts/Dashboard";
import CardHeader from "../../components/atoms/Card/Header";

const Page = ({data}) => {

    return (
        <>
            <Head>
                <title>Envoyer un pass santé</title>
            </Head>
            <div className="p-2 space-y-6 md:py-8 md:px-6">
                <CardHeader
                    title={"Envoyer un pass santé"}
                    breadcrumbs={[
                        {
                            item: "Accueil",
                            link: "/"
                        },
                        {
                            item: "Envoyer un pass santé",
                            link: "/voucher/buy"
                        }
                    ]}
                    download={false}
                    print={false}
                />

                Hello
            </div>
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;