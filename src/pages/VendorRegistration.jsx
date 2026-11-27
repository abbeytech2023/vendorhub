import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  FaStore,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaListAlt,
  FaLock,
  FaShoppingBag,
  FaTools,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

import LoadingButton from "../components/LoadingButton";
import StateSelect from "../components/StateSelect";
import LocalGovtSelect from "../components/LgaSelect";

import { useSignup } from "../hooks/useSignup";
import { slugify } from "../utility/slug";

export default function VendorRegistration() {
  const { signup, isPending } = useSignup();

  const [selectedState, setSelectedState] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    shouldUnregister: true,
    defaultValues: {
      role: "",
    },
  });

  const role = watch("role");
  const password = watch("password");

  const isBusiness = role === "vendor";
  const isServiceProvider = role === "artisan";
  const isShopper = role === "shopper";

  const hasBusinessProfile = isBusiness || isServiceProvider;

  const roleOptions = [
    {
      value: "vendor",
      title: "Vendor",
      description: "I want to sell products on VendorHub.",
      icon: <FaStore />,
    },
    {
      value: "shopper",
      title: "Shopper",
      description: "I want to discover and buy products.",
      icon: <FaShoppingBag />,
    },
    {
      value: "artisan",
      title: "Service Provider",
      description: "I offer professional services to customers.",
      icon: <FaTools />,
    },
  ];

  const onSubmit = (data) => {
    const {
      fullName,
      email,
      password,
      phone,
      whatsapp,
      role,
      storeName,
      category,
      state,
      localGovernment,
    } = data;

    const slug = hasBusinessProfile ? slugify(storeName) : null;

    signup({
      fullName,
      email,
      password,
      phone,
      whatsapp: hasBusinessProfile ? whatsapp : null,
      storeName: hasBusinessProfile ? storeName : null,
      category: hasBusinessProfile ? category : null,
      state,
      localGovernment,
      role,
      slug,
    });
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-green-100 text-green-600 w-16 h-16 rounded-2xl mb-4">
            <FaStore size={28} />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Join VendorHub
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account and become part of our growing community.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 md:p-9">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* STEP 1: SELECT ROLE */}
            <div className="mb-8">
              <div className="mb-5">
                <h2 className="text-xl font-bold text-gray-800">
                  1. How do you want to use VendorHub?
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Select the option that best describes you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {roleOptions.map((item) => {
                  const selected = role === item.value;

                  return (
                    <label
                      key={item.value}
                      className={`relative cursor-pointer rounded-2xl border-2 p-4 transition-all
                      ${
                        selected
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <input
                        type="radio"
                        value={item.value}
                        {...register("role", {
                          required: "Please select an account type.",
                        })}
                        className="sr-only"
                      />

                      {selected && (
                        <FaCheckCircle className="absolute top-3 right-3 text-green-600" />
                      )}

                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-3
                        ${
                          selected
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {item.icon}
                      </div>

                      <h3 className="font-bold text-gray-800">{item.title}</h3>

                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </label>
                  );
                })}
              </div>

              {errors.role && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* CONDITIONAL REGISTRATION FORM */}

            {role && (
              <div className="border-t border-gray-100 pt-7">
                {/* PERSONAL INFORMATION */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    2. Personal Information
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Tell us a little about yourself.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <InputField
                    icon={<FaUser />}
                    label="Full Name"
                    placeholder="Enter your full name"
                    name="fullName"
                    register={register}
                    errors={errors}
                    rules={{
                      required: "Your full name is required.",
                    }}
                  />

                  <InputField
                    icon={<FaEnvelope />}
                    label="Email Address"
                    placeholder="example@email.com"
                    name="email"
                    type="email"
                    register={register}
                    errors={errors}
                    rules={{
                      required: "Email address is required.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address.",
                      },
                    }}
                  />
                </div>

                {/* BUSINESS INFORMATION */}
                {hasBusinessProfile && (
                  <div className="mt-9">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-gray-800">
                        3.{" "}
                        {isBusiness
                          ? "Business Information"
                          : "Service Information"}
                      </h2>

                      <p className="text-sm text-gray-500 mt-1">
                        {isBusiness
                          ? "Provide details about your store so customers can find your products."
                          : "Tell customers about the services you offer."}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <InputField
                        icon={<FaStore />}
                        label={
                          isBusiness
                            ? "Business / Store Name"
                            : "Business / Service Name"
                        }
                        placeholder={
                          isBusiness
                            ? "e.g. Abbey Fashion Store"
                            : "e.g. Abbey Plumbing Services"
                        }
                        name="storeName"
                        register={register}
                        errors={errors}
                        rules={{
                          required: "Business name is required.",
                        }}
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {isBusiness
                            ? "Business Category"
                            : "Service Category"}
                        </label>

                        <div className="relative">
                          <FaListAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" />

                          <select
                            {...register("category", {
                              required: "Please select a category.",
                            })}
                            className={`w-full pl-12 pr-4 h-14 rounded-xl border bg-white outline-none focus:ring-2 focus:ring-green-500
                            ${
                              errors.category
                                ? "border-red-500"
                                : "border-gray-200"
                            }`}
                          >
                            <option value="">Select a category</option>

                            {isBusiness ? (
                              <>
                                <option value="phones">
                                  Phones & Accessories
                                </option>
                                <option value="home">Home & Living</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Fashion">Fashion</option>
                                <option value="School">School</option>
                                <option value="Vehicles">Vehicles</option>
                                <option value="Homes">Homes</option>
                                <option value="Kids">Kids</option>
                                <option value="Health">Health</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Others">Others</option>
                              </>
                            ) : (
                              <>
                                <option value="Services">
                                  General Services
                                </option>
                                <option value="real-estate">Real Estate</option>
                                <option value="housing-agents">
                                  Housing Agents
                                </option>
                                <option value="Vehicles">
                                  Vehicle Services
                                </option>
                                <option value="Electronics">
                                  Electronics Repairs
                                </option>
                                <option value="home">Home Services</option>
                                <option value="Health">Health Services</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Others">Others</option>
                              </>
                            )}
                          </select>
                        </div>

                        {errors.category && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.category.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* LOCATION */}
                <div className="mt-9">
                  <h2 className="text-xl font-bold text-gray-800">
                    {hasBusinessProfile ? "4." : "3."} Your Location
                  </h2>

                  <p className="text-sm text-gray-500 mt-1 mb-5">
                    Where are you located?
                  </p>

                  <div className="grid md:grid-cols-2 gap-5">
                    <StateSelect
                      register={register}
                      selectedState={selectedState}
                      setSelectedState={setSelectedState}
                    />

                    <LocalGovtSelect
                      register={register}
                      selectedState={selectedState}
                    />
                  </div>
                </div>

                {/* CONTACT INFORMATION */}
                <div className="mt-9">
                  <h2 className="text-xl font-bold text-gray-800">
                    {hasBusinessProfile ? "5." : "4."} Contact Information
                  </h2>

                  <p className="text-sm text-gray-500 mt-1 mb-5">
                    Provide a phone number customers can reach you on.
                  </p>

                  <div className="grid md:grid-cols-2 gap-5">
                    <InputField
                      icon={<FaPhone />}
                      label="Phone Number"
                      placeholder="08012345678"
                      name="phone"
                      register={register}
                      errors={errors}
                      rules={{
                        required: "Phone number is required.",
                        pattern: {
                          value: /^[0-9]{11}$/,
                          message: "Enter exactly 11 digits.",
                        },
                      }}
                    />

                    {hasBusinessProfile && (
                      <InputField
                        icon={<FaWhatsapp />}
                        label="WhatsApp Number"
                        placeholder="08012345678"
                        name="whatsapp"
                        register={register}
                        errors={errors}
                        rules={{
                          required: "WhatsApp number is required.",
                          pattern: {
                            value: /^[0-9]{11}$/,
                            message: "Enter exactly 11 digits.",
                          },
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="mt-9">
                  <h2 className="text-xl font-bold text-gray-800">
                    {hasBusinessProfile ? "6." : "5."} Secure Your Account
                  </h2>

                  <p className="text-sm text-gray-500 mt-1 mb-5">
                    Create a password to protect your account.
                  </p>

                  <div className="grid md:grid-cols-2 gap-5">
                    <InputField
                      icon={<FaLock />}
                      label="Password"
                      placeholder="Create a password"
                      name="password"
                      type="password"
                      register={register}
                      errors={errors}
                      rules={{
                        required: "Password is required.",
                        minLength: {
                          value: 8,
                          message: "Use at least 8 characters.",
                        },
                        validate: (value) => {
                          if (!/[0-9]/.test(value)) {
                            return "Include at least one number.";
                          }

                          if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                            return "Include at least one special character.";
                          }

                          return true;
                        },
                      }}
                    />

                    <InputField
                      icon={<FaLock />}
                      label="Confirm Password"
                      placeholder="Enter your password again"
                      name="confirmPassword"
                      type="password"
                      register={register}
                      errors={errors}
                      rules={{
                        required: "Please confirm your password.",
                        validate: (value) =>
                          value === password || "Passwords do not match.",
                      }}
                    />
                  </div>
                </div>

                {/* SUBMIT */}
                <div className="mt-10">
                  <LoadingButton
                    text={
                      isShopper
                        ? "Create Shopper Account"
                        : isBusiness
                          ? "Register My Business"
                          : "Register as Service Provider"
                    }
                    isLoading={isPending}
                    loadingText="Creating your account..."
                  />

                  <p className="text-center text-xs text-gray-400 mt-4">
                    By registering, you agree to use VendorHub responsibly.
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* REUSABLE INPUT FIELD */

function InputField({
  icon,
  label,
  placeholder,
  name,
  register,
  errors,
  rules,
  type = "text",
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600">
          {icon}
        </span>

        <input
          type={type}
          placeholder={placeholder}
          {...register(name, rules)}
          className={`w-full pl-12 pr-4 h-14 rounded-xl border bg-white outline-none focus:ring-2 focus:ring-green-500 transition
          ${errors[name] ? "border-red-500" : "border-gray-200"}`}
        />
      </div>

      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}
