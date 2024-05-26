import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Search, Flame, ArrowBigUp, Link as LinkIcon } from "lucide-react";
import { ChatBubbleIcon, PlusCircledIcon } from "@radix-ui/react-icons";
// import AddPost from "../post/AddPost";

export default function SidebarLinks() {
  return (
    <div className="h-full">
      <Link href="/" className="flex space-x-4 items-center py-4">
        <Image src="/avatar.png" width={30} height={30} alt="person" />
        <p> Home</p>
      </Link>

      <p className="my-2 font-bold text-muted-foreground">Discover</p>
      <ul>
      <li>
          <Link href="/Patient" className="mb-4 flex space-x-3 items-center">
            <Search className="w-5 h-5" />
            <p>Mes Patient</p>
          </Link>
        </li>
        <li>
          <Link href="/" className="flex space-x-3 items-center mb-4">
            <ChatBubbleIcon className="w-5 h-5" />
            <p> Chat </p>
          </Link>
        </li>

        <li>
          <Link href="/Appointment" className="mb-4 flex space-x-3 items-center">
            <PlusCircledIcon className="w-5 h-5" />
            <p>Appointment</p>
          </Link>
        </li>
      </ul>

      {/* <p className="my-2 font-bold text-muted-foreground">Contribute</p>
      <ul>
        <li>
          {/* <AddPost /> */}
        {/* </li>
      </ul> */} 
    </div>
  );
}
