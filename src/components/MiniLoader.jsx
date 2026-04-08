export default function MiniLoader({
  size = "w-6 h-6",
  color = "border-green-600",
}) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${size} border-2 border-gray-300 border-t-transparent ${color} rounded-full animate-spin`}
      />
    </div>
  );
}
