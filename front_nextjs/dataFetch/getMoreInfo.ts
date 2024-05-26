import { API_URL, Statistique_URL, Users } from "@/lib/apiEndPoints";
import myAxios from "@/lib/axios.config";
import { toast } from "react-toastify";

export async function getMoreInfo(token: string,patientId: string) {
  try {
    // console.log(patientId);
    const res = await myAxios.get(API_URL+`/Statistique/moreInfo?id=${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      // console.log(res.data);
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