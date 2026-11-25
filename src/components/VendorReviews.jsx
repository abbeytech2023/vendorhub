import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";
import { useVendorReviews } from "../hooks/useReviews";
import MiniLoader from "./MiniLoader";

function VendorReviews({ user_id }) {
  const { reviews, isLoading, error } = useVendorReviews(user_id);

  const averageRating = reviews?.length
    ? (
        reviews.reduce((total, review) => total + Number(review.rating), 0) /
        reviews.length
      ).toFixed(1)
    : "0.0";

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <MiniLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-5 rounded-xl">
        Unable to load customer reviews.
      </div>
    );
  }

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>

          <p className="text-gray-500 text-sm mt-1">
            What customers are saying about this business.
          </p>
        </div>

        {/* AVERAGE RATING */}
        <div className="bg-green-50 rounded-xl px-5 py-3">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-500 text-2xl" />

            <span className="text-3xl font-bold text-gray-800">
              {averageRating}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            {reviews?.length || 0} customer reviews
          </p>
        </div>
      </div>

      {/* EMPTY STATE */}
      {!reviews?.length ? (
        <div className="text-center py-12">
          <FaRegStar className="text-5xl text-gray-300 mx-auto mb-4" />

          <h3 className="text-lg font-semibold text-gray-700">
            No reviews yet
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Customer reviews will appear here when available.
          </p>
        </div>
      ) : (
        /* REVIEWS LIST */
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
            >
              <div className="flex items-start justify-between gap-4">
                {/* CUSTOMER */}
                <div className="flex items-center gap-3">
                  <FaUserCircle className="text-4xl text-gray-300" />

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {review.guest_name || "Customer"}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                      {review.created_at
                        ? new Date(review.created_at).toLocaleDateString()
                        : ""}
                    </p>
                  </div>
                </div>

                {/* STAR RATING */}
                <div className="flex items-center gap-1 shrink-0">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= Number(review.rating)
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>
              </div>

              {/* COMMENT */}
              <p className="text-gray-600 leading-7 mt-4">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default VendorReviews;
