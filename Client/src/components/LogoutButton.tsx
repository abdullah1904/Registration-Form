import { BsArrowBarLeft } from "react-icons/bs";
import { useAuthContext } from "../hooks/useAuthContext";
import toast from "react-hot-toast";

const LogoutButton = () => {
    const {dispatch} = useAuthContext();
    const handleLogout = () => {
        if (localStorage.getItem('user')) {
            localStorage.removeItem('user');
            dispatch({ type: 'LOGOUT' });
            toast.success("Logout Successfully");
        }
    }
    return (
        <div className="flex cursor-pointer tooltip tooltip-right" data-tip="Logout" onClick={handleLogout}>
            <div className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit">
                <BsArrowBarLeft className="text-2xl"/>
            </div>
        </div>
    )
}

export default LogoutButton