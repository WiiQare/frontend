import React, { Fragment, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'


const ContentModal = ({ title, children }) => {
	return (
		<div className="fixed inset-0 overflow-y-auto">
			<div className="flex items-center justify-center min-h-full p-4 text-center">
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl space-y-8">
						<Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
							{title}
						</Dialog.Title>

						<div className="mt-2">
							<div className="text-sm text-gray-500">
								{children}
							</div>
						</div>

					</Dialog.Panel>
				</Transition.Child>
			</div>
		</div>
	);
}

export default ContentModal;
