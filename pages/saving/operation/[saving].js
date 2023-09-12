import Head from 'next/head';
import DashboardLayout from '../../../layouts/Dashboard';
import RechargeSaving from '../../../components/organisms/Wallet/Recharge';

const Page = () => {
    return (
        <>
            <Head>
                <title>{"Récharger mon épargne"}</title>
            </Head>
            <RechargeSaving />
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;
