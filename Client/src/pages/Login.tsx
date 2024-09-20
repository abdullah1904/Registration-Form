import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Loader from "../components/Loader";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import toast from "react-hot-toast";
import { User } from "../types";

type Props = {};

type FormData = {
    email: string;
    password: string;
};

const Login = ({}: Props) => {
    const {dispatch} = useAuthContext();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const { isLoading, mutate } = useMutation({
        mutationFn: (data: FormData) =>{
            return axios.post("http://localhost:8080/auth/login",data)
        },
        onSuccess: (data) => {
            const user:User = {
                token: data.data.token,
                name: data.data.user.name,
                email: data.data.user.email,
                password: data.data.user.password,
                phone: data.data.user.phone,
                age: data.data.user.age,
            }
            dispatch({type: "LOGIN", payload: user});
            localStorage.setItem('user', JSON.stringify(user));
            toast.success(data.data.message);
        },
        onError: (error:any) => {
            toast.error(error.response.data.message);
        }
    });

    // Handle form submission
    const onSubmit = (data: FormData) => {
        mutate(data);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl my-4">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Email</label>
                    <input 
                        type="text" 
                        className={`border-2 px-4 py-2 w-full ${errors.email ? 'border-red-500' : 'border-gray-500'}`} 
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format"
                            }
                        })} 
                    />
                    {errors.email && <p className="text-red-500 mt-2">{errors.email.message}</p>}
                </div>
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Password</label>
                    <input 
                        type="password" 
                        className={`border-2 px-4 py-2 w-full ${errors.password ? 'border-red-500' : 'border-gray-500'}`} 
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long"
                            }
                        })} 
                    />
                    {errors.password && <p className="text-red-500 mt-2">{errors.password.message}</p>}
                </div>
                <button type="submit" className="p-2 bg-sky-300 mt-8 mx-8 mb-2">
                    {isLoading ? <Loader/> : "Login"}
                </button>
                <Link to="/signup" className="p-2 bg-sky-300 mb-8 mx-8 mt-2 text-center">
                    New User?
                </Link>
            </form>
        </div>
    );
};

export default Login;
