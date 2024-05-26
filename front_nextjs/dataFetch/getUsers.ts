import { Users } from "@/lib/apiEndPoints";
import myAxios from "@/lib/axios.config";
import { toast } from "react-toastify";

export async function getUsers(token: string) {
  try {
    const res = await myAxios.get(Users, {
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










