import { CiCircleInfo } from 'react-icons/ci';
import { HiUserGroup } from 'react-icons/hi';
import ButtonEarn from '../../atoms/Button/Earn';
import { TabPanel } from '../../atoms/Modal/content';
import { HiCreditCard } from 'react-icons/hi2';
import ButtonBuy from '../../atoms/Button/Buy';

const VoucherHome = () => {
  return (
    <div className="p-2 md:pb-8 md:px-6 flex flex-col md:flex-row gap-8 md:gap-12 justify-center">
      <div className="bg-white drop-shadow-sm rounded-xl py-6 px-10 md:px-24 flex flex-col justify-center items-center gap-8 w-full relative">
        <HiCreditCard size={60} className="text-orange" />
        <div className="space-y-3 text-center w-full flex flex-col justify-center items-center z-40">
          <h1 className="text-gray-800 text-lg">Prenez soin de vos proches </h1>
          <div className="buy">
            <ButtonBuy
              href={`/voucher/buy`}
              title={'Envoyer un pass santé'}
              className={'text-white py-3 px-4'}
            />
          </div>
          <span
            data-popover-target="popover-description"
            className="absolute z-50 top-1 right-6 cursor-pointer text-gray-700 md:text-gray-400"
          >
            <CiCircleInfo size={25} />
          </span>

          <div
            data-popover
            id="popover-description"
            role="tooltip"
            className="absolute z-50 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 "
          >
            <div className="p-3 space-y-2 text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Description
              </h3>
              <p>
                <strong>La pass santé WiiQare </strong> est un moyen rapide et
                sans frais de faciliter l’accès aux soins de qualité pour vos
                proches en Afrique.
              </p>


            </div>
            <div data-popper-arrow></div>
          </div>
        </div>
      </div>

      <div className="bg-white drop-shadow-sm rounded-xl py-6 px-10 md:px-24 flex flex-col justify-center items-center gap-8 w-full relative">
        <HiUserGroup size={60} className="text-sky" />
        <div className="space-y-3 text-center w-full flex flex-col items-center z-40">
          <h1 className="text-gray-800 text-lg">Invitez vos amis</h1>
          <ButtonEarn modal={{ title: 'Invite tes amis' }}></ButtonEarn>
          <span
            data-popover-target="popover-description"
            className="absolute top-1 right-6 cursor-pointer text-gray-700 md:text-gray-400"
          >
            <CiCircleInfo size={25} />
          </span>

          <div
            data-popover
            id="popover-description"
            role="tooltip"
            className="absolute z-50 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 "
          >
            <div className="p-3 space-y-2 text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Description
              </h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                cumque hic sunt nemo fugiat porro, exercitationem commodi velit
                dolor eos nam sint sapiente iure maxime vitae nisi error autem
                tempora.
              </p>


            </div>
            <div data-popper-arrow></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoucherHome;
