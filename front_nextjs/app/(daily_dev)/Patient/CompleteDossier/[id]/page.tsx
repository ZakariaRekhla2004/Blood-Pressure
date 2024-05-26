import { authOptions, CustomSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { CompleteDossier } from "@/components/PatientPage/CompleteDossier";
import { getServerSession } from "next-auth";

export default async function page({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const session = (await getServerSession(authOptions)) as CustomSession;

  return(  <div className="w-full pl-2 h-full">
      <div className="flex items-center from-neutral-700 font-bold text-2xl pt-3 pl-4">
        {/* <PlusCircledIcon className="w-90 h-full " /> */}
        <p className="ml-3">Complete Patient Medical Folder</p>{" "}
        {/* Add margin-left to create space between the image and text */}
      </div>
      <div>
        <div className="flex   p-4 ">
            <CompleteDossier user={session.user!}  id={params.id} />;
        </div>
        
      </div>


    </div> );
}
