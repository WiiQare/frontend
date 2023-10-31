import Link from 'next/link';
import Image from 'next/image';

const CardProvider = ({
  name,
  email,
  phone,
  address,
  logoLink,
  city,
  businessType,
  packages,
}) => {
  return (
    <div className="border hover:shadow rounded-lg py-4 px-5 flex flex-col md:flex-row justify-between gap-6 bg-white cursor-pointer">
      {/* Provider */}
      <div className="flex gap-3">
        <div className="w-32 h-24 md:w-40 md:h-32 border py-2 rounded-lg overflow-hidden">
          <img
            src={logoLink}
            className="object-contain w-full h-full"
            alt={name + ' Logo'}
            loading='lazy'
          />
        </div>

        <div className="flex flex-col gap-3 md:w-72">
          <div className="text-gray-700 space-y-2">
            <h3 className="text-lg md:text-lg font-bold">{name}</h3>
            <span className="text-sm font-light">{email}</span>
          </div>

          <span className="flex gap-3 items-center text-sm text-gray-700 font-light">
            <span className="bg-orange px-2 py-1 text-white text-sm rounded-md w-fit flex gap-3 items-center">
              {packages ? packages.length : 0} Plan
              {packages.length > 1 ? 's' : ''}
            </span>
          </span>
        </div>
      </div>

      {/* Category */}
      {/* <div className='space-y-2'>
                <span className='py-1 px-2 rounded-full bg-[rgba(254,128,35,.3)] text-xs text-gray-700 font-light flex items-center gap-2 w-fit'>Clinique <CiCircleInfo size={18} /></span>
                <ul className='space-y-2 w-64'>
                    <li className='flex items-center gap-2 text-xs text-gray-700 font-light'><FcCheckmark size={18}/> 4e Rue, C/Limete</li>
                </ul>
            </div> */}

      {/* Pricing */}
      <div className="text-gray-700 block items-center gap-4 md:space-y-2 md:w-64">
        <h5 className="font-light">Adresse</h5>
        <h3 className="text-2xl font-semibold">
          <span className="text-sm">{address}</span>
        </h3>
      </div>

      {/* Buttons */}
      <div className="self-center flex md:flex-col gap-3">
        <Link href={'#'} legacyBehavior>
          <button className="bg-blue-600 text-white font-extralight py-3 md:px-9 px-5 rounded-lg text-sm">
            En savoir plus
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardProvider;
