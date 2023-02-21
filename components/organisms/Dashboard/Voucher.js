import { CiDollar, CiInboxIn } from "react-icons/ci";
import WithQR from "../../atoms/Card/Debit/withQR";

const VoucherHome = () => {
  return (
    <div className="p-2 md:py-8 md:px-6 flex flex-col md:flex-row gap-8 md:gap-12">
      <div className="md:min-w-5/6 flex">
        <WithQR />
      </div>

      <div className="bg-white drop-shadow-sm rounded-xl py-6 px-24 flex flex-col justify-center items-center gap-8 w-fit">
        <CiInboxIn size={50} className="text-sky" />
        <div className="space-y-3 text-center w-full">
          <h1 className="text-gray-800 text-lg">Invite your friends</h1>
          <button className="flex bg-sky px-4 py-4 justify-center text-white items-center rounded-xl hover:shadow-md gap-2 w-auto md:w-52">
            <CiDollar size={25} />
            <span className="text-xs font-light">Earn Budges for 10$</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoucherHome;
