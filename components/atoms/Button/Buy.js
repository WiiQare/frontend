import { HiOutlinePlus } from "react-icons/hi";

const ButtonBuy = ({withIcon=true}) => {
    return (
        <>
            <button htmlFor="my-modal-6" className='flex items-center gap-2 justify-between rounded-lg bg-orange py-2 px-3 effect-up shadow'>
                {withIcon ? (
                    <span className='bg-white text-sky p-1 rounded-md'>
                        <HiOutlinePlus />
                    </span>
                ): <></>}
                <span className='text-sm font-light'>Buy now</span>
            </button>
        </>
    );
}

export default ButtonBuy;
