import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CiDollar } from "react-icons/ci";

import ContentModal from '../Modal/content';

const ButtonEarn = ({ modal, children }) => {
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
                className="flex bg-sky px-4 py-4 justify-center text-white items-center rounded-xl hover:shadow-md gap-2 w-auto md:w-52">
                <CiDollar size={25} />
                <span className="text-xs font-light">Earn Budges for 10$</span>
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
                    <ContentModal title={modal.title} tabs={true}>
                        {children}
                    </ContentModal>
                </Dialog>
            </Transition>
        </>
    );
}

export default ButtonEarn;
