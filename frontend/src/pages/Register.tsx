import img from "../assets/register.png";
import Button from "../components/Common/Button";
import { Link, useNavigate } from "react-router-dom";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterData } from "../config/type";
import { registerAcc } from "../services/requestApi";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import LoadingDots from "../components/Loading/LoadingDots";

const Register = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();
  const schema: ZodType<RegisterData> = z.object({
    email: z.string().email(),
    userName: z.string().min(2).max(30),
    password: z.string().min(5).max(20),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(schema),
  });

  const registerUser = async (data: RegisterData) => {
    try {
      const response = await registerAcc(data);

      if (response.statusCode === 200) {
        reset();
        toast.success("Register Success!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error("registration failed!");
      console.log(error);
    }
  };
  if (loading) {
    return <LoadingDots />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#F3F8FD] to-[#F4F9FE] flex items-center justify-center">
      <div className="bg-white flex rounded-3xl shadow-lg max-w-3xl p-5">
        <div className="w-1/2 md:block hidden">
          <img src={img} alt="" className="rounded-2xl object-cover" />
        </div>

        <div className="md:w-1/2 px-8 py-2">
          <h2 className="text-3xl font-bold text-main">Register</h2>
          <p className=" text-base text-neutral-500">Create an Account</p>
          <form
            onSubmit={handleSubmit(registerUser)}
            className="flex flex-col gap-8 mt-8"
          >
            <div className="flex flex-col gap-2">
              <div className="relative flex justify-center items-center">
                <input
                  className="p-3 w-full rounded-xl border border-neutral-400 cursor-text transition duration-200"
                  type="email"
                  placeholder=" "
                  {...register("email")}
                />
                <span
                  className={`text-neutral-400 absolute left-3 mx-3 transition duration-200 input-transition`}
                >
                  Email
                </span>
              </div>
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="relative flex justify-center items-center">
                <input
                  className="p-3 w-full rounded-xl border border-neutral-400 cursor-text transition duration-200"
                  type="text"
                  placeholder=" "
                  {...register("userName")}
                />
                <span className="text-neutral-400 absolute left-3 mx-3 transition duration-200 input-transition">
                  Username
                </span>
              </div>
              {errors.userName && (
                <span className="text-red-600 text-sm">
                  {errors.userName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <div className="relative flex justify-center items-center">
                <input
                  className="p-3 w-full rounded-xl border border-neutral-400 cursor-text transition duration-200"
                  placeholder=" "
                  autoComplete="on"
                  type="password"
                  {...register("password")}
                />
                <span className="text-neutral-400 absolute left-3 mx-3 transition duration-200 input-transition">
                  Password
                </span>
              </div>

              {errors.password && (
                <span className="text-red-600 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <Button content="Register" onClick={() => {}} type="submit" />
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-neutral-500">
              Already have an Account?{" "}
            </span>
            <Link to={"/login"} className="text-main">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
