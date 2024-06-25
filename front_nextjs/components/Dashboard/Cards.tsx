"use client"
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboard_Stat } from "@/dataFetch/dashoardStat";
import { useEffect, useState } from "react";

export function Cards({ user }: { user: CustomUser }) {
  const [data, setData] = useState({
    totalPatients: 0,
    patientsThisMonth: 0,
    percentageChange: 0,
    Appointments : {
    nbr : 0,
    pass : 0,
    },
    notifications :{
      notification :0 ,
      read : 0,
    }
    
  });

  useEffect(() => {
    const fetchData = async () => {
      const stats = await getDashboard_Stat(user.token!);
      if (stats) {
        setData(stats);
      }
    };

    fetchData();
  }, [user.token]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium  ">Patient</CardTitle>
          <svg
            xmlns="http://www.w3.org/4000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-400">
            {data.totalPatients}
          </div>
          <p className="text-xs text-muted-foreground">
            {data.patientsThisMonth} added this month (+{data.percentageChange}%
            from last month)
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Rendez vous par jours
          </CardTitle>
          <svg
            xmlns="http://www.w3.org/4000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-400">{data.Appointments.nbr}</div>
          <p className="text-xs text-muted-foreground">{data.Appointments.pass} Rendez vous passé</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Notifications</CardTitle>
          <svg
            xmlns="http://www.w3.org/4000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-400">{data.notifications.notification}</div>
          <p className="text-xs text-muted-foreground">{data.notifications.read} already read</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Message</CardTitle>
          <svg
            xmlns="http://www.w3.org/4000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-400">9</div>
          <p className="text-xs text-muted-foreground">+2 since last hour</p>
        </CardContent>
      </Card>
    </div>
  );
}
