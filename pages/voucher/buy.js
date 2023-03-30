import { createContext, useState } from "react";
import Head from "next/head";
import { useRouter } from 'next/router'
import DashboardLayout from "../../layouts/Dashboard";
import CardHeader from "../../components/atoms/Card/Header";
import Stepper from "../../components/atoms/Stepper";
import Step from "../../components/atoms/Stepper/step";
export const FormContext = createContext();

const Page = () => {

    const {step, redirect_status} = useRouter().query;
    const [activeStepIndex, setActiveStepIndex] = useState(step == "end" && redirect_status == "succeeded" ? 2 : 0);
    const [formData, setFormData] = useState({});

    return (
        <>
            <Head>
                <title>Buy a voucher</title>
            </Head>
            <div className="p-2 space-y-6 md:py-8 md:px-6">
                <CardHeader
                    title={"Buy a voucher"}
                    breadcrumbs={[
                        {
                            item: "Home",
                            link: "/"
                        },
                        {
                            item: "Buy a voucher",
                            link: "/voucher/buy"
                        }
                    ]}
                    download={false}
                    print={false}
                />

                <section className="w-full pb-20 md:pb-0">
                    <div className="w-full overflow-hidden md:col-span-2 rounded-lg py-8 flex flex-col gap-6 bg-white drop-shadow-sm">
                        <div className="px-8 space-y-8">
                            <div>
                                <span className="text-gray-400 text-sm font-normal">Set Forms</span>
                                <h2 className="font-semibold text-3xl">Buy Your Voucher</h2>
                            </div>
                            <div className="flex flex-col gap-4">
                                <FormContext.Provider value={{ activeStepIndex, setActiveStepIndex, formData, setFormData }}>
                                    <div className="flex flex-col items-center justify-start">
                                        <Stepper />
                                        <Step />
                                    </div>
                                </FormContext.Provider>
                            </div>
                        </div>

                    </div>
                </section>
            </div>
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout className="space-y-8">{page}</DashboardLayout>
);

export default Page;