import Link from 'next/link';

const CardProgress = ({ color, value, title, amount, className, link }) => {
  return (
    <Link href={link} legacyBehavior>
      <div
        role="progressbar"
        className={`${className} py-4 px-4 rounded-lg flex items-center gap-4 cursor-pointer hover:shadow-sm`}
      >
        <div
          className={`radial-progress ${color}`}
          style={{ '--value': value, '--size': '4rem' }}
        >
          {value}%
        </div>
        <div>
          <h3 className="text-gray-700 font-bold text-sm">{title}</h3>
          <span className="text-sm">${amount}</span>
        </div>
      </div>
    </Link>
  );
};

export default CardProgress;
