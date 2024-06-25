import Link from "next/link";
import Image from "next/image";
import { UsersIcon } from "lucide-react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
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
            <UsersIcon className="w-5 h-5" />
            <p>Mes Patient</p>
          </Link>
        </li>
        <li>
          <Link href="/Chat" className="flex space-x-3 items-center mb-4">
            <ChatBubbleIcon className="w-5 h-5" />
            <p> Chat </p>
          </Link>
        </li>

        <li>
          <Link href="/Appointment" className="mb-4 flex space-x-3 items-center">
            {/* <Ap className="w-5 h-5" /> */}
            
             <Image src="/icons8-appointment-100.png" alt={""}   width={20} height={20}/>
            <p>Appointment</p>
          </Link>
        </li>
      </ul>

    </div>
  );
}
