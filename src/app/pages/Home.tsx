import { Film, Star, Clock, Instagram, Facebook, Youtube, Cloud } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { TikTokIcon } from '../components/TikTokIcon';
import { StarRating } from '../components/StarRating';
import { useRef, useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface Movie {
  id: number;
  title: string;
  director: string;
  posterUrl: string;
  progress?: number;
  rating?: number;
  startDate?: string;
  finishDate?: string;
  synopsis?: string;
  year?: number;
  runtime?: number;
}

export function Home() {
  const [loading, setLoading] = useState(true);
  const [heroContent, setHeroContent] = useState({
    header: 'Welcome to My Cinema Journey',
    subheader: 'Exploring worlds one film at a time',
    intro_paragraph: "Hi! I'm a passionate cinephile based in Dublin, Ireland. What started as a personal hobby has grown into a thriving online community of fellow movie lovers.",
    closing_paragraph: "From indie dramas to blockbuster epics, I watch across all genres and love discovering hidden cinematic gems. Join me as I share my latest watches, reviews, and movie adventures!",
    instagram_handle: 'moviereviews',
    facebook_handle: 'moviereviews',
    youtube_handle: '@moviereviews',
    tiktok_handle: '@moviereviews',
    bluesky_handle: 'moviereviews.bsky.social',
    letterboxd_handle: 'moviereviews',
    imdb_handle: 'moviereviews',
  });
  const [currentlyWatching, setCurrentlyWatching] = useState<Movie>({
    id: 1,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    posterUrl: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    progress: 45,
    year: 1994,
    runtime: 142
  });

  const [movieOfTheMonth, setMovieOfTheMonth] = useState<Movie>({
    id: 2,
    title: "Oppenheimer",
    director: "Christopher Nolan",
    posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    year: 2023,
    runtime: 180
  });

  const [watchlist, setWatchlist] = useState<Movie[]>([
    {
      id: 3,
      title: "The Godfather",
      director: "Francis Ford Coppola",
      posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      year: 1972
    },
    {
      id: 4,
      title: "Pulp Fiction",
      director: "Quentin Tarantino",
      posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      year: 1994
    },
    {
      id: 5,
      title: "Inception",
      director: "Christopher Nolan",
      posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      year: 2010
    }
  ]);

  const [recentlyWatched, setRecentlyWatched] = useState<Movie[]>([
    {
      id: 6,
      title: "The Dark Knight",
      director: "Christopher Nolan",
      posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      rating: 4.75,
      startDate: "Apr 8",
      finishDate: "Apr 8",
      year: 2008
    },
    {
      id: 7,
      title: "Parasite",
      director: "Bong Joon-ho",
      posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      rating: 5,
      startDate: "Apr 5",
      finishDate: "Apr 5",
      year: 2019
    },
    {
      id: 8,
      title: "Interstellar",
      director: "Christopher Nolan",
      posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      rating: 4.5,
      startDate: "Apr 1",
      finishDate: "Apr 1",
      year: 2014
    },
    {
      id: 9,
      title: "The Matrix",
      director: "Lana Wachowski, Lilly Wachowski",
      posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      rating: 4.75,
      startDate: "Mar 28",
      finishDate: "Mar 28",
      year: 1999
    },
    {
      id: 10,
      title: "Goodfellas",
      director: "Martin Scorsese",
      posterUrl: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
      rating: 4.5,
      startDate: "Mar 25",
      finishDate: "Mar 25",
      year: 1990
    },
    {
      id: 11,
      title: "Fight Club",
      director: "David Fincher",
      posterUrl: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      rating: 4.25,
      startDate: "Mar 22",
      finishDate: "Mar 22",
      year: 1999
    },
    {
      id: 12,
      title: "Forrest Gump",
      director: "Robert Zemeckis",
      posterUrl: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      rating: 4.5,
      startDate: "Mar 19",
      finishDate: "Mar 19",
      year: 1994
    },
    {
      id: 13,
      title: "The Silence of the Lambs",
      director: "Jonathan Demme",
      posterUrl: "https://image.tmdb.org/t/p/w500/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
      rating: 4.75,
      startDate: "Mar 15",
      finishDate: "Mar 15",
      year: 1991
    },
    {
      id: 14,
      title: "Saving Private Ryan",
      director: "Steven Spielberg",
      posterUrl: "https://image.tmdb.org/t/p/w500/uqx37vgf6z0FfKOIRQz5hSZVaXD.jpg",
      rating: 4.5,
      startDate: "Mar 12",
      finishDate: "Mar 12",
      year: 1998
    },
    {
      id: 15,
      title: "Se7en",
      director: "David Fincher",
      posterUrl: "https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJskVUO.jpg",
      rating: 4.75,
      startDate: "Mar 8",
      finishDate: "Mar 8",
      year: 1995
    },
    {
      id: 16,
      title: "The Usual Suspects",
      director: "Bryan Singer",
      posterUrl: "https://image.tmdb.org/t/p/w500/9Sz8CzNr5H1anbWPKzgMLjZmBh3.jpg",
      rating: 4.5,
      startDate: "Mar 5",
      finishDate: "Mar 5",
      year: 1995
    },
    {
      id: 17,
      title: "The Prestige",
      director: "Christopher Nolan",
      posterUrl: "https://image.tmdb.org/t/p/w500/5MXyQfz8xUP3dIFPTubhTsbFY6N.jpg",
      rating: 4.25,
      startDate: "Mar 1",
      finishDate: "Mar 1",
      year: 2006
    }
  ]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const { data, error } = await supabase
          .from('home_page_content')
          .select('*')
          .single();

        if (error) throw error;

        if (data) {
          if (data.hero_header) {
            setHeroContent({
              header: data.hero_header,
              subheader: data.hero_subheader,
              intro_paragraph: data.hero_intro_paragraph,
              closing_paragraph: data.hero_closing_paragraph,
              instagram_handle: data.instagram_handle,
              facebook_handle: data.facebook_handle,
              youtube_handle: data.youtube_handle,
              tiktok_handle: data.tiktok_handle,
              bluesky_handle: data.bluesky_handle,
              letterboxd_handle: data.letterboxd_handle || 'moviereviews',
              imdb_handle: data.imdb_handle || 'moviereviews',
            });
          }

          if (data.currently_watching) {
            setCurrentlyWatching({
              id: 1,
              title: data.currently_watching.title,
              director: data.currently_watching.director,
              posterUrl: data.currently_watching.poster_url,
              progress: data.currently_watching.progress,
              year: data.currently_watching.year
            });
          }

          if (data.movie_of_month) {
            setMovieOfTheMonth({
              id: 2,
              title: data.movie_of_month.title,
              director: data.movie_of_month.director,
              posterUrl: data.movie_of_month.poster_url,
              synopsis: data.movie_of_month.synopsis,
              year: data.movie_of_month.year
            });
          }

          if (data.watchlist && data.watchlist.length > 0) {
            setWatchlist(data.watchlist.map((movie: any, index: number) => ({
              id: 3 + index,
              title: movie.title,
              director: movie.director,
              posterUrl: movie.poster_url,
              year: movie.year
            })));
          }
        }
      } catch (error) {
        // Supabase not configured, use default data
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentlyWatched = async () => {
      try {
        const { data: loggedMovies, error } = await supabase
          .from('logged_movies')
          .select('*')
          .order('date_watched', { ascending: false })
          .limit(15);

        if (error) throw error;

        if (loggedMovies && loggedMovies.length > 0) {
          const formatDate = (dateStr: string) => {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          };

          const moviesWithPosters = loggedMovies.map((movie, index) => ({
            id: 100 + index,
            title: movie.movie_title,
            director: movie.director,
            posterUrl: movie.poster_url || 'https://image.tmdb.org/t/p/w500/placeholder.jpg',
            rating: movie.rating,
            startDate: formatDate(movie.date_watched),
            finishDate: formatDate(movie.date_watched),
            year: movie.year
          }));

          setRecentlyWatched(moviesWithPosters);
        }
      } catch (error) {
        // Supabase not configured, use default data
      }
    };

    fetchHomeContent();
    fetchRecentlyWatched();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* About Me Section */}
      <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden mb-8">
        <div className="grid md:grid-cols-2 gap-8 p-4 md:p-8">
          <div className="flex items-center justify-center min-h-[240px] md:min-h-0">
            <ImageWithFallback
              src="/profile.jpg"
              alt="Profile"
              className="w-full max-h-[300px] md:h-96 object-contain rounded-lg shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-primary mb-2 text-3xl">{heroContent.header}</h1>
            <p className="text-muted-foreground mb-6">
              {heroContent.subheader}
            </p>

            <p className="text-foreground leading-relaxed mb-4">
              {heroContent.intro_paragraph}
            </p>

            <p className="text-foreground leading-relaxed mb-6">
              {heroContent.closing_paragraph}
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a
                href={`https://instagram.com/${heroContent.instagram_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={`https://facebook.com/${heroContent.facebook_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`https://youtube.com/${heroContent.youtube_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={`https://tiktok.com/${heroContent.tiktok_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a
                href={`https://bsky.app/profile/${heroContent.bluesky_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="BlueSky"
              >
                <Cloud className="w-5 h-5" />
              </a>
              <a
                href={`https://letterboxd.com/${heroContent.letterboxd_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Letterboxd"
              >
                <Film className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Currently Watching */}
        <div className="lg:col-span-2 bg-card rounded-xl shadow-sm border border-border p-4 md:p-6">
          <div className="flex items-center gap-2 mb-6">
            <Film className="w-5 h-5 text-primary" />
            <h2 className="text-foreground">Currently Watching</h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <ImageWithFallback
                src={currentlyWatching.posterUrl}
                alt={currentlyWatching.title}
                className="w-40 h-52 sm:w-48 sm:h-64 object-cover rounded-lg shadow-md"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <h3 className="text-foreground mb-1">{currentlyWatching.title}</h3>
              <p className="text-muted-foreground mb-4">directed by {currentlyWatching.director}</p>

              <div className="flex-1" />

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-muted-foreground mb-2">
                    <span>Watch Progress</span>
                    <span>{currentlyWatching.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all"
                      style={{ width: `${currentlyWatching.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{currentlyWatching.runtime} minutes • {currentlyWatching.year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Movie of the Month */}
        <div className="bg-gradient-to-br from-secondary to-accent rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-primary" />
            <h2 className="text-foreground">Movie of the Month</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-center">
              <ImageWithFallback
                src={movieOfTheMonth.posterUrl}
                alt={movieOfTheMonth.title}
                className="w-48 h-72 object-contain rounded-lg shadow-md"
              />
            </div>

            <div>
              <h3 className="text-foreground mb-1">{movieOfTheMonth.title}</h3>
              <p className="text-muted-foreground mb-3">directed by {movieOfTheMonth.director}</p>
              <p className="text-foreground">
                {movieOfTheMonth.synopsis || "An epic biographical thriller that chronicles the creation of the atomic bomb. A masterful exploration of science, ethics, and history."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Watched */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6 mb-8">
        <h2 className="text-foreground mb-6">Recently Watched</h2>

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex gap-6" style={{ width: 'max-content' }}>
            {recentlyWatched.map((movie) => (
              <div
                key={movie.id}
                className="group cursor-pointer flex-shrink-0"
                style={{ width: '200px' }}
              >
                <div className="relative overflow-hidden rounded-lg shadow-md mb-3 transition-transform group-hover:scale-105">
                  <ImageWithFallback
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                <h3 className="text-foreground mb-1 line-clamp-2">{movie.title}</h3>
                <p className="text-muted-foreground mb-2">{movie.director}</p>
                <div className="mb-1">
                  <StarRating rating={movie.rating || 0} />
                </div>
                {movie.finishDate && (
                  <p className="text-muted-foreground italic text-xs">
                    Watched {movie.finishDate}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Watchlist */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6">
        <h2 className="text-foreground mb-6">{watchlist.length} {watchlist.length === 1 ? 'Movie' : 'Movies'} in My Watchlist</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {watchlist.map((movie) => (
            <div key={movie.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-md mb-3 transition-transform group-hover:scale-105 flex justify-center bg-muted">
                <ImageWithFallback
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-48 h-72 object-contain"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>

              <h3 className="text-foreground mb-1">{movie.title}</h3>
              <p className="text-muted-foreground">directed by {movie.director}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
