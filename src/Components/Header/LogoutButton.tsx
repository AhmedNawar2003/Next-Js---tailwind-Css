"use client"
import { DOMAIN } from "@/app/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LogoutButton = () => {
    const router = useRouter();
    const logoutHandler = async () => {
        try {
            await axios.get(`${DOMAIN}/api/users/logout`);
            router.push("/");
            router.refresh();
        } catch (error) {
            toast.warning("Something went wrong");
            console.error(error);
        }
    }
  return (
    <button onClick={logoutHandler} className="bg-red-500 text-gray-200 p-2 rounded">
      Logout
    </button>
  )
}

export default LogoutButton
