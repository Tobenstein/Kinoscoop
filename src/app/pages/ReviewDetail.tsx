import { ArrowLeft, Calendar, Clock, Star, Film, User, Monitor, ExternalLink } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { StarRating } from '../components/StarRating';

export function ReviewDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const reviewId = parseInt(id || '1', 10);

  // Mock database of movie reviews
  const movieDatabase: Record<number, any> = {
    1: {
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
      viewingMedium: "Theatre",
      imdbUrl: "https://www.imdb.com/title/tt0468569/",
      synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      review: `Christopher Nolan's "The Dark Knight" isn't just a superhero film—it's a crime epic that transcends its genre to become something far greater. This is a film that asks serious questions about justice, morality, and the nature of heroism in a world where the line between good and evil isn't always clear.

Heath Ledger's performance as the Joker is nothing short of legendary. He completely inhabits the role, creating a villain who is simultaneously terrifying and fascinating. His Joker isn't just a criminal—he's an agent of chaos, a philosophical force that challenges Batman and Harvey Dent's idealistic view of justice. The bank robbery sequence that opens the film immediately establishes the Joker as a threat unlike any we've seen in superhero cinema.

Christian Bale delivers his best performance as Bruce Wayne/Batman, showing us a hero who is pushed to his absolute limits. The film explores the psychological toll of being Batman, and Bale captures both the determination and the weariness of a man who has taken on an impossible burden.`,
      standoutMoments: "The interrogation scene between Batman and the Joker is absolutely electric. The dialogue, the performances, the cinematography—everything comes together perfectly.",
      rewatch: "Absolutely. This is one of those films that rewards multiple viewings.",
      tags: ["Superhero", "Crime", "Psychological Thriller", "Action"]
    },
    9: {
      title: "Inception",
      director: "Christopher Nolan",
      year: 2010,
      posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
      rating: 4.75,
      dateWatched: "March 5, 2026",
      runtime: 148,
      genre: "Sci-Fi, Action, Thriller",
      cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy",
      synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      review: `Inception is a masterclass in storytelling and visual effects. Nolan weaves together multiple layers of dreams within dreams, creating a complex narrative that demands your full attention. The film's exploration of the subconscious and the nature of reality is both intellectually stimulating and emotionally resonant.

DiCaprio delivers a compelling performance as Dom Cobb, a man haunted by his past and desperate to return home to his children. The supporting cast is equally strong, with each member of the heist team bringing their own unique skills and personality to the mission.

The action sequences are inventive and thrilling, particularly the gravity-defying hallway fight and the city-folding scene. Hans Zimmer's iconic score amplifies the tension and wonder throughout.`,
      standoutMoments: "The rotating hallway fight scene is one of the most innovative action sequences ever filmed. Also, that final shot—does the top fall or keep spinning?",
      rewatch: "Essential. Each viewing reveals new details and connections.",
      tags: ["Sci-Fi", "Mind-Bending", "Heist", "Action"]
    },
    104: {
      title: "Oppenheimer",
      director: "Christopher Nolan",
      year: 2023,
      posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
      rating: 5.0,
      dateWatched: "February 12, 2026",
      runtime: 180,
      genre: "Biography, Drama, History",
      cast: "Cillian Murphy, Emily Blunt, Matt Damon, Robert Downey Jr.",
      synopsis: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      review: `Oppenheimer is Nolan's most ambitious and mature work to date. The film masterfully interweaves multiple timelines to tell the story of a brilliant but conflicted man who changed the world forever. Cillian Murphy's performance is transformative, capturing both the genius and the torment of Oppenheimer.

The film doesn't shy away from the moral complexities of creating a weapon of mass destruction. The Trinity test sequence is breathtaking—shot in IMAX without CGI, it conveys both the awe and the horror of what has been unleashed.

Robert Downey Jr. delivers a career-best performance as Lewis Strauss, and the cat-and-mouse dynamic between him and Oppenheimer forms the emotional core of the film's second half.`,
      standoutMoments: "The Trinity test sequence is absolutely stunning. The silence after the detonation, followed by the delayed shockwave, perfectly captures the magnitude of what's happened.",
      rewatch: "Yes, though it's an intense three-hour experience that requires your full attention.",
      tags: ["Biography", "Historical", "Drama", "Epic"]
    },
    105: {
      title: "The Departed",
      director: "Martin Scorsese",
      year: 2006,
      posterUrl: "https://image.tmdb.org/t/p/w500/nT97ifVT2J1yMQmeq20Qblg61T.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/original/7u4VE0K7K4X3xhJGAVL5i6VuDT3.jpg",
      rating: 4.75,
      dateWatched: "January 28, 2026",
      runtime: 151,
      genre: "Crime, Drama, Thriller",
      cast: "Leonardo DiCaprio, Matt Damon, Jack Nicholson, Mark Wahlberg",
      synopsis: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
      review: `Scorsese's remake of the Hong Kong film Infernal Affairs is a masterclass in tension and paranoia. The parallel stories of Billy Costigan and Colin Sullivan create a cat-and-mouse game where neither side knows who to trust.

DiCaprio and Damon are both excellent, but it's Jack Nicholson who steals every scene as the menacing Frank Costello. Mark Wahlberg's foul-mouthed Dignam provides moments of dark comedy that balance the film's intensity.

The editing is razor-sharp, and the Boston setting feels authentic and lived-in. Scorsese keeps the tension mounting throughout, leading to a climax that's both shocking and satisfying.`,
      standoutMoments: "The rooftop confrontation and the elevator scene—both are masterfully executed moments of violence that catch you completely off guard.",
      rewatch: "Absolutely. The screenplay is so tightly constructed that it holds up to multiple viewings.",
      tags: ["Crime", "Thriller", "Undercover", "Boston"]
    },
    10: {
      title: "Goodfellas",
      director: "Martin Scorsese",
      year: 1990,
      posterUrl: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
      backdropUrl: "https://image.tmdb.org/t/p/original/hAPeXBdGY8BWl2z3vqKj2I5vnJG.jpg",
      rating: 4.5,
      dateWatched: "March 25, 2026",
      runtime: 145,
      genre: "Crime, Drama",
      cast: "Robert De Niro, Ray Liotta, Joe Pesci, Lorraine Bracco",
      synopsis: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
      review: `Goodfellas is the quintessential mob film—fast-paced, stylish, and utterly captivating. Scorsese's kinetic direction and Thelma Schoonmaker's editing create a propulsive energy that never lets up.

Ray Liotta is perfect as Henry Hill, the narrator who takes us through the rise and fall of his criminal career. Joe Pesci is terrifying as the volatile Tommy DeVito—his "funny how?" scene is one of cinema's most iconic moments.

The film doesn't glamorise the mob life; instead, it shows both the allure and the inevitable consequences. The Copacabana tracking shot is legendary for good reason.`,
      standoutMoments: "The Copacabana tracking shot and the 'funny how?' scene are both masterful displays of filmmaking technique and performance.",
      rewatch: "One of the most rewatchable films ever made.",
      tags: ["Crime", "Mob", "True Story", "Classic"]
    }
  };

  // Get the movie data, or use a default if not found
  const movieData = movieDatabase[reviewId] || movieDatabase[1];
  const movie = {
    id: reviewId,
    ...movieData
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/reviews')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Reviews</span>
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

              {movie.viewingMedium && (
                <div className="flex items-center gap-2 text-sm">
                  <Monitor className="w-4 h-4 text-muted-foreground" />
                  <span className="text-foreground">
                    {movie.viewingMedium}
                    {movie.streamingService && ` (${movie.streamingService})`}
                  </span>
                </div>
              )}

              {movie.imdbUrl && (
                <div className="flex items-center gap-2 text-sm">
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={movie.imdbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View on IMDb
                  </a>
                </div>
              )}
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
              <StarRating rating={movie.rating} size={20} />
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

          {/* Standout Moments */}
          <div className="bg-gradient-to-br from-secondary to-accent rounded-lg border border-border p-6 mb-6">
            <h2 className="text-xl text-foreground mb-3">Standout Moments</h2>
            <p className="text-foreground leading-relaxed">{movie.standoutMoments}</p>
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
