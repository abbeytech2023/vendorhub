import { useForm } from "react-hook-form";
import {
  FaStore,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaListAlt,
  FaLock,
} from "react-icons/fa";
import LoadingButton from "../components/LoadingButton";
import StateSelect from "../components/StateSelect";
import LocalGovtSelect from "../components/LgaSelect";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

export default function VendorRegistration() {
  const { signup, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "",
    },
  });

  const [selectedState, setSelectedState] = useState("");

  const password = watch("password");
  const role = watch("role");

  const onSubmit = (data) => {
    const {
      fullName,
      email,
      password,
      phone,
      storeName,
      whatsapp,
      category,
      state,
      localGovernment,
      role,
    } = data;

    signup({
      fullName,
      email,
      password,
      phone,
      storeName,
      whatsapp,
      category,
      state,
      localGovernment,
      role,
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center py-16">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-10">
        <h2 className="text-4xl font-bold text-green-600 text-center mb-4">
          Join VendorHub
        </h2>

        <p className="text-center text-gray-500 mb-10">
          Start selling your products to thousands of customers today.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Role */}
          <div className="relative md:col-span-2">
            <FaUser className="absolute left-3 top-3 text-green-500" />

            <select
              {...register("role", { required: "Role is required" })}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Role</option>
              <option value="vendor">Vendor</option>
              <option value="shopper">Shopper</option>
            </select>

            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Full Name */}
          <InputField
            icon={<FaUser />}
            placeholder={role === "vendor" ? "Owner Full Name" : "Full Name"}
            name="fullName"
            register={register}
            errors={errors}
            rules={{ required: "Full name required" }}
          />

          {/* Vendor-only fields */}
          {role === "vendor" && (
            <>
              {/* Store Name */}
              <InputField
                icon={<FaStore />}
                placeholder="Store Name"
                name="storeName"
                register={register}
                errors={errors}
                rules={{ required: "Store name required" }}
              />

              {/* Category */}
              <div className="relative">
                <FaListAlt className="absolute left-3 top-3 text-green-500" />

                <select
                  {...register("category", {
                    required: "Category required",
                  })}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="phones">Phones & Accessories</option>
                  <option value="food">Food</option>
                  <option value="home">Home & Living</option>
                  <option value="beauty">Beauty</option>
                </select>

                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* State */}
          <StateSelect
            register={register}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
          />

          {/* LGA */}
          <LocalGovtSelect register={register} selectedState={selectedState} />

          {/* Email */}
          <InputField
            icon={<FaEnvelope />}
            placeholder="Email"
            name="email"
            register={register}
            errors={errors}
            type="email"
            rules={{
              required: "Email required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            }}
          />

          {/* Phone */}
          <InputField
            icon={<FaPhone />}
            placeholder="Phone Number"
            name="phone"
            register={register}
            errors={errors}
            rules={{ required: "Phone number required" }}
          />

          {/* WhatsApp */}
          <InputField
            icon={<FaWhatsapp />}
            placeholder="WhatsApp Number"
            name="whatsapp"
            register={register}
            errors={errors}
            rules={{ required: "WhatsApp number required" }}
          />

          {/* Password */}
          <InputField
            icon={<FaLock />}
            placeholder="Password"
            name="password"
            type="password"
            register={register}
            errors={errors}
            rules={{
              required: "Password required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
          />

          {/* Confirm Password */}
          <InputField
            icon={<FaLock />}
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            errors={errors}
            rules={{
              required: "Confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            }}
          />

          {/* Submit */}
          <div className="md:col-span-2">
            <LoadingButton
              text="Create Account"
              isLoading={isPending}
              loadingText="Creating user..."
            />
          </div>
        </form>
      </div>
    </section>
  );
}

function InputField({
  icon,
  placeholder,
  name,
  register,
  errors,
  rules,
  type = "text",
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-3 text-green-500">{icon}</span>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
      />

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}
