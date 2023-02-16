import Image from "next/image";

import { CiCircleList, CiFilter } from "react-icons/ci";

import CardProvider from "../../atoms/Card/Provider";
import DropdownFilter from "../../atoms/Dropdown/Filter";

import drc from "../../../public/images/drc.png";

const filters = [
  {
    label: "Sort By",
    icon: () => <CiCircleList />,
    items: ["Provider", "Price: Highest to Lowest", "Price: Lowest to Highest"],
  },

  {
    label: "Category",
    icon: () => <CiFilter />,
    items: [
      "All",
      "Comprehensive Care",
      "TeleHealth",
      "At Home Care",
      "Speciality",
    ],
  },

  {
    label: "Monthly budget",
    icon: () => <CiCircleList />,
  },
];

const ProviderFilter = () => {
  return (
    <div className="px-4 space-y-4">
      <h1 className="md:text-2xl text-gray-700 font-bold flex-wrap flex items-center gap-2 text-lg">
        You are viewing care plans in country{" "}
        <Image src={drc} loading="lazy" className="w-6" /> DR Congo
      </h1>
      <div className="flex gap-2 flex-col md:flex-row md:gap-4 justify-between items-center">
        {filters.map((item, i) => (
          <DropdownFilter className="w-full md:w-1/3" {...item} key={i} />
        ))}
      </div>
      <div className="space-y-6">
        <CardProvider />
        <CardProvider />
      </div>
    </div>
  );
};

export default ProviderFilter;
