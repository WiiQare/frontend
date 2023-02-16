import { CiCircleList, CiSaveDown2 } from "react-icons/ci";

import DropdownFilter from "../../../atoms/Dropdown/Filter";
import { Button } from "flowbite-react";
const CardTransaction = () => {
  return (
    <div className="border w-full rounded-lg py-8 px-6 flex flex-col flex-wrap md:flex-row justify-between gap-4 bg-white cursor-pointer">
      <div className="">
        <h1 className="md:text-2xl text-gray-700 font-bold flex-wrap flex items-center gap-2 text-lg">
          Transactions History
        </h1>
      </div>
      <div className="flex flex-row flex-wrap  gap-2 center justify-end space-x-2">
        <DropdownFilter
          label="Sort By"
          className="w-[auto]"
          labelClassName="py-1 w-[auto] border-0"
          icon={() => <span className="h-[15px] w-[15px] rounded bg-primary" />}
          items={["Detail", "Cancel"]}
        />
        <Button className="bg-primary">
          <CiSaveDown2 className="mr-2 h-5 w-5" />
          Download Report
        </Button>
        <DropdownFilter
          label="Sort By"
          className="w-[auto]"
          labelClassName="py-1 w-[auto]"
          icon={() => <CiCircleList />}
          items={["Detail", "Cancel"]}
        />
      </div>
    </div>
  );
};

export default CardTransaction;
