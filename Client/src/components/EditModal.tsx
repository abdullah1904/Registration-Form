import { useForm } from "react-hook-form";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Loader from "./Loader";

type Props = {
    setShowEditModal: (value: boolean) => void;
};

const EditModal = ({ setShowEditModal }: Props) => {
    const {state: { user},dispatch } = useAuthContext();
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => {
            return axios.put('http://localhost:8080/user', data, { headers: { Authorization: `Bearer ${user?.token}` } })
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('user');
            const {updatedUser} = data.data;
            const user = JSON.parse(localStorage.getItem('user')!);
            const newUser = {...user,name:updatedUser.name, phone:updatedUser.phone, age: updatedUser.age};
            localStorage.setItem('user', JSON.stringify(newUser));
            dispatch({type: "LOGIN", payload: newUser});
            setShowEditModal(false);
        }
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.name,
            phone: user?.phone,
            age: user?.age,
        }
    });

    const onSubmit = (data: any) => {
        mutate(data);
    };

    const handleClose = () => {
        setShowEditModal(false);
    };

    return (
        <dialog className="modal modal-open">
            <div className="modal-box">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col rounded-xl p-4 mx-auto">
                    <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={handleClose}
                    >
                        ✕
                    </button>
                    <h3 className="font-bold text-lg">Edit User</h3>

                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Name</label>
                        <input
                            type="text"
                            className={`border-2 px-4 py-2 w-full ${errors.name ? 'border-red-500' : 'border-gray-500'}`}
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && <p className="text-red-500 mt-2">{errors.name.message}</p>}
                    </div>

                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Phone</label>
                        <input
                            type="tel"
                            className={`border-2 px-4 py-2 w-full ${errors.phone ? 'border-red-500' : 'border-gray-500'}`}
                            {...register("phone", {
                                required: "Phone is required",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Phone number must contain only numbers"
                                },
                                minLength: {
                                    value: 11,
                                    message: "Phone number must be exactly 11 digits"
                                },
                                maxLength: {
                                    value: 11,
                                    message: "Phone number must be exactly 11 digits"
                                }
                            })}
                        />
                        {errors.phone && <p className="text-red-500 mt-2">{errors.phone.message}</p>}
                    </div>

                    <div className="my-4">
                        <label className="text-xl mr-4 text-gray-500">Age</label>
                        <input
                            type="number"
                            className={`border-2 px-4 py-2 w-full ${errors.age ? 'border-red-500' : 'border-gray-500'}`}
                            {...register("age", {
                                required: "Age is required",
                                min: {
                                    value: 18,
                                    message: "Age must be greater than 18"
                                },
                                max: {
                                    value: 45,
                                    message: "Age must be less than 45"
                                }
                            })}
                        />
                        {errors.age && <p className="text-red-500 mt-2">{errors.age.message}</p>}
                    </div>

                    <button type="submit" className="p-2 bg-sky-300 mt-8 mx-8 mb-2">
                        {isLoading ? <Loader /> : "Save Changes"}
                    </button>
                </form>
            </div>
        </dialog>
    );
};

export default EditModal;
