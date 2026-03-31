// export default function Spinner() {
//   return (
//     <div className="animate-pulse bg-white rounded-xl shadow p-4">
//       <div className="bg-gray-300 h-40 rounded-md mb-4">VendorHub</div>
//       <div className="bg-gray-300 h-4 rounded w-3/4 mb-2">VendorHub</div>
//       <div className="bg-gray-300 h-4 rounded w-1/2">VendorHub</div>
//     </div>
//   );
// }

export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      {/* Logo / Brand */}
      <h1 className="text-2xl font-bold text-green-800 mb-4">
        Vendor<span className="text-green-600">Hub</span>
      </h1>

      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>

      {/* Loading text */}
      <p className="mt-4 text-green-700 text-sm">Loading, please wait...</p>
    </div>
  );
}
