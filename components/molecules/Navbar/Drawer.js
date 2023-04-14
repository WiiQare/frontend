import React, { useState, createContext, useContext } from "react";
import { DrawContext } from '../../../pages/_app';
import { BiArrowBack } from "react-icons/bi";
export const ChatContext = createContext();


export default function Drawer() {
    const [personalChat, setPersonalChat] = useState({state: true});
  const { draw, setDraw } = useContext(DrawContext);


    const handleChange = () => {
        setPersonalChat({state: true});
    }

    return (
        <div className="drawer drawer-end fixed z-50">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

                {
                    !personalChat.state ? <ListItemChat handleChange={() => handleChange()} /> : <Conversation close={() => setDraw(false)} />
                }

                
            </div>
        </div>
    );
}

function ItemMessage({name, message, onClick}) {
    return (
        <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2" onClick={() => onClick}>
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

function Conversation({close}) {

  return (
      <div class="flex flex-col bg-gray-100 flex-auto md:w-96 w-full h-full relative">
          <div className="p-5 shadow-sm flex gap-4 items-center bg-white fixed top-0 z-50 w-full">
              <button onClick={() => close()}>
                  <BiArrowBack size={23}/>
              </button>
              <div className="flex gap-2 items-center">
                  <img src={`/images/favicon.png`} alt="" className="rounded-xl w-10 h-10"/>
                  <h3 className="font-semibold text-gray-700">Aleks de WiiQare</h3>
              </div>
          </div>
          <div
              class="flex flex-col flex-auto flex-shrink-0 bg-gray-100 min-h-full pt-20 relative"
          >

              <div class="flex flex-col overflow-x-auto mb-4">
                  <div class="flex flex-col h-full">
                      <div class="grid grid-cols-12 gap-y-2">
                          <div class="col-start-1 col-end-12 p-3 rounded-lg">
                              <div class="flex flex-row items-center">
                                  <div
                                      class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                  >
                                      A
                                  </div>
                                  <div
                                      class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                  >
                                      <div>Hey How are you today?</div>
                                  </div>
                              </div>
                          </div>
                          <div class="col-start-1 col-end-12 p-3 rounded-lg">
                              <div class="flex flex-row items-center">
                                  <div
                                      class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                  >
                                      A
                                  </div>
                                  <div
                                      class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                                  >
                                      <div>
                                          Lorem ipsum dolor sit amet, consectetur adipisicing
                                          elit. Vel ipsa commodi illum saepe numquam maxime
                                          asperiores voluptate sit, minima perspiciatis.
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col-start-6 col-end-13 p-3 rounded-lg">
                              <div class="flex items-center justify-start flex-row-reverse">
                                  <div
                                      class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                  >
                                      B
                                  </div>
                                  <div
                                      class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                                  >
                                      <div>I'm ok what about you?</div>
                                  </div>
                              </div>
                          </div>

                      </div>
                  </div>
              </div>
              <div
                  class="flex flex-row items-center h-16 bg-white w-full px-4 absolute bottom-40 md:bottom-20"
              >
                  <div>
                      <button
                          class="flex items-center justify-center text-gray-400 hover:text-gray-600"
                      >
                          <svg
                              class="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                              <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                              ></path>
                          </svg>
                      </button>
                  </div>
                  <div class="flex-grow ml-4">
                      <div class="relative w-full">
                          <input
                              type="text"
                              class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                          />
                          <button
                              class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                          >
                              <svg
                                  class="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                              >
                                  <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  ></path>
                              </svg>
                          </button>
                      </div>
                  </div>
                  <div class="ml-4">
                      <button
                          class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-3 h-fit flex-shrink-0"
                      >
                          <span class="ml-2">
                              <svg
                                  class="w-4 h-4 transform rotate-45 -mt-px"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                              >
                                  <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                  ></path>
                              </svg>
                          </span>
                      </button>
                  </div>
              </div>
          </div>
      </div>
  )
}

function ListItemChat({handleChange}) {
    return (
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
                            <ItemMessage name={"Bienvenu Z."} message={2} onClick={() => handleChange()}/>
                            <ItemMessage name={"Brice K."} message={0} onClick={() => handleChange()}/>
                            <ItemMessage name={"Fred Muyco"} message={0} onClick={() => handleChange()}/>
                            <ItemMessage name={"Aleks R."} message={1} onClick={() => handleChange()}/>
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
    )
}