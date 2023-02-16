import { CiSaveDown1 } from "react-icons/ci";
import DropdownFilter from "../../../atoms/Dropdown/Filter";
import { Button } from "flowbite-react";
const CardTransaction = () => {
  return (
    <div className="border w-full rounded-lg py-8 px-6 flex flex-col md:flex-row justify-start gap-2 bg-white cursor-pointer">
      <div className="w-full">
        <h1 className="md:text-2xl text-gray-700 font-bold flex-wrap flex items-center gap-2 text-lg">
          Transactions History
        </h1>
      </div>
      <div className="w-full flex flex-col md:flex-row center justify-end space-x-2">
        <Button >
          <CiSaveDown1 className="mr-2 h-5 w-5" />
          Download Report
        </Button>
        <select className="select select-bordered md">
          <option disabled selected>
            Who shot first?
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
      </div>
    </div>
  );
};

export default CardTransaction;
