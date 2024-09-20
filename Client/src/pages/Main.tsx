import { useQuery } from "react-query"
import { useAuthContext } from "../hooks/useAuthContext"
import axios from "axios";
import EditButton from "../components/EditButton";
import LogoutButton from "../components/LogoutButton";
import { useState } from "react";
import EditModal from "../components/EditModal";

type Props = {}

const Main = ({ }: Props) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const { user } = useAuthContext().state;
  const { data } = useQuery({
    queryKey: "user",
    queryFn: () => {
      return axios.get("http://localhost:8080/user", { headers: { Authorization: `Bearer ${user?.token}` } });
    }
  })
  return (
    <>
    <div className="p-4">
      <h1 className="text-3xl my-4">User</h1>
      <div className="border-2 border-sky-400 rounded-xl w-fit p-4 grid grid-cols-2">
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Name</span>
          <span>{data?.data.user.name}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Email</span>
          <span>{data?.data.user.email}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Phone</span>
          <span>{data?.data.user.phone}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Age</span>
          <span>{data?.data.user.age}</span>
        </div>
        <div className="my-4 flex justify-start">
          <LogoutButton />
        </div>
        <div className="my-4 flex justify-end">
          <span onClick={()=> setShowEditModal(true)}>
            <EditButton />
          </span>
        </div>
      </div>
    </div>
    {showEditModal && <EditModal setShowEditModal={setShowEditModal}/>}
    </>
  )
}

export default Main