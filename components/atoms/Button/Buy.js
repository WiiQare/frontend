import Link from 'next/link';
import { HiOutlinePlus } from 'react-icons/hi';

const ButtonBuy = ({ className, href, title, withIcon = true }) => {
  return (
    <Link href={href ?? '#'} legacyBehavior>
      <a
        className={`flex items-center gap-2 justify-between rounded-lg bg-orange py-2 px-3 effect-up shadow ${className}`}
      >
        {withIcon ? (
          <span className="bg-white text-sky p-1 rounded-md">
            <HiOutlinePlus />
          </span>
        ) : (
          <></>
        )}
        <span className="text-sm font-light">{title}</span>
      </a>
    </Link>
  );
};

export default ButtonBuy;
