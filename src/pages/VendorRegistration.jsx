import { useForm } from "react-hook-form";
import {
  FaStore,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaListAlt,
  FaImage,
} from "react-icons/fa";

export default function VendorRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Vendor Data:", data);
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-green-400 to-emerald-600 flex items-center justify-center py-16">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-10">
        <h2 className="text-4xl font-bold text-green-600 text-center mb-6">
          Join VendorHub
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Start selling your products to thousands of customers today.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Store Name */}
          <div className="relative">
            <FaStore className="absolute left-3 top-3 text-green-500" />
            <input
              type="text"
              placeholder="Store Name"
              {...register("storeName", { required: "Store name required" })}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 ${
                errors.storeName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.storeName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.storeName.message}
              </p>
            )}
          </div>

          {/* Owner Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-green-500" />
            <input
              type="text"
              placeholder="Owner Name"
              {...register("ownerName", { required: "Owner name required" })}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 ${
                errors.ownerName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.ownerName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ownerName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-green-500" />
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="relative">
            <FaPhone className="absolute left-3 top-3 text-green-500" />
            <input
              type="tel"
              placeholder="Phone Number"
              {...register("phone", { required: "Phone number required" })}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* WhatsApp */}
          <div className="relative">
            <FaWhatsapp className="absolute left-3 top-3 text-green-500" />
            <input
              type="tel"
              placeholder="WhatsApp Number"
              {...register("whatsapp", {
                required: "WhatsApp number required",
              })}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 ${
                errors.whatsapp ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.whatsapp && (
              <p className="text-red-500 text-sm mt-1">
                {errors.whatsapp.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="relative">
            <FaListAlt className="absolute left-3 top-3 text-green-500" />
            <select
              {...register("category", { required: "Category required" })}
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

          {/* Logo Upload */}
          <div className="relative md:col-span-2">
            <FaImage className="absolute left-3 top-3 text-green-500" />
            <input
              type="file"
              {...register("logo")}
              accept="image/*"
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-2xl font-bold text-lg hover:bg-green-600 transition"
            >
              Register as Vendor
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
