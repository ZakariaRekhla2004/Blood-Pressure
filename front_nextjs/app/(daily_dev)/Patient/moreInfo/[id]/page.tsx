"use server"

import {
  authOptions,
  CustomSession,
} from "@/app/api/auth/[...nextauth]/authOptions";
import DifferentLength from "@/components/Charts/Line";
import { getMoreInfo } from "@/dataFetch/getMoreInfo";
import { getServerSession } from "next-auth";

export default async function page({ params }: { params: { id: string } }) {
  const id = params.id;
  const session = (await getServerSession(authOptions)) as CustomSession;

  //   const data1 = await getMoreInfo(session.user?.token!, id);
  //    const  = data1.user;
  const data1 = await getMoreInfo(session.user?.token!, id);
  // console.log(data1);
  // const data2 = JSON.parse(data1);
  //   console.log(data1);
  return (
    <div className="w-full h-full">
      <section className="grid grid-cols-1 md:p-3">
        {/* Personal Information Section */}
        <div className="bg-white rounded-lg shadow-lg p-3 shadow-blue-100 dark:bg-gray-950">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-2xl font-bold py-2">Information Personnel</h3>
          </div>
          <hr className="border-gray-300 dark:border-gray-700 pb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-500 dark:text-gray-400">
            <div className="flex">
              <span className="font-bold mr-2">Name:</span>
              <p>{data1?.user?.name}</p>
            </div>
            <div className="flex">
              <span className="font-bold mr-2">Email:</span>
              <p>{data1?.user?.email}</p>
            </div>
            <div className="flex">
              <span className="font-bold mr-2">Weight:</span>
              <p>{data1?.user?.dossier_patient?.weight} kg</p>
            </div>
            <div className="flex">
              <span className="font-bold mr-2">Height:</span>
              <p>{data1?.user?.dossier_patient?.height} cm</p>
            </div>
            <div className="flex">
              <span className="font-bold mr-2">Gender:</span>
              <p>{data1?.user?.dossier_patient?.gender}</p>
            </div>
            <div className="flex">
              <span className="font-bold mr-2">City:</span>
              <p>{data1?.user?.dossier_patient?.city}</p>
            </div>
            <div className="flex">
              <span className="font-bold mr-2">Marital Status:</span>
              <p>{data1?.user?.dossier_patient?.marital_status}</p>
            </div>
            <div className="flex">
              <span className="font-bold mr-2">Date of Birth:</span>
              <p>{data1?.user?.dossier_patient?.date_of_birth}</p>
            </div>
            <div className="flex">
              <span className="font-bold mr-2">Family History:</span>
              <p>{data1?.user?.dossier_patient?.family_history.join(", ")}</p>
            </div>
            <div className="flex">
              <span className="font-bold mr-2">Personal History:</span>
              <p>{data1?.user?.dossier_patient?.personal_history.join(", ")}</p>
            </div>
          </div>
        </div>
      </section>
      {/* <DifferentLength/> */}
      <section className="grid grid-cols-1 md:grid-row-3 gap-2 p-3 md:p-3">
        <div className="bg-white rounded-lg shadow-blue-100 shadow-lg p-4 space-y-4 dark:bg-gray-950">
          <h3 className="text-xl font-bold">Medicament </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medicament Picture
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doze
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mg_g
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qr
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Temps
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data1?.user?.dossier_patient?.medications?.map(
                  (medication: any, index: any) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                       {/* <Image src={medication?.Qr} alt={""} width={60}  height={60} />  */}
                        <img src={`data:image/png;base64,${medication?.Qr}`} alt="Image"  className="w-7 h-9"/> 
                       {/* {medication?.Qr} */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {medication?.Nom}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {medication?.Doze ? medication?.Doze : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {medication?.Mg_g}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        {medication?.Temps ? medication?.Temps.join(", ") : "N/A"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-blue-100 shadow-lg p-6 space-y-4 dark:bg-gray-950">
          <h3 className="text-xl font-bold">Blood Pressure</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Systolique
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Diastolique
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Examen
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Heure Examen
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data1?.exams?.map((entry: any, index: any) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry?.Systolique}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry?.Diastolique}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry?.date_Examen}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry?.heure_Examen}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-blue-100 shadow-lg p-6 space-y-4 dark:bg-gray-950">
          <h3 className="text-xl font-bold">Activite</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Poids
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Taille
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Imc
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Exam
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data1?.activite?.map((entry: any, index: any) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry?.Poids}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry?.Taille}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{entry?.Imc}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry?.dateExam}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
