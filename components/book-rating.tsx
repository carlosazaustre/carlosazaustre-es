import { Star } from "lucide-react";
export default function BookRating({
  value,
  count,
}: {
  value: number;
  count: number;
}) {
  return (
    <div className="book-rating">
      <span
        className="book-rating-stars"
        role="img"
        aria-label={`${value} de 5 estrellas`}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            aria-hidden="true"
            style={{
              fill: star <= Math.round(value) ? "var(--yellow)" : "none",
            }}
          />
        ))}
      </span>
      <span>
        {value} ({count} valoraciones)
      </span>
    </div>
  );
}
