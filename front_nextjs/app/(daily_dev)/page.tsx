"use server"
import React from "react";
import { getServerSession } from "next-auth";
import {
  CustomSession,
  authOptions,
} from "../api/auth/[...nextauth]/authOptions";
import { promises as fs } from "fs";
import { DataTable } from "@/components/Dashboard/Dashboard";
import { columns } from "@/components/Dashboard/columns";
import { z } from "zod";
import path from "path";
import { taskSchema } from "@/components/Dashboard/data/schema";
import { Cards } from "@/components/Dashboard/Cards";
import { Fullcalendar } from "@/components/Dashboard/appoint/Appointement";
import { getAppoint } from "@/dataFetch/getAppoint";
import { getUsers } from "@/dataFetch/getUsers";

export default async function App() {
  const session = (await getServerSession(authOptions)) as CustomSession;
 
  const users = await getUsers(session.user?.token!);
  return (
    <div className="w-full pl-2 h-full">
      {/* <Posts data={posts} user={session.user!} /> */}
      <Cards user={session.user!}/>

      {/* <DataTableToolbar table={table} /> */}
      
      {/* <Fullcalendar data={data}/> */}
      <DataTable data={users.hypo} columns={columns} />

      {/* <DataTable data={tasks} columns={columns} /> */}
    </div>
  );
}
