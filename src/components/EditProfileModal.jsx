import { useEffect, useState } from "react";
import { useUpdateRow } from "../hooks/useUpdateTableRow";
import { FaTimes } from "react-icons/fa";
import ProfileImageUploader from "./ProfileImageUploader";

export default function EditProfileModal({ vendor, onClose }) {
  const { mutate, isPending, error } = useUpdateRow({
    table: "users",
    queryKey: ["users"],
  });

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!vendor) return;

    setFormData({
      fullName: vendor.fullName || "",
      storeName: vendor.storeName || "",
      phone: vendor.phone || "",
      whatsapp: vendor.whatsapp || "",
      state: vendor.state || "",
      localGovernment: vendor.localGovernment || "",
      bankName: vendor.bankName || "",
      accountName: vendor.accountName || "",
      accountNumber: vendor.accountNumber || "",
      officeAddress: vendor.officeAddress || "",
    });
  }, [vendor]);

  const handleChange = (e) => {
    setFormData((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate({ id: vendor.id, updates: formData }, { onSuccess: onClose });
  };

  const input =
    "w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500";

  const disabledInput =
    "w-full p-3 rounded-lg bg-gray-800 text-gray-400 opacity-60 cursor-not-allowed";

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">
      <div className="bg-gray-900 w-full max-w-2xl rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold text-white mt-4 mb-6">Edit Profile</h2>

        {/* IMAGE */}
        <div className="mb-8">
          <ProfileImageUploader vendor={vendor} />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error.message}</p>}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* PROFILE */}
          <section className="space-y-4">
            <h3 className="text-gray-300 text-sm uppercase tracking-wider">
              Profile
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className={input}
              />

              <input
                name="storeName"
                placeholder="Store Name"
                value={formData.storeName}
                onChange={handleChange}
                className={input}
              />
            </div>
          </section>

          {/* CONTACT */}
          <section className="space-y-4">
            <h3 className="text-gray-300 text-sm uppercase tracking-wider">
              Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                value={formData.phone}
                disabled
                className={disabledInput}
              />
              <input
                value={formData.whatsapp}
                disabled
                className={disabledInput}
              />
            </div>
          </section>

          {/* LOCATION */}
          <section className="space-y-4">
            <h3 className="text-gray-300 text-sm uppercase tracking-wider">
              Location
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={input}
              />

              <input
                name="localGovernment"
                value={formData.localGovernment}
                onChange={handleChange}
                className={input}
              />
            </div>
          </section>

          {/* ADDRESS */}
          <section className="space-y-4">
            <h3 className="text-gray-300 text-sm uppercase tracking-wider">
              Address
            </h3>

            <textarea
              name="officeAddress"
              value={formData.officeAddress}
              onChange={handleChange}
              rows={4}
              className={input}
            />
          </section>

          {/* BANK */}
          <section className="space-y-4">
            <h3 className="text-gray-300 text-sm uppercase tracking-wider">
              Bank Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                value={formData.bankName}
                disabled
                className={disabledInput}
              />
              <input
                value={formData.accountName}
                disabled
                className={disabledInput}
              />
            </div>

            <input
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className={input}
            />
          </section>

          {/* ACTIONS */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-gray-700 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-green-600 rounded-lg disabled:opacity-50"
            >
              {isPending ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
