import React from "react";

const IconBadge = ({ children, className, total = 0, onClick = () => {} }) => {
  return (
    <div
      className={`relative inline-flex items-center p-3 text-sm font-medium text-center text-gray-500 hover:text-gray-700 ${className}`}
      onClick={onClick}
    >
      {children}
      <span className="sr-only">Notifications</span>
      {total ? (
        <></>
      ) : (
        <div className="absolute inline-flex items-center justify-center w-3 h-3 text-xs font-bold text-white bg-sky border-2 border-white rounded-full top-0 right-2 dark:border-gray-900"></div>
      )}
    </div>
  );
};

export default IconBadge;
