import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Loader from "../components/Loader";
import axios from "axios";
import { User } from "../types";
import toast from "react-hot-toast";
import { useAuthContext } from "../hooks/useAuthContext";

type Props = {}

type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
  age: number;
};

const Signup = ({ }: Props) => {
  const { dispatch } = useAuthContext();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { isLoading, mutate } = useMutation({
    mutationFn: (data: FormData) => {
      return axios.post(`http://localhost:8080/auth/signup`, data)
    },
    onSuccess: (data) => {
      const user: User = {
        token: data.data.token,
        name: data.data.user.name,
        email: data.data.user.email,
        password: data.data.user.password,
        phone: data.data.user.phone,
        age: data.data.user.age,
      }
      dispatch({ type: "LOGIN", payload: user });
      localStorage.setItem('user', JSON.stringify(user));
      toast.success(data.data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    }
  })

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">

        {/* Name Field */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <input
            type="text"
            className={`border-2 px-4 py-2 w-full ${errors.name ? 'border-red-500' : 'border-gray-500'}`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 mt-2">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Email</label>
          <input
            type="email"
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

        {/* Password Field */}
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

        {/* Phone Field */}
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

        {/* Age Field */}
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
          {isLoading ? <Loader /> : "Signup"}
        </button>

        <Link to="/login" className="p-2 bg-sky-300 mb-8 mx-8 mt-2 text-center">
          Already User?
        </Link>
      </form>
    </div>
  );
};

export default Signup;