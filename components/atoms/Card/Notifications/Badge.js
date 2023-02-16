import { Dropdown } from "flowbite-react";
import Image from "next/image";
import React from "react";

const NotificationBadge = ({ avatar, title, time }) => {
  return (
    <Dropdown.Item>
      <div className="flex items-center gap-3">
        <Image
          src={avatar}
          className="w-14 h-14 object-cover rounded-2xl"
          alt="avatar"
          width={56}
          height={56}
        />

        <span>
          <h3 className="font-bold">{title}</h3>
          <font className="text-xs text-gray-700">{time}</font>
        </span>
      </div>
    </Dropdown.Item>
  );
};

export default NotificationBadge;
