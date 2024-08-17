import loginImg from "../assets/login.jpg";
import Button from "../components/Common/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginData } from "../config/type";
import { loginAcc } from "../services/requestApi";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import LoadingDots from "../components/Loading/LoadingDots";

const Login = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const schema: ZodType<LoginData> = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(20),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const login = async (data: LoginData) => {
    try {
      const response = await loginAcc(data);
      if (response.statusCode === 200) {
        reset();
        toast.success("Login Success!");
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error("Login Failed!");
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
          <img src={loginImg} alt="" className="rounded-2xl object-cover" />
        </div>

        <div className="md:w-1/2 px-8 md:px-12 py-5">
          <h2 className="text-2xl font-bold">
            Welcome to <span className="text-main">Homeey.</span>{" "}
          </h2>
          <p className=" text-sm text-neutral-500">
            Please enter your details to log in
          </p>
          <form
            onSubmit={handleSubmit(login)}
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
            <Button content="Login" onClick={() => {}} type="submit" />
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-neutral-500">
              Dont't have an Account?{" "}
            </span>
            <Link to={"/register"} className="text-main">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
