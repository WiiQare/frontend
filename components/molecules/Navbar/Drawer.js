import React from "react";

export default function Drawer() {
    return (
        <div className="drawer drawer-end fixed z-50">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <div className="flex flex-col py-8 px-5 md:w-72 w-full bg-white flex-shrink-0">
                    <div className="flex flex-row items-center justify-center h-12 w-full">
                        <div
                            className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                ></path>
                            </svg>
                        </div>
                        <div className="ml-2 font-bold text-2xl">QuickChat</div>
                    </div>
                    <div
                        className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg"
                    >
                        <div className="h-20 w-20 rounded-full border overflow-hidden">
                            <img
                                src="/images/homme.png"
                                alt="Avatar"
                                className="h-full w-full"
                                loading="lazy"
                            />
                        </div>
                        <div className="text-sm font-semibold mt-2">Peter NDENGO</div>
                        <div className="text-xs text-gray-500">frdrcpeter@gmail.com</div>
                        <div className="flex flex-row items-center mt-3">
                            <div
                                className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full"
                            >
                                <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
                            </div>
                            <div className="leading-none ml-1 text-xs">Active</div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-8">
                        <div className="flex flex-row items-center justify-between text-xs">
                            <span className="font-bold">Active Conversations</span>
                            <span
                                className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
                            >4</span
                            >
                        </div>
                        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                            <ItemMessage name={"Bienvenu Z."} message={2}/>
                            <ItemMessage name={"Brice K."} message={0}/>
                            <ItemMessage name={"Fred Muyco"} message={0}/>
                            <ItemMessage name={"Aleks R."} message={1}/>
                        </div>
                        <div className="flex flex-row items-center justify-between text-xs mt-6">
                            <span className="font-bold">Archivied</span>
                            <span
                                className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
                            >7</span
                            >
                        </div>
                        <div className="flex flex-col space-y-1 mt-4 -mx-2">
                            <button
                                className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                            >
                                <div
                                    className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                                >
                                    H
                                </div>
                                <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ItemMessage({name, message}) {
    return (
        <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
            <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full">
                <img src={`https://ui-avatars.com/api/?uppercase=true&background=random&name=${name}&bold=false&color=FFF`} alt="" className="rounded-full"/>
            </div>
            <div className="ml-2 text-sm font-semibold">{name}</div>

            {
                message > 0 ?
                <div
                    className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none"
                >
                    {message}
                </div> : <></>
            }
        </button>
    )
}