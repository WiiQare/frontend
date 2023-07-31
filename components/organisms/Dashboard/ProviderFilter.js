import Image from "next/image";
import CardProvider from "../../atoms/Card/Provider";
import drc from "../../../public/images/drc.png";
import { useSession } from "next-auth/react";
import Fetcher from "../../../lib/Fetcher";

const ProviderFilter = () => {
  let { data: session } = useSession();
  const { data, isLoading, isError } = Fetcher(
    `/provider/list`,
    session.user.data.access_token
  );

  console.log(data);

  if (isLoading)
    return (
      <div className="px-4 space-y-4 pb-24 md:pb-4 flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="px-4 space-y-4 pb-24 md:pb-4">
      <h1 className="md:text-2xl text-gray-700 font-bold flex-wrap flex items-center gap-2 text-lg">
        Les hôpitaux partenaires en{" "}
        <Image src={drc} loading="lazy" className="w-6" alt="DRC" /> RD Congo
      </h1>
      {/* <div className="flex gap-2 flex-col md:flex-row md:gap-4 justify-between items-center">
        {filters.map((item, i) => (
          <DropdownFilter className="w-full md:w-1/3" {...item} key={i} />
        ))}
      </div> */}
      <div className="space-y-6">
        {data.map((provider, index) => (
          <CardProvider {...provider} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProviderFilter;
