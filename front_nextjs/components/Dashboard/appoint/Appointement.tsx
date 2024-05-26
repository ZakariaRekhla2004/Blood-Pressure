"use client";

import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
export function Fullcalendar( { data }: { data : any }) {

  return (
    // fc-today-button fc-button fc-button-primary
    <div className="p-2 w-full max-h-screen overflow-y-scroll ">
        <style jsx>{`
        .fc-toolbar {
          border-bottom: 2px solid #1c3faa; 
        }
        .fc-button {
          background-color: ##2596be; 
          border-color: ##2596be; 
        }
        .fc-button-primary:hover {
          background-color: #163a8b; 
          border-color: #163a8b;
        }
      `}</style>
      <p className="  text-3xl text-blue-800 font-semibold">
        Appointment Calendar
      </p>
      <div className="border border-b-2 w-full my-2 border-blue-800"></div>
      <div className=" w-full">
        <FullCalendar
          plugins={[
            resourceTimelinePlugin,
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin,
          ]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek',
          }}
          initialView="dayGridMonth"
          nowIndicator={true}
          initialEvents={data}
        />
      </div>
    </div>
  

    //         <div className="bg-white rounded-lg shadow-blue-100 shadow-lg p-4 space-y-4 dark:bg-gray-950">
    //           <h3 className="text-xl font-bold">Medicament </h3>
    //           <div className="overflow-x-auto">
    //             <table className="min-w-full divide-y divide-gray-200">
    //               <thead className="bg-gray-50">
    //                 <tr>
    //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                     Nom
    //                   </th>
    //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                     Day
    //                   </th>
    //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                     Hours
    //                   </th>
    //                 </tr>
    //               </thead>
    //               <tbody className="bg-white divide-y divide-gray-200">
    //                 {data1?.user?.dossier_patient?.medications?.map(
    //                   (medication: any, index: any) => (
    //                     <tr key={index}>
    //                       <td className="px-6 py-4 whitespace-nowrap">
    //                         {medication?.Nom}
    //                       </td>
    //                       <td className="px-6 py-4 whitespace-nowrap">
    //                         {medication?.doze ? medication?.doze : "N/A"}
    //                       </td>
    //                       <td className="px-6 py-4 whitespace-nowrap">
    //                         {medication?.Mg_g}
    //                       </td>
    //                       <td className="px-6 py-4 whitespace-nowrap">
    //                         {medication?.Qr}
    //                       </td>
    //                       <td className="px-6 py-4 whitespace-nowrap">
    //                         {medication?.Temps ? medication?.Temps.join(", ") : "N/A"}
    //                       </td>
    //                     </tr>
    //                   )
    //                 )}
    //               </tbody>
    //             </table>
    //           </div>
    //         </div>
  );
}
