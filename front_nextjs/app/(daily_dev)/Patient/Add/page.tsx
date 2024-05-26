import React from "react";
import { getServerSession } from "next-auth";
import {
  CustomSession,
  authOptions,
} from "../../../api/auth/[...nextauth]/authOptions";
import { promises as fs } from "fs";
import { z } from "zod";
import path from "path";
import { taskSchema } from "@/components/Dashboard/data/schema";
import Image from "next/image";
import { AddPatient } from "@/components/PatientPage/AddPatient";
import { PlusCircledIcon } from "@radix-ui/react-icons";

// import Posts from "@/components/post/Posts";
export default async function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await getServerSession(authOptions)) as CustomSession;
 

  return (
    <div className="w-full pl-2 h-full">
      <div className="flex items-center from-neutral-700 font-bold text-2xl pt-3 pl-4">
        <PlusCircledIcon className="w-90 h-full " />
        <p className="ml-3">Add Patient</p>{" "}
        {/* Add margin-left to create space between the image and text */}
      </div>
      <div>
        <div className="flex   p-4 ">
            <AddPatient user={session.user!}  />
        </div>
        
      </div>


    </div>
  );
}
