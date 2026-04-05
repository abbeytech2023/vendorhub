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
    officeAddress: "",
  });

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
        officeAddress: vendor.officeAddress || "",
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

  const disabledInput =
    "w-full p-2 rounded bg-gray-800 text-gray-400 outline-none opacity-60 cursor-not-allowed";

  const input = "w-full p-2 rounded bg-gray-800 text-white outline-none";

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

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* FULL NAME */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Full Name
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={input}
            />
          </div>

          {/* STORE NAME */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Store Name
            </label>
            <input
              name="storeName"
              value={formData.storeName}
              onChange={handleChange}
              className={input}
            />
          </div>

          {/* PHONE + WHATSAPP (DISABLED) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                disabled
                className={disabledInput}
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">
                WhatsApp
              </label>
              <input
                name="whatsapp"
                value={formData.whatsapp}
                disabled
                className={disabledInput}
              />
            </div>
          </div>

          {/* STATE + LGA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">State</label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={input}
              />
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">LGA</label>
              <input
                name="localGovernment"
                value={formData.localGovernment}
                onChange={handleChange}
                className={input}
              />
            </div>
          </div>

          {/* OFFICE ADDRESS */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Office Address
            </label>

            <textarea
              name="officeAddress"
              value={formData.officeAddress}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none 
                         border border-gray-700 focus:border-green-500 resize-none"
            />
          </div>

          {/* BANK NAME (DISABLED) */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Bank Name
            </label>
            <input
              name="bankName"
              value={formData.bankName}
              disabled
              className={input}
            />
          </div>

          {/* ACCOUNT NAME */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Account Name
            </label>
            <input
              disabled
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              className={disabledInput}
            />
          </div>

          {/* ACCOUNT NUMBER */}
          <div>
            <label className="text-sm text-gray-300 mb-1 block">
              Account Number
            </label>
            <input
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className={input}
            />
          </div>

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
