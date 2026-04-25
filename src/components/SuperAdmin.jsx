import { useVendors } from "../hooks/useVendors";

export default function SuperAdminDashboard() {
  const { data: stores } = useVendors();
  const stats = [
    { label: "Total Vendors", value: "245" },
    { label: "Total Products", value: "1,840" },
    { label: "Pending Approvals", value: "18" },
    { label: "Sponsored Products", value: "42" },
  ];

  const recentStores = [
    {
      name: "Abbey Fashion",
      owner: "Abbey",
      products: 42,
      status: "Verified",
    },
    {
      name: "Lagos Gadgets",
      owner: "Daniel",
      products: 31,
      status: "Pending",
    },
    {
      name: "Beauty Glow NG",
      owner: "Amara",
      products: 27,
      status: "Verified",
    },
  ];

  return (
    <div className="min-h-screen mt-12 bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Super Admin Dashboard
            </h1>
            <p className="text-slate-500 mt-2">
              Manage vendors, products, stores, and platform activity.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button className="bg-green-600 text-white px-5 py-3 rounded-2xl font-medium hover:bg-green-700 transition">
              Add New Product
            </button>
            <button className="bg-slate-900 text-white px-5 py-3 rounded-2xl font-medium hover:bg-slate-800 transition">
              Add New Store
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6"
            >
              <p className="text-slate-500 text-sm">{item.label}</p>
              <h2 className="text-3xl font-bold text-slate-900 mt-3">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Add Product To Store
              </h2>
              <button className="text-green-600 font-medium hover:underline">
                View All Products
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Store
                </label>
                <select className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500">
                  <option value="">Select a store</option>

                  {stores?.map((store) => (
                    <option key={store._id} value={store._id}>
                      {store.storeName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <select className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500">
                  <option>Fashion</option>
                  <option>Electronics</option>
                  <option>Beauty</option>
                  <option>Food</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  placeholder="Enter price"
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Product Description
              </label>
              <textarea
                rows={4}
                placeholder="Enter product description"
                className="w-full border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="mt-5 grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Upload Product Image
                </label>
                <input
                  type="file"
                  className="w-full border border-dashed border-slate-300 rounded-2xl px-4 py-3 bg-slate-50"
                />
              </div>

              <div className="flex items-end gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" />
                  Sponsored Product
                </label>

                <label className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" />
                  Featured On Homepage
                </label>
              </div>
            </div>

            <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-2xl font-medium hover:bg-green-700 transition">
              Save Product
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Recent Stores
              </h2>
              <button className="text-green-600 font-medium hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentStores.map((store) => (
                <div
                  key={store.name}
                  className="border border-slate-200 rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">
                      {store.name}
                    </h3>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        store.status === "Verified"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {store.status}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 mt-2">
                    Owner: {store.owner}
                  </p>
                  <p className="text-sm text-slate-500">
                    Products: {store.products}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 border border-slate-300 py-2 rounded-xl text-sm hover:bg-slate-50">
                      View
                    </button>
                    <button className="flex-1 bg-slate-900 text-white py-2 rounded-xl text-sm hover:bg-slate-800">
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Pending Vendor Approvals
            </h2>
            <input
              type="text"
              placeholder="Search vendors..."
              className="border border-slate-300 rounded-2xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200">
                <th className="pb-4">Store</th>
                <th className="pb-4">Owner</th>
                <th className="pb-4">Phone</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-4">Glow Beauty NG</td>
                <td className="py-4">Amara Johnson</td>
                <td className="py-4">08012345678</td>
                <td className="py-4 text-yellow-600 font-medium">Pending</td>
                <td className="py-4 flex gap-2">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm">
                    Approve
                  </button>
                  <button className="bg-red-100 text-red-600 px-4 py-2 rounded-xl text-sm">
                    Reject
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
