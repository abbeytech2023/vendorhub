import { useEffect, useState } from "react";
import { useUpdateRow } from "../hooks/useUpdateTableRow";
import { FaTimes } from "react-icons/fa";

export default function EditProfileModal({ vendor, onClose }) {
  const { mutate, isPending, error } = useUpdateRow({
    table: "users",
    queryKey: ["users"],
  });

  const [formData, setFormData] = useState({
    fullName: "",
    storeName: "",
    phone: "",
    whatsapp: "",
    state: "",
    localGovernment: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    profilePicture: "",
  });

  // preload vendor data
  useEffect(() => {
    if (vendor) {
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
        profilePicture: vendor.profilePicture || "",
      });
    }
  }, [vendor]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(
      {
        id: vendor.id,
        updates: formData,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 w-full max-w-2xl rounded-2xl p-5 relative max-h-[90vh] overflow-y-auto">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <FaTimes />
        </button>

        <h2 className="text-xl font-bold text-white mt-8 mb-4">Edit Profile</h2>

        {/* ERROR */}
        {error && <p className="text-red-500 text-sm mb-2">{error.message}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2 rounded bg-gray-800 text-white outline-none"
          />

          <input
            name="storeName"
            value={formData.storeName}
            onChange={handleChange}
            placeholder="Store Name"
            className="w-full p-2 rounded bg-gray-800 text-white outline-none"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="p-2 rounded bg-gray-800 text-white outline-none"
            />

            <input
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="WhatsApp"
              className="p-2 rounded bg-gray-800 text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              className="p-2 rounded bg-gray-800 text-white outline-none"
            />

            <input
              name="localGovernment"
              value={formData.localGovernment}
              onChange={handleChange}
              placeholder="LGA"
              className="p-2 rounded bg-gray-800 text-white outline-none"
            />
          </div>

          <input
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="Bank Name"
            className="w-full p-2 rounded bg-gray-800 text-white outline-none"
          />

          <input
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            placeholder="Account Name"
            className="w-full p-2 rounded bg-gray-800 text-white outline-none"
          />

          <input
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="Account Number"
            className="w-full p-2 rounded bg-gray-800 text-white outline-none"
          />

          <input
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            placeholder="Profile Picture URL"
            className="w-full p-2 rounded bg-gray-800 text-white outline-none"
          />

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 bg-gray-700 text-white rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
            >
              {isPending ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
