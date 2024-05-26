"use server"
import React from "react";
import { getServerSession } from "next-auth";
import {
  CustomSession,
  authOptions,
} from "../../api/auth/[...nextauth]/authOptions";
import { DataTable } from "@/components/Dashboard/Dashboard";
import { columns } from "@/components/Dashboard/columns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { getUsers } from "@/dataFetch/getUsers";

// import Posts from "@/components/post/Posts";
// async function getTasks() {
//   try {
//     const tasks = JSON.parse(data.toString());
//     return z.array(taskSchema).parse(tasks);
//   } catch (error: any) {
//     if (error.code === "ENOENT") {
//       console.error("tasks.json file not found");
//       return [];
//     }
//     throw error;
//   }
// }
export default async function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await getServerSession(authOptions)) as CustomSession;

  console.log(
    "---------------------------------------------------------------"
  );
  const users = await getUsers(session.user?.token!);
  console.log(users);
  console.log(
    "---------------------------------------------------------------"
  );
  return (
    <div className="w-full pl-2 h-full">
      <div className="flex items-center from-neutral-700 font-bold text-2xl pt-3 pl-4">
        <Image src="/icons8-list-100.png" width={30} height={30} alt="person" />
        <p className="ml-3">Patient List</p>{" "}
        {/* Add margin-left to create space between the image and text */}
      </div>
      <div>
        <div className="flex  justify-end  p-4 ">
          <Button className=" bg-gradient-to-br from-blue-300 to-blue-700 text-white font-semibold">
            <PlusCircledIcon className="w-5 h-5 " />
            <Link href="/Patient/Add" className="pl-2">
              Add Patient
            </Link>
          </Button>
        </div>
      </div>

      <DataTable data={users.user} columns={columns} />
    </div>
  );
}
