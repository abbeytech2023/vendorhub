import { FaStar } from "react-icons/fa";

function RatingStars({ rating, setRating }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => setRating(star)}>
          <FaStar
            className={`text-2xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default RatingStars;
