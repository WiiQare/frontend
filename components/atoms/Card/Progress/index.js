import Link from 'next/link';
import { useEffect } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const CardProgress = ({ title, amount, currency, operations, link }) => {
  const somme = operations.reduce(
    (accumulateur, objet) => accumulateur + objet.amount,
    0,
  );
  const percent = (somme / amount) * 100;

  useEffect(() => {}, [somme]);

  return (
    <Link href={link} legacyBehavior>
      <div
        role="progressbar"
        className={`${
          percent <= 50
            ? 'bg-[#F9F1FC]'
            : percent > 50 && percent <= 75
            ? 'bg-[rgba(255,69,0,0.2)]'
            : 'bg-[#E3F9E9]'
        } py-4 px-4 flex justify-between items-center pr-10 rounded-lg cursor-pointer hover:shadow-sm`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`radial-progress ${
              percent <= 50
                ? 'text-purple'
                : percent > 50 && percent <= 75
                ? 'text-[#FF4500]'
                : 'text-[#2ABB52]'
            }`}
            style={{ '--value': percent, '--size': '4rem' }}
          >
            {percent.toFixed(0)}%
          </div>
          <div>
            <h3 className="text-gray-700 font-bold text-sm capitalize">
              {title}
            </h3>
            <span className="text-sm">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency.toLowerCase(),
              }).format(amount)}
            </span>
          </div>
        </div>

        <div
          className={`shadow-xs hover:shadow-md p-2 border rounded-xl ${
            percent <= 50
              ? 'border-purple bg-purple'
              : percent > 50 && percent <= 75
              ? 'border-[#FF4500] bg-[#FF4500]'
              : 'border-[#2ABB52] bg-[#2ABB52]'
          } opacity-80`}
        >
          <HiOutlineArrowNarrowRight size={25} className={`text-white`} />
        </div>
      </div>
    </Link>
  );
};

export default CardProgress;
