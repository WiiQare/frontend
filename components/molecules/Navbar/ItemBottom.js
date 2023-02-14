import Link from 'next/link';

const ItemBottom = ({title, icon, link, activePath}) => {
    return (
        <Link href={link} legacyBehavior>
            <span className={`flex flex-col gap-2 items-center justify-center text-gray-500 hover:text-sky ${activePath ? 'text-sky font-bold' : ''} transition-all duration-300 cursor-pointer`}>
                <span>
                    {icon({size: 20})}
                </span>
                <h6 className='text-xs'>
                    {title}
                </h6>
            </span>
        </Link>
    );
}

export default ItemBottom;