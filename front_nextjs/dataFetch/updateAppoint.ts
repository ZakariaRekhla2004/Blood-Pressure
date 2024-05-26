import { json } from 'node:stream/consumers';
import { API_URL, Users } from "@/lib/apiEndPoints";
import myAxios from "@/lib/axios.config";

export async function updateAppoint(token: string ,data : any , id : string) {
  try {
    const res = await myAxios.put(API_URL+`/apppoint/updateStatus?id=${id}`,data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 201) {
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










