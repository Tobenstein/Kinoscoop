import { ArrowLeft, Calendar, Clock, Star, Film, User } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { StarRating } from '../components/StarRating';

interface ReviewDetailProps {
  reviewId: number;
  onBack: () => void;
}

export function ReviewDetail({ reviewId, onBack }: ReviewDetailProps) {
  // Mock data - in production this would fetch from database based on reviewId
  const movie = {
    id: reviewId,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    year: 2008,
    posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    rating: 4.75,
    dateWatched: "April 8, 2026",
    runtime: 152,
    genre: "Action, Crime, Drama",
    cast: "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
    synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    review: `Christopher Nolan's "The Dark Knight" isn't just a superhero film—it's a crime epic that transcends its genre to become something far greater. This is a film that asks serious questions about justice, morality, and the nature of heroism in a world where the line between good and evil isn't always clear.

Heath Ledger's performance as the Joker is nothing short of legendary. He completely inhabits the role, creating a villain who is simultaneously terrifying and fascinating. His Joker isn't just a criminal—he's an agent of chaos, a philosophical force that challenges Batman and Harvey Dent's idealistic view of justice. The bank robbery sequence that opens the film immediately establishes the Joker as a threat unlike any we've seen in superhero cinema.

Christian Bale delivers his best performance as Bruce Wayne/Batman, showing us a hero who is pushed to his absolute limits. The film explores the psychological toll of being Batman, and Bale captures both the determination and the weariness of a man who has taken on an impossible burden.

The action sequences are spectacular—from the truck flip to the final confrontation in the unfinished building—but they never overshadow the character development and thematic depth. The film's exploration of surveillance, civil liberties, and the price of security feels remarkably relevant even today.

Hans Zimmer's score is minimalist but incredibly effective, using tension and atmosphere rather than melody to create a sense of mounting dread. The cinematography by Wally Pfister is stunning, capturing Gotham as a real city rather than a stylized fantasy world.

If there's any criticism, it's that the film is perhaps too dark and relentless. There are very few moments of levity, and the runtime does test your endurance. But these feel like minor quibbles in what is otherwise a masterpiece of modern cinema.

"The Dark Knight" raised the bar for superhero films and showed that the genre could be taken seriously as art. It's a film I return to again and again, finding new layers with each viewing.`,
    favoriteScene: "The interrogation scene between Batman and the Joker is absolutely electric. The dialogue, the performances, the cinematography—everything comes together perfectly.",
    rewatch: "Absolutely. This is one of those films that rewards multiple viewings.",
    tags: ["Superhero", "Crime", "Psychological Thriller", "Action"]
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Archives</span>
      </button>

      {/* Backdrop Header */}
      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
        <ImageWithFallback
          src={movie.backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      {/* Movie Info */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1">
          <div className="sticky top-8">
            <ImageWithFallback
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg mb-4"
            />
            
            {/* Meta Info */}
            <div className="bg-card rounded-lg border border-border p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{movie.director}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{movie.year}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{movie.runtime} minutes</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Film className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{movie.genre}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {movie.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          {/* Title and Rating */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl text-foreground mb-2">{movie.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <StarRating rating={movie.rating} size="large" />
              <span className="text-2xl text-foreground font-semibold">{movie.rating}</span>
            </div>
            <p className="text-sm text-muted-foreground">Watched on {movie.dateWatched}</p>
          </div>

          {/* Synopsis */}
          <div className="bg-card rounded-lg border border-border p-6 mb-6">
            <h2 className="text-xl text-foreground mb-3">Synopsis</h2>
            <p className="text-muted-foreground leading-relaxed">{movie.synopsis}</p>
          </div>

          {/* Cast */}
          <div className="bg-card rounded-lg border border-border p-6 mb-6">
            <h2 className="text-xl text-foreground mb-3">Cast</h2>
            <p className="text-muted-foreground">{movie.cast}</p>
          </div>

          {/* Review */}
          <div className="bg-card rounded-lg border border-border p-6 mb-6">
            <h2 className="text-xl text-foreground mb-4">My Review</h2>
            <div className="prose prose-invert max-w-none">
              {movie.review.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Favorite Scene */}
          <div className="bg-gradient-to-br from-secondary to-accent rounded-lg border border-border p-6 mb-6">
            <h2 className="text-xl text-foreground mb-3">Favorite Scene</h2>
            <p className="text-foreground leading-relaxed">{movie.favoriteScene}</p>
          </div>

          {/* Rewatch Value */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl text-foreground mb-3">Would I Rewatch?</h2>
            <p className="text-foreground leading-relaxed">{movie.rewatch}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
