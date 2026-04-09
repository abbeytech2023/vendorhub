import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function GoBackButton({ label = "Back" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition"
    >
      <FaArrowLeft />
      <span>{label}</span>
    </button>
  );
}
