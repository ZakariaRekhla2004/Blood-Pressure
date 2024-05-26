import { Dashboard_Stat } from "@/lib/apiEndPoints";
import myAxios from "@/lib/axios.config";

export async function getDashboard_Stat(token: string, nextPage?: string) {
  try {
    const res = await myAxios.get(Dashboard_Stat, {
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
