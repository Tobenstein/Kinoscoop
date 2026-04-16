import { useState } from 'react';
import { Film, Search, Star, Calendar, Clock } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { StarRating } from '../components/StarRating';

interface Movie {
  id: number;
  title: string;
  director: string;
  year: number;
  posterUrl: string;
  rating: number;
  dateWatched: string;
  runtime?: number;
  genre?: string;
  reviewSnippet?: string;
}

interface ReviewsProps {
  onNavigateToReview: (reviewId: number) => void;
}

export function Reviews({ onNavigateToReview }: ReviewsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGenre, setFilterGenre] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const [movies] = useState<Movie[]>([
    {
      id: 1,
      title: "The Dark Knight",
      director: "Christopher Nolan",
      year: 2008,
      posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      rating: 4.75,
      dateWatched: "2026-04-08",
      runtime: 152,
      genre: "Action",
      reviewSnippet: "A masterpiece that transcends the superhero genre..."
    },
    {
      id: 2,
      title: "Parasite",
      director: "Bong Joon-ho",
      year: 2019,
      posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      rating: 5,
      dateWatched: "2026-04-05",
      runtime: 132,
      genre: "Thriller",
      reviewSnippet: "Brilliant social commentary wrapped in suspenseful storytelling..."
    },
    {
      id: 3,
      title: "Interstellar",
      director: "Christopher Nolan",
      year: 2014,
      posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      rating: 4.5,
      dateWatched: "2026-04-01",
      runtime: 169,
      genre: "Sci-Fi",
      reviewSnippet: "An epic journey through space and time with stunning visuals..."
    },
    {
      id: 4,
      title: "The Godfather",
      director: "Francis Ford Coppola",
      year: 1972,
      posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      rating: 5,
      dateWatched: "2026-03-28",
      runtime: 175,
      genre: "Crime",
      reviewSnippet: "The definitive crime saga. Perfection in every frame..."
    },
    {
      id: 5,
      title: "Pulp Fiction",
      director: "Quentin Tarantino",
      year: 1994,
      posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      rating: 4.75,
      dateWatched: "2026-03-25",
      runtime: 154,
      genre: "Crime",
      reviewSnippet: "Tarantino's non-linear masterpiece with unforgettable dialogue..."
    },
    {
      id: 6,
      title: "The Matrix",
      director: "Lana Wachowski, Lilly Wachowski",
      year: 1999,
      posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      rating: 4.75,
      dateWatched: "2026-03-20",
      runtime: 136,
      genre: "Sci-Fi",
      reviewSnippet: "Revolutionary action and groundbreaking visual effects..."
    },
    {
      id: 7,
      title: "Goodfellas",
      director: "Martin Scorsese",
      year: 1990,
      posterUrl: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
      rating: 4.5,
      dateWatched: "2026-03-15",
      runtime: 145,
      genre: "Crime",
      reviewSnippet: "Scorsese's kinetic masterpiece about mob life..."
    },
    {
      id: 8,
      title: "Fight Club",
      director: "David Fincher",
      year: 1999,
      posterUrl: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      rating: 4.25,
      dateWatched: "2026-03-10",
      runtime: 139,
      genre: "Drama",
      reviewSnippet: "Dark, twisted, and unforgettable. A cultural phenomenon..."
    },
    {
      id: 9,
      title: "Inception",
      director: "Christopher Nolan",
      year: 2010,
      posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      rating: 4.75,
      dateWatched: "2026-03-05",
      runtime: 148,
      genre: "Sci-Fi",
      reviewSnippet: "Mind-bending heist film with layers upon layers..."
    },
    {
      id: 10,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      year: 1994,
      posterUrl: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
      rating: 5,
      dateWatched: "2026-03-01",
      runtime: 142,
      genre: "Drama",
      reviewSnippet: "A timeless tale of hope and friendship that never ages..."
    },
  ]);

  const genres = ['all', 'Action', 'Crime', 'Drama', 'Sci-Fi', 'Thriller'];

  const filteredMovies = movies
    .filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.director.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = filterGenre === 'all' || movie.genre === filterGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.dateWatched).getTime() - new Date(a.dateWatched).getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Film className="w-8 h-8 text-primary" />
          <h1 className="text-3xl text-foreground">The Archives</h1>
        </div>
        <p className="text-muted-foreground">
          A curated collection of {movies.length} films I've watched and reviewed
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search movies or directors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Genre Filter */}
          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            className="px-4 py-2 bg-input-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre === 'all' ? 'All Genres' : genre}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-input-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="rating">Sort by Rating</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-muted-foreground">
          Showing {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'}
        </p>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => onNavigateToReview(movie.id)}
            className="bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="relative overflow-hidden aspect-[2/3]">
              <ImageWithFallback
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <StarRating rating={movie.rating} />
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-foreground mb-1 line-clamp-1">{movie.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                directed by {movie.director}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{movie.year}</span>
                </div>
                {movie.runtime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{movie.runtime} min</span>
                  </div>
                )}
              </div>

              {movie.reviewSnippet && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {movie.reviewSnippet}
                </p>
              )}

              <div className="mt-3 text-xs text-muted-foreground">
                Watched {formatDate(movie.dateWatched)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMovies.length === 0 && (
        <div className="bg-card rounded-xl shadow-sm border border-border p-12 text-center">
          <Film className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-foreground mb-2">No movies found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
