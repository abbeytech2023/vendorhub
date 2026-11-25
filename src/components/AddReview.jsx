import { useState } from "react";
import { useForm } from "react-hook-form";

import RatingStars from "./StarRatings";
import { useCreateReview } from "../hooks/useReviews";

function AddReview({ vendor_id, user }) {
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useCreateReview();

  function onSubmit(form_data) {
    if (!rating) {
      return;
    }

    const review_data = {
      vendor_id,
      user_id: user?.id || null,
      guest_name: user ? null : form_data.guest_name,
      guest_email: user ? null : form_data.guest_email || null,
      rating,
      comment: form_data.comment,
      status: "pending",
    };

    mutate(review_data, {
      onSuccess: () => {
        reset();
        setRating(0);
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-xl shadow space-y-5"
    >
      <div>
        <h3 className="text-xl font-bold">Write a Review</h3>

        <p className="text-sm text-gray-500 mt-1">
          Share your experience with this business.
        </p>
      </div>

      {/* Rating */}
      <div>
        <p className="mb-2 text-sm font-medium">Rate this business</p>

        <RatingStars rating={rating} setRating={setRating} />

        {!rating && (
          <p className="text-xs text-gray-500 mt-1">
            Select a rating from 1 to 5 stars.
          </p>
        )}
      </div>

      {/* Guest Information */}
      {!user && (
        <>
          <div>
            <input
              {...register("guest_name", {
                required: "Please enter your name.",
              })}
              placeholder="Your name"
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.guest_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.guest_name.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("guest_email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address.",
                },
              })}
              type="email"
              placeholder="Your email (optional)"
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.guest_email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.guest_email.message}
              </p>
            )}
          </div>
        </>
      )}

      {/* Comment */}
      <div>
        <textarea
          {...register("comment", {
            required: "Please write a review.",
            minLength: {
              value: 5,
              message: "Review must contain at least 5 characters.",
            },
          })}
          placeholder="Share your experience with this business..."
          rows={4}
          className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        {errors.comment && (
          <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Submitting..." : "Submit Review"}
      </button>

      <p className="text-xs text-gray-500">
        Your review will be visible after moderation.
      </p>
    </form>
  );
}

export default AddReview;
