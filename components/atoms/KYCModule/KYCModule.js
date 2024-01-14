import KYC from "./kyc";

const GenericKYC = () => {
    return <div className="flex flex-col gap-6 justify-center items-center w-full h-96 bg-blue-200">Generic KYC Verification</div>
}

const KYCModule = () => {
    const useAuthlogic = true;

    return useAuthlogic? <KYC /> : <GenericKYC />
}

export default KYCModule;