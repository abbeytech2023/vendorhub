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
    <div className="fixed inset-0 z-50 bg-gray-950 text-white flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-800 bg-gray-900 sticky top-0 z-10">
        <h2 className="text-lg sm:text-xl font-semibold">Edit Profile</h2>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white text-xl"
        >
          <FaTimes />
        </button>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-10">
        {/* IMAGE */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
          <ProfileImageUploader user={vendor} />
        </div>

        {error && <p className="text-red-500 text-sm">{error.message}</p>}

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* PROFILE */}
          <section className="space-y-4">
            <h3 className="text-gray-400 text-xs uppercase tracking-wider">
              Profile
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <h3 className="text-gray-400 text-xs uppercase tracking-wider">
              Contact
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <h3 className="text-gray-400 text-xs uppercase tracking-wider">
              Location
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <h3 className="text-gray-400 text-xs uppercase tracking-wider">
              Address
            </h3>

            <textarea
              name="officeAddress"
              value={formData.officeAddress}
              onChange={handleChange}
              rows={5}
              className={input}
            />
          </section>

          {/* BANK */}
          <section className="space-y-4">
            <h3 className="text-gray-400 text-xs uppercase tracking-wider">
              Bank Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </form>
      </div>

      {/* FOOTER ACTIONS (sticky like app UI) */}
      <div className="border-t border-gray-800 bg-gray-900 px-4 sm:px-8 py-4 flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg disabled:opacity-50"
        >
          {isPending ? "Updating..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
