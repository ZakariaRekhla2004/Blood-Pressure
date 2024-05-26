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
// import Posts from "@/components/post/Posts";
// async function getTasks() {
//   try {
//     const data = await fs.readFile(
//       path.join(process.cwd(), "app/(daily_dev)/tasks.json")
//     );
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
export default async function App() {
  const session = (await getServerSession(authOptions)) as CustomSession;
  // const posts: APIResponseType<PostApiType> = await getPosts(
  //   session.user?.token!
  // );
  // const tasks = await getTasks();
  const data = await getAppoint(session.user!.token!);
  return (
    <div className="w-full pl-2 h-full">
      {/* <Posts data={posts} user={session.user!} /> */}
      <Cards user={session.user!}/>

      {/* <DataTableToolbar table={table} /> */}
      
      <Fullcalendar data={data}/>
      {/* <DataTable data={tasks} columns={columns} /> */}
    </div>
  );
}
