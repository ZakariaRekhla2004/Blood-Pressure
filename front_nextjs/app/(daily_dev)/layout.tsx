
import Navbar from "@/components/base/Navbar";
import Sidebar from "@/components/base/Sidebar";
import { getServerSession } from "next-auth";
import {
  CustomSession,
  authOptions,
} from "../api/auth/[...nextauth]/authOptions";
import { useRouter } from "next/navigation";

export default async function DailyDevLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await getServerSession(authOptions)) as CustomSession;
  if (!session || !session.user || !session.user.token) {
    
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return (
    <div className="h-full">
      <Navbar user={session.user!} />
      <div className="flex h-full ">
        <Sidebar />
        <div className="flex justify-center items-center w-full overflow-y-scroll ">
          {children}
        </div>
      </div>
    </div>
  );
}
