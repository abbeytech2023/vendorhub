import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaStore } from "react-icons/fa";
import { useLogin } from "../hooks/useLogin";
import LoadingButton from "../components/LoadingButton";

export default function Login() {
  const { login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  console.log(isSubmitting);

  const onSubmit = async (data) => {
    console.log(data);
    await login({ ...data });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6 text-green-500 text-3xl">
          <FaStore />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login to VendorHub
        </h2>

        <p className="text-center text-gray-500 text-sm mt-1">
          Access your vendor dashboard
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />

            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          {/* <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
          ></button> */}
          {
            <LoadingButton
              isLoading={isPending}
              text="Login"
              loadingText="logging in..."
            />
          }
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/vendor/register"
            className="text-green-500 font-semibold hover:underline"
          >
            Become a Vendor
          </Link>
        </p>
      </div>
    </div>
  );
}
