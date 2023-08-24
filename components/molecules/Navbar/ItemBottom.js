import { useRouter } from 'next/router';
import { useContext } from 'react';
import { DrawContext } from '../../../pages/_app';

const ItemBottom = ({ title, icon, link, activePath }) => {
  const router = useRouter();
  const { draw, setDraw } = useContext(DrawContext);

  const navigate = (link) => {
    router.push(link);
    setDraw(false);
  };

  return (
    <>
      {link ? (
        <button onClick={() => navigate(link)} legacyBehavior>
          <span
            className={`flex flex-col gap-2 items-center justify-center text-gray-500 hover:text-sky ${
              activePath ? 'text-sky font-bold' : ''
            } transition-all duration-300 cursor-pointer`}
          >
            <span>{icon({ size: 20 })}</span>
            <h6 className="text-xs">{title}</h6>
          </span>
        </button>
      ) : (
        <span
          className={`flex flex-col gap-2 items-center justify-center text-gray-500 hover:text-sky ${
            activePath ? 'text-sky font-bold' : ''
          } transition-all duration-300 cursor-pointer`}
        >
          <span>{icon({ size: 20 })}</span>
          <h6 className="text-xs">{title}</h6>
        </span>
      )}
    </>
  );
};

export default ItemBottom;
