import { authOptions, CustomSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { API_URL, Users } from "@/lib/apiEndPoints";
import myAxios from "@/lib/axios.config";
import { getServerSession } from "next-auth";



export async function DeletePatient(patientId: string) {
    try {
      // console.log("////////////////"+patientId);
      const res = await myAxios.delete(API_URL+`/auth/deletePatient?id=${patientId}`);
      if (res.status === 200) {
        return res.data;
      } else {
        console.log("Error: Status is not 500");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
          return null;
    }
  }
  