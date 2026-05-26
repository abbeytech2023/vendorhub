import { useState } from "react";
import { useForm } from "react-hook-form";
import { useVendors } from "../hooks/useVendors";
import { useAllProducts } from "../hooks/useFecthProducts";
import { useAuthContext } from "../hooks/useAuthContext";
import toast from "react-hot-toast";

import { categoryOptions, conditionOptions } from "../constants/ProductOptions";

import {
  uploadProductImage,
  createProductAdmin,
} from "../services/ProductService";

export default function SuperAdminDashboard() {
  const { data: stores } = useVendors();
  const { products } = useAllProducts();
  const { user } = useAuthContext();

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // REGISTER IMAGE FIELD
  const imageRegister = register("image");

  // WATCH STORE
  const selectedStoreId = watch("store");

  // FIND STORE
  const selectedStore = stores?.find(
    (store) => String(store.id) === String(selectedStoreId),
  );

  // STORE VALUES
  const storeUid = selectedStore?.uid || "";
  const storeWhatsapp = selectedStore?.whatsapp || "";
  const storeCategory = selectedStore?.category || "";
  const storeName = selectedStore?.storeName || "";

  // SUBMIT
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      let imageUrl = "";

      console.log("FORM DATA:", data);
      console.log("IMAGE:", data.image);
      console.log("FIRST IMAGE:", data.image?.[0]);

      // UPLOAD IMAGE
      if (data.image?.[0]) {
        imageUrl = await uploadProductImage(data.image[0]);
      }

      // CREATE PRODUCT
      await createProductAdmin({
        name: data.productName,
        uid: storeUid,
        whatsapp: storeWhatsapp,

        // STORE CATEGORY
        category: data.productCategory,

        // PRODUCT CONDITION
        condition: data.condition,

        price: Number(data.price),
        inStock: true,
        description: data.description,
        image: imageUrl,

        // OPTIONAL FLAGS
        // sponsored: data.sponsored || false,
        // featured: data.featured || false,

        vendor: storeName,
      });

      toast.success("Product added successfully");

      reset();
      setImagePreview(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-12 bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Super Admin Dashboard
          </h1>

          <p className="text-slate-500 mt-2">
            Manage vendors, products, stores, and platform activity.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <p className="text-slate-500 text-sm">Total Vendors</p>

            <h2 className="text-3xl font-bold text-slate-900 mt-3">
              {stores?.length || 0}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
            <p className="text-slate-500 text-sm">Total Products</p>

            <h2 className="text-3xl font-bold text-slate-900 mt-3">
              {products?.length || 0}
            </h2>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6"
        >
          <div className="grid md:grid-cols-2 gap-5">
            {/* PRODUCT NAME */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Name
              </label>

              <input
                type="text"
                placeholder="Enter product name"
                {...register("productName", {
                  required: "Product name is required",
                })}
                className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

              {errors.productName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.productName.message}
                </p>
              )}
            </div>

            {/* STORE */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Store
              </label>

              <select
                {...register("store", {
                  required: "Please select a store",
                })}
                className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select a store</option>

                {stores?.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.storeName}
                  </option>
                ))}
              </select>

              {errors.store && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.store.message}
                </p>
              )}
            </div>

            {/* STORE UID */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Store UID
              </label>

              <input
                type="text"
                value={storeUid}
                readOnly
                placeholder="Store UID"
                className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-100 outline-none"
              />
            </div>

            {/* STORE WHATSAPP */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Store WhatsApp
              </label>

              <input
                type="text"
                value={storeWhatsapp}
                readOnly
                placeholder="Store WhatsApp"
                className="w-full border border-slate-300 rounded-2xl px-4 py-3 bg-slate-100 outline-none"
              />
            </div>

            {/* PRODUCT CATEGORY */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Category
              </label>

              <select
                {...register("productCategory", {
                  required: "Select product category",
                })}
                className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Product Category</option>

                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {errors.productCategory && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.productCategory.message}
                </p>
              )}
            </div>

            {/* PRODUCT CONDITION */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Condition
              </label>

              <select
                {...register("condition", {
                  required: "Select product condition",
                })}
                className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Product Condition</option>

                {conditionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {errors.condition && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.condition.message}
                </p>
              )}
            </div>

            {/* PRICE */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Price
              </label>

              <input
                type="number"
                placeholder="Enter price"
                {...register("price", {
                  required: "Price is required",
                })}
                className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Product Description
            </label>

            <textarea
              rows={4}
              placeholder="Enter product description"
              {...register("description")}
              className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* IMAGE */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Upload Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              {...imageRegister}
              onChange={(e) => {
                imageRegister.onChange(e);

                const file = e.target.files?.[0];

                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              className="w-full border border-dashed border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
            />

            {/* IMAGE PREVIEW */}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-56 object-cover rounded-2xl border border-slate-200 shadow-sm"
                />
              </div>
            )}
          </div>

          {/* CHECKBOXES */}
          <div className="mt-5 flex gap-6 flex-wrap">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" {...register("sponsored")} />
              Sponsored Product
            </label>

            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" {...register("featured")} />
              Featured On Homepage
            </label>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-2xl font-medium hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
