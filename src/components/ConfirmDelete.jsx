export default function ConfirmDelete({
  handleDelete,
  setShowConfirm,
  isDeleting,
}) {
  return (
    <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center">
      <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 w-[90%] max-w-md text-white">
        <h3 className="text-lg font-semibold mb-2">Delete Product</h3>

        <p className="text-white/70 text-sm mb-6">
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => setShowConfirm(false)}
            className="w-full py-3 rounded-xl bg-white/10 border border-white/10"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
