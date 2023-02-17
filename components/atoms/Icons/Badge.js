import React from "react";

const IconBadge = ({ children, total, onClick = () => {} }) => {
  return (
    <div
      className="relative inline-flex items-center p-3 text-sm font-medium text-center text-gray-500 hover:text-gray-700"
      onClick={onClick}
    >
      {children}
      <span className="sr-only">Notifications</span>
      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-sky border-2 border-white rounded-full top-0 right-0 dark:border-gray-900">
        {total}
      </div>
    </div>
  );
};

export default IconBadge;
