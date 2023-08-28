import Link from 'next/link';
import { CiWallet } from 'react-icons/ci';
import { HiDotsVertical } from 'react-icons/hi';
import CardProgress from '../../atoms/Card/Progress';
import DropdownFilter from '../../atoms/Dropdown/Filter';

const WalletBalance = ({ wallet, progresses, data }) => {
  console.log(data);

  if (data.isLoading) return <>Loading...</>;
  return (
    <div className="container">
      <div className="bg-white drop-shadow-sm rounded-lg px-3 py-3">
        <div className="flex flex-row-reverse">
          <DropdownFilter
            icon={() => (
              <HiDotsVertical
                size={24}
                className="cursor-pointer text-gray-700"
              />
            )}
            labelClassName="border-none"
            chevronDown={false}
            items={['Delete', 'Edit']}
            dropClassName="!p-0 mt-10 w-28"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between px-6">
          <div className="flex gap-2 items-center">
            <CiWallet size={80} className="text-sky" />
            <div className="text-gray-700">
              <h1 className="font-semibold text-xl">{"Total d'épargne"}</h1>
              <h3 className="font-bold text-3xl">${wallet.amount}</h3>
            </div>
          </div>

          <div className="text-sm hidden md:block">
            <span className="uppercase">DERNIER DÉPÔT</span>
            <h6 className="text-gray-700"></h6>
          </div>

          <div className="text-sm hidden md:block">
            <span className="uppercase">Numéro de portefeuille</span>
            <h1 className=" text-gray-900 font-semibold hidden md:block">
              {wallet.number}
            </h1>
          </div>

          <span className="w-12 hidden md:block"></span>
        </div>

        <div className="px-6 mt-8 space-y-7">
          {data.data && data.data.length > 0 ? (
            <>
              {data.data.length == 1 ? (
                <div className="w-full bg-gray-200 rounded-full md:h-7">
                  <div
                    className={`bg-sky text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[${wallet.progress}%] h-full flex items-center justify-center`}
                  >
                    {' '}
                    {wallet.progress}%
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="grid md:grid-cols-2 gap-8 items-center">
                {data.data.map((saving, index) => (
                  <CardProgress
                    color={
                      saving.operations.length * 10 <= 50
                        ? 'text-purple'
                        : saving.operations.length * 10 > 50 &&
                          saving.operations.length * 10 <= 75
                        ? 'text-[#2ABB52]'
                        : 'text-[#441DE1]'
                    }
                    value={saving.operations.length * 10}
                    title={saving.type == 'MOI' ? 'POUR MOI' : saving.type}
                    amount={saving.amount}
                    currency={saving.currency}
                    className={
                      saving.operations.length * 10 <= 50
                        ? 'bg-[#F9F1FC]'
                        : saving.operations.length * 10 > 50 &&
                          saving.operations.length * 10 <= 75
                        ? 'bg-[#E3F9E9]'
                        : 'bg-[#F4F2FE]'
                    }
                    link={`/saving/${saving.id}`}
                    key={index}
                  />
                ))}

                <Link href={'/learn'} legacyBehavior>
                  <button className="border border-sky hover:bg-sky hover:text-white text-sky font-normal h-fit  py-4 md:px-9 px-5 rounded-lg text-lg transition duration-300">
                    + Générer un pass santé
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center my-10 md:my-20 gap-6">
              <img
                src="https://i.goopics.net/ozsga7.png"
                alt=""
                className="md:w-44 w-28 opacity-80"
              />
              <span className="text-gray-400 text-sm">
                Aucun épargne actuellement en cours...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
