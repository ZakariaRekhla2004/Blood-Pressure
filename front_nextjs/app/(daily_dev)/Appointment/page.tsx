"use server";

import { authOptions, CustomSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { Fullcalendar } from "@/components/Dashboard/appoint/Appointement";
import { getAppoint } from "@/dataFetch/getAppoint";
import { getServerSession } from "next-auth";

export default async function App() {
  const session = (await getServerSession(authOptions)) as CustomSession;
    const data = await getAppoint(session.user!.token!);
    
  return (
    <div className="w-screen">
      <Fullcalendar  data={data} />
    </div>
  );
}
