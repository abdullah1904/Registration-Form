import { FaEdit } from "react-icons/fa"


type Props = {}

const EditButton = ({}: Props) => {
  return (
    <div className="flex cursor-pointer tooltip tooltip-left" data-tip="Edit">
            <div className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit">
                <FaEdit className="text-2xl"/>
            </div>
        </div>
  )
}

export default EditButton