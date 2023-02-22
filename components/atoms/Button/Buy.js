import { Fragment, useState } from 'react'
import { HiOutlinePlus } from "react-icons/hi";
import { Dialog, Transition } from '@headlessui/react'
import ContentModal from '../Modal/content';

const ButtonBuy = ({ withIcon = true, modal, className, children }) => {
    let [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    return (
        <>
            <button
                onClick={openModal}
                htmlFor="my-modal-6" className={`flex items-center gap-2 justify-between rounded-lg bg-orange py-2 px-3 effect-up shadow ${className}`} >
                {withIcon ? (
                    <span className='bg-white text-sky p-1 rounded-md'>
                        <HiOutlinePlus />
                    </span>
                ) : <></>}
                <span className='text-sm font-light'>Buy now</span>
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <ContentModal title={modal.title}>
                        {children}
                    </ContentModal>
                </Dialog>
            </Transition>
        </>
    );
}

export default ButtonBuy;
