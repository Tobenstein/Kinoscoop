import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
}

export function StarRating({ rating, maxRating = 5, size = 16 }: StarRatingProps) {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    const fillPercentage = Math.min(Math.max(rating - (i - 1), 0), 1) * 100;

    stars.push(
      <div key={i} className="relative inline-block" style={{ width: size, height: size }}>
        <Star
          className="absolute top-0 left-0 text-muted"
          style={{ width: size, height: size }}
          fill="currentColor"
        />
        <div
          className="absolute top-0 left-0 overflow-hidden"
          style={{ width: `${fillPercentage}%` }}
        >
          <Star
            className="text-primary"
            style={{ width: size, height: size }}
            fill="currentColor"
          />
        </div>
      </div>
    );
  }

  return <div className="flex gap-0.5">{stars}</div>;
}
