"use server";
import Image from "next/image";
import React from "react";
import SearchInput from "./SearchInput";
import { BellIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import ProfileMenu from "./ProfileMenu";
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";
import Notifications from "./Notifications";
import { getNotifications } from "@/dataFetch/getNotifications";

export default async function Navbar({ user }: { user: CustomUser }) {
  const notification = await getNotifications(user.token!);
  // console.log(notification);

  return (
    <nav className="flex justify-between items-center p-2 border-b shadow-sm shadow-slate-200  bg-gradient-to-t from-blue-50 via-blue-75 to-blue-100">
      <MobileSidebar />
      <div className="text-xl text-blue-900 font-bold pl-4">BP Tracker </div>
      {/* <Image src="/logo.svg" width={120} height={120} alt="logo" /> */}

      <div className="flex space-x-2 items-center">
        <Notifications user={user} data={notification} />
        <ProfileMenu user={user} />
      </div>
    </nav>
  );
}
