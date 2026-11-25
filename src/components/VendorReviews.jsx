import { useState } from "react";

import {
  FaStar,
  FaRegStar,
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { useVendorReviews } from "../hooks/useReviews";
import MiniLoader from "./MiniLoader";

function VendorReviews({ user_id }) {
  const { reviews, isLoading, error } = useVendorReviews(user_id);

  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 3;

  // Calculate average rating using all reviews
  const averageRating = reviews?.length
    ? (
        reviews.reduce((total, review) => total + Number(review.rating), 0) /
        reviews.length
      ).toFixed(1)
    : "0.0";

  // Pagination calculations
  const totalReviews = reviews?.length || 0;

  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  const startIndex = (currentPage - 1) * reviewsPerPage;

  const currentReviews = reviews?.slice(
    startIndex,
    startIndex + reviewsPerPage,
  );

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const previousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

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
    <section className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm min-w-0">
      {/* HEADER */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Customer Reviews
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            What customers are saying about this business.
          </p>
        </div>

        {/* AVERAGE RATING */}

        <div className="bg-green-50 rounded-xl px-5 py-3 w-fit">
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-500 text-2xl" />

            <span className="text-3xl font-bold text-gray-800">
              {averageRating}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            {totalReviews} customer reviews
          </p>
        </div>
      </div>

      {/* EMPTY STATE */}

      {!totalReviews ? (
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
        <>
          {/* REVIEWS LIST */}

          <div className="space-y-6">
            {currentReviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-3">
                  {/* CUSTOMER */}

                  <div className="flex items-center gap-3 min-w-0">
                    <FaUserCircle className="text-4xl text-gray-300 shrink-0" />

                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-800 break-words">
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

                <p className="text-gray-600 leading-7 mt-4 break-words">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>

          {/* PAGINATION */}

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-5 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Showing {startIndex + 1} -{" "}
                {Math.min(startIndex + reviewsPerPage, totalReviews)} of{" "}
                {totalReviews} reviews
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={previousPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer  rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <FaChevronLeft />
                  Previous
                </button>

                <span className="text-sm font-semibold text-gray-700">
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 cursor-pointer py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default VendorReviews;
