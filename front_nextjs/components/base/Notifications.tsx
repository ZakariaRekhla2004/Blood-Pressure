"use client";
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu1";
import { BellIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useState } from "react";
import { updateAppoint } from "@/dataFetch/updateAppoint";

interface Notification {
  status: "unread" | "read" | "rejected"; // Update status type for better type safety
  _id: string;
  sender: string;
  receiver: string;
  message: string;
  appoint_id: string;
  read: boolean;
}

interface NavbarProps {
  user: CustomUser;
  data: {
    notification: Notification[];
  };
}

const Navbar: React.FC<NavbarProps> = ({ user, data }) => {
  const [notifications, setNotifications] = useState(data.notification);

  const handleRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif._id === id ? { ...notif, status: "read", read: true } : notif
      )
    );
    const updateData = { status: "read" };
    await updateAppoint(user.token!, updateData, id);
  };

  const handleReject = async (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif._id === id ? { ...notif, status: "rejected", read: true } : notif
      )
    );
    const updateData = { status: "rejected" };
    await updateAppoint(user.token!, updateData, id);
  };

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          size="icon"
          variant="secondary"
          className="relative rounded-lg bg-white shadow-sm shadow-slate-400"
        >
          <BellIcon className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center h-4 w-4 text-xs font-bold text-white bg-red-600 rounded-full">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white w-[100%] max-h-60 overflow-y-auto">
        <DropdownMenuLabel className="flex justify-center text-lg text-blue-600 font-bold">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-600" />
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification._id}
              className={`flex justify-between shadow-sm my-1 hover:bg-slate-200 shadow-slate-300 items-center ${
                notification.read
                  ? "bg-gray-100"
                  : notification.status === "read"
                  ? "bg-green-100"
                  : notification.status === "rejected"
                  ? "bg-red-100"
                  : "bg-white"
              }`}
            >
              <span className="flex-1 text-xs font-semibold sm:text-sm text-gray-500 dark:text-gray-400">
                {notification.message}
              </span>
              <div className="flex items-center">
                <div className="border-l border-gray-400 h-6 mx-2"></div>
                <span className="p-1">
                  <Image
                    src="/icons8-check-96.png"
                    width={30}
                    height={30}
                    alt="approve"
                    onClick={async () => {
                      await handleRead(notification._id);
                      const data = { status: "Accept" };
                      await updateAppoint(user.token!, data, notification._id);
                    }}
                  />
                </span>
                <span className="p-1">
                  <Image
                    src="/icons8-reject-48.png"
                    width={30}
                    height={30}
                    alt="reject"
                    onClick={async () => {
                      await handleReject(notification._id);
                      const data = { status: "Rejected" };
                      await updateAppoint(user.token!, data, notification._id);
                    }}
                  />
                </span>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem>No notifications</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
