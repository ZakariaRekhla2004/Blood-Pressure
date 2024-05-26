import { json } from 'node:stream/consumers';
import { API_URL, Users } from "@/lib/apiEndPoints";
import myAxios from "@/lib/axios.config";

export async function getAppoint(token: string ) {
  try {
    const res = await myAxios.get(API_URL+`/apppoint/getAppointmentMedecin` ,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      return res.data;
    } else {
      console.log("Error: Status is not 200");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
        return null;
  }
}










