import { BarChart3, TrendingUp, Film, Clock, Calendar, Star, User, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { StarRating } from '../components/StarRating';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg max-w-xs">
        <p className="text-foreground font-semibold mb-2">{data.name}</p>
        <p className="text-muted-foreground text-sm mb-2">{data.value} movies</p>
        {data.movies && (
          <div className="border-t border-border pt-2 mt-2">
            <p className="text-xs text-muted-foreground mb-1">Movies:</p>
            <ul className="text-xs text-foreground space-y-0.5">
              {data.movies.map((movie: string, index: number) => (
                <li key={index}>{movie}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export function Analytics() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('year');
  const [expandedDirector, setExpandedDirector] = useState<number | null>(null);
  const [showMoviesOverlay, setShowMoviesOverlay] = useState(false);
  const [mediaType, setMediaType] = useState<'movies' | 'tv'>('movies');

  // Mock data for charts
  const moviesByMonth = [
    { month: 'Jan', movies: 8 },
    { month: 'Feb', movies: 12 },
    { month: 'Mar', movies: 15 },
    { month: 'Apr', movies: 10 },
    { month: 'May', movies: 14 },
    { month: 'Jun', movies: 11 },
    { month: 'Jul', movies: 16 },
    { month: 'Aug', movies: 13 },
    { month: 'Sep', movies: 9 },
    { month: 'Oct', movies: 12 },
    { month: 'Nov', movies: 14 },
    { month: 'Dec', movies: 18 }
  ];

  const showsByMonth = [
    { month: 'Jan', movies: 4 },
    { month: 'Feb', movies: 7 },
    { month: 'Mar', movies: 6 },
    { month: 'Apr', movies: 5 },
    { month: 'May', movies: 8 },
    { month: 'Jun', movies: 6 },
    { month: 'Jul', movies: 9 },
    { month: 'Aug', movies: 7 },
    { month: 'Sep', movies: 5 },
    { month: 'Oct', movies: 6 },
    { month: 'Nov', movies: 7 },
    { month: 'Dec', movies: 10 }
  ];

  const movieGenreDistribution = [
    {
      name: 'Drama',
      value: 28,
      color: '#d4af37',
      movies: ['The Shawshank Redemption', 'Forrest Gump', 'The Godfather', 'Schindler\'s List', 'Fight Club', '+ 23 more']
    },
    {
      name: 'Action',
      value: 22,
      color: '#3949ab',
      movies: ['The Dark Knight', 'Die Hard', 'Mad Max: Fury Road', 'The Matrix', 'John Wick', '+ 17 more']
    },
    {
      name: 'Sci-Fi',
      value: 18,
      color: '#5c6bc0',
      movies: ['Inception', 'Interstellar', 'Blade Runner 2049', 'The Matrix', 'Arrival', '+ 13 more']
    },
    {
      name: 'Thriller',
      value: 15,
      color: '#7986cb',
      movies: ['Se7en', 'The Silence of the Lambs', 'Zodiac', 'The Prestige', 'Gone Girl', '+ 10 more']
    },
    {
      name: 'Comedy',
      value: 10,
      color: '#9fa8da',
      movies: ['The Grand Budapest Hotel', 'Superbad', 'The Big Lebowski', 'Groundhog Day', '+ 6 more']
    },
    {
      name: 'Other',
      value: 7,
      color: '#283593',
      movies: ['Various genres', 'Documentary', 'Musical', 'Western', '+ 3 more']
    }
  ];

  const tvGenreDistribution = [
    {
      name: 'Comedy',
      value: 35,
      color: '#d4af37',
      movies: ["Bob's Burgers", 'The Office (US)', 'Little Britain', 'Peep Show', 'Toast of London', '+ 30 more']
    },
    {
      name: 'Sitcom',
      value: 18,
      color: '#3949ab',
      movies: ['The IT Crowd', 'Flight of the Conchords', 'Derry Girls', '+ 15 more']
    },
    {
      name: 'Surreal Comedy',
      value: 8,
      color: '#5c6bc0',
      movies: ['The Mighty Boosh', 'Toast of London', '+ 6 more']
    },
    {
      name: 'Sports',
      value: 4,
      color: '#7986cb',
      movies: ['AEW Dynamite', '+ 3 more']
    },
    {
      name: 'Other',
      value: 2,
      color: '#9fa8da',
      movies: ['Various genres', 'Documentary', '+ more']
    }
  ];

  const genreDistribution = mediaType === 'movies' ? movieGenreDistribution : tvGenreDistribution;

  const movieCountryDistribution = [
    {
      name: 'France',
      value: 32,
      color: '#d4af37',
      movies: ['Amélie', 'La Haine', 'Portrait of a Lady on Fire', 'The Intouchables', 'Blue Is the Warmest Colour', '+ 27 more']
    },
    {
      name: 'USA',
      value: 45,
      color: '#3949ab',
      movies: ['The Shawshank Redemption', 'The Godfather', 'Pulp Fiction', 'Forrest Gump', 'The Dark Knight', '+ 40 more']
    },
    {
      name: 'UK',
      value: 18,
      color: '#5c6bc0',
      movies: ['Trainspotting', '28 Days Later', 'Hot Fuzz', 'The King\'s Speech', 'Shaun of the Dead', '+ 13 more']
    },
    {
      name: 'Japan',
      value: 15,
      color: '#7986cb',
      movies: ['Spirited Away', 'Seven Samurai', 'Your Name', 'Perfect Blue', 'Akira', '+ 10 more']
    },
    {
      name: 'South Korea',
      value: 12,
      color: '#9fa8da',
      movies: ['Parasite', 'Oldboy', 'The Handmaiden', 'Memories of Murder', 'Train to Busan', '+ 7 more']
    },
    {
      name: 'Other',
      value: 30,
      color: '#283593',
      movies: ['Various countries', 'Germany', 'Italy', 'Spain', 'Brazil', '+ 25 more']
    }
  ];

  const tvCountryDistribution = [
    {
      name: 'USA',
      value: 38,
      color: '#d4af37',
      movies: ["Bob's Burgers", 'The Office (US)', 'Flight of the Conchords', 'AEW Dynamite', '+ 34 more']
    },
    {
      name: 'UK',
      value: 22,
      color: '#3949ab',
      movies: ['The Mighty Boosh', 'Little Britain', 'Peep Show', 'Toast of London', 'The IT Crowd', 'Derry Girls', '+ 16 more']
    },
    {
      name: 'Other',
      value: 7,
      color: '#5c6bc0',
      movies: ['Various countries', 'Australia', 'Canada', '+ 4 more']
    }
  ];

  const countryDistribution = mediaType === 'movies' ? movieCountryDistribution : tvCountryDistribution;

  const ratingDistribution = [
    { rating: '5.0', count: 12 },
    { rating: '4.5-4.9', count: 28 },
    { rating: '4.0-4.4', count: 35 },
    { rating: '3.5-3.9', count: 18 },
    { rating: '3.0-3.4', count: 8 },
    { rating: '<3.0', count: 2 }
  ];

  const topDirectors = [
    {
      name: 'Christopher Nolan',
      movies: 8,
      avgRating: 4.7,
      filmography: [
        { id: 1, title: 'The Dark Knight', year: 2008, genre: 'Action', runtime: 152, rating: 4.75 },
        { id: 9, title: 'Inception', year: 2010, genre: 'Sci-Fi', runtime: 148, rating: 4.75 },
        { id: 3, title: 'Interstellar', year: 2014, genre: 'Sci-Fi', runtime: 169, rating: 4.5 },
        { id: 17, title: 'The Prestige', year: 2006, genre: 'Thriller', runtime: 139, rating: 4.25 },
        { id: 101, title: 'Dunkirk', year: 2017, genre: 'War', runtime: 106, rating: 4.5 },
        { id: 102, title: 'Memento', year: 2000, genre: 'Thriller', runtime: 113, rating: 4.75 },
        { id: 103, title: 'Tenet', year: 2020, genre: 'Sci-Fi', runtime: 150, rating: 4.0 },
        { id: 104, title: 'Oppenheimer', year: 2023, genre: 'Biography', runtime: 180, rating: 5.0 }
      ]
    },
    {
      name: 'Martin Scorsese',
      movies: 6,
      avgRating: 4.5,
      filmography: [
        { id: 10, title: 'Goodfellas', year: 1990, genre: 'Crime', runtime: 145, rating: 4.5 },
        { id: 105, title: 'The Departed', year: 2006, genre: 'Crime', runtime: 151, rating: 4.75 },
        { id: 106, title: 'Taxi Driver', year: 1976, genre: 'Drama', runtime: 114, rating: 4.75 },
        { id: 107, title: 'The Irishman', year: 2019, genre: 'Crime', runtime: 209, rating: 4.25 },
        { id: 108, title: 'Casino', year: 1995, genre: 'Crime', runtime: 178, rating: 4.25 },
        { id: 109, title: 'Raging Bull', year: 1980, genre: 'Biography', runtime: 129, rating: 4.5 }
      ]
    },
    {
      name: 'Quentin Tarantino',
      movies: 5,
      avgRating: 4.6,
      filmography: [
        { id: 5, title: 'Pulp Fiction', year: 1994, genre: 'Crime', runtime: 154, rating: 4.75 },
        { id: 110, title: 'Kill Bill: Vol. 1', year: 2003, genre: 'Action', runtime: 111, rating: 4.5 },
        { id: 111, title: 'Inglourious Basterds', year: 2009, genre: 'War', runtime: 153, rating: 4.75 },
        { id: 112, title: 'Django Unchained', year: 2012, genre: 'Western', runtime: 165, rating: 4.5 },
        { id: 113, title: 'Once Upon a Time in Hollywood', year: 2019, genre: 'Drama', runtime: 161, rating: 4.5 }
      ]
    },
    {
      name: 'Denis Villeneuve',
      movies: 4,
      avgRating: 4.8,
      filmography: [
        { id: 114, title: 'Blade Runner 2049', year: 2017, genre: 'Sci-Fi', runtime: 164, rating: 4.75 },
        { id: 115, title: 'Arrival', year: 2016, genre: 'Sci-Fi', runtime: 116, rating: 4.75 },
        { id: 116, title: 'Dune', year: 2021, genre: 'Sci-Fi', runtime: 155, rating: 5.0 },
        { id: 117, title: 'Sicario', year: 2015, genre: 'Thriller', runtime: 121, rating: 4.5 }
      ]
    },
    {
      name: 'David Fincher',
      movies: 4,
      avgRating: 4.4,
      filmography: [
        { id: 11, title: 'Fight Club', year: 1999, genre: 'Drama', runtime: 139, rating: 4.25 },
        { id: 15, title: 'Se7en', year: 1995, genre: 'Thriller', runtime: 127, rating: 4.75 },
        { id: 118, title: 'Gone Girl', year: 2014, genre: 'Thriller', runtime: 149, rating: 4.5 },
        { id: 119, title: 'The Social Network', year: 2010, genre: 'Biography', runtime: 120, rating: 4.25 }
      ]
    }
  ];

  // All movies for overlay (using dummy data matching the stats)
  const allMovies = [
    { id: 1, title: "The Dark Knight", year: 2008, posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", rating: 4.75, dateWatched: "2026-04-08" },
    { id: 2, title: "Parasite", year: 2019, posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", rating: 5, dateWatched: "2026-04-05" },
    { id: 3, title: "Interstellar", year: 2014, posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", rating: 4.5, dateWatched: "2026-04-01" },
    { id: 4, title: "The Godfather", year: 1972, posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", rating: 5, dateWatched: "2026-03-28" },
    { id: 5, title: "Pulp Fiction", year: 1994, posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", rating: 4.75, dateWatched: "2026-03-25" },
    { id: 6, title: "The Matrix", year: 1999, posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", rating: 4.75, dateWatched: "2026-03-20" },
    { id: 7, title: "Goodfellas", year: 1990, posterUrl: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg", rating: 4.5, dateWatched: "2026-03-15" },
    { id: 8, title: "Fight Club", year: 1999, posterUrl: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", rating: 4.25, dateWatched: "2026-03-10" },
    { id: 9, title: "Inception", year: 2010, posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", rating: 4.75, dateWatched: "2026-03-05" },
    { id: 10, title: "The Shawshank Redemption", year: 1994, posterUrl: "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg", rating: 5, dateWatched: "2026-03-01" },
    { id: 104, title: "Oppenheimer", year: 2023, posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", rating: 5.0, dateWatched: "2026-02-12" },
    { id: 105, title: "The Departed", year: 2006, posterUrl: "https://image.tmdb.org/t/p/w500/nT97ifVT2J1yMQmeq20Qblg61T.jpg", rating: 4.75, dateWatched: "2026-02-08" },
  ];

  // Filter movies based on timeRange
  const getFilteredMovies = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return allMovies.filter(movie => {
      const movieDate = new Date(movie.dateWatched);
      const movieMonth = movieDate.getMonth();
      const movieYear = movieDate.getFullYear();

      if (timeRange === 'month') {
        return movieMonth === currentMonth && movieYear === currentYear;
      } else if (timeRange === 'year') {
        return movieYear === currentYear;
      }
      return true;
    });
  };

  const movieStats = {
    totalMovies: 152, // Including rewatches
    uniqueMovies: 148, // Unique titles
    totalRuntime: 18240, // in minutes
    averageRating: 4.2,
    moviesThisMonth: 12,
    longestMovie: { title: 'The Irishman', runtime: 209 },
    shortestMovie: { title: 'Sherlock Jr.', runtime: 45 },
    highestRated: [
      { title: 'Oppenheimer', rating: 5.0, year: 2023 },
      { title: 'Parasite', rating: 5.0, year: 2019 },
      { title: 'The Shawshank Redemption', rating: 5.0, year: 1994 }
    ],
    lowestRated: [
      { title: 'The Room', rating: 1.5, year: 2003 },
      { title: 'Battlefield Earth', rating: 1.75, year: 2000 },
      { title: 'Cats', rating: 2.0, year: 2019 }
    ],
    mostRewatched: [
      { title: 'The Dark Knight', rewatches: 4, year: 2008 },
      { title: 'Inception', rewatches: 3, year: 2010 },
      { title: 'The Shawshank Redemption', rewatches: 3, year: 1994 }
    ],
    mostWatchedGenre: 'Drama',
    favouriteDecade: '1990s',
    uniqueDirectors: 87
  };

  const tvStats = {
    totalShows: 67, // Including rewatches
    uniqueShows: 63, // Unique titles
    totalRuntime: 8940, // in minutes
    averageRating: 4.3,
    showsThisMonth: 6,
    longestShow: { title: 'The Office (US)', runtime: 22 },
    shortestShow: { title: 'The IT Crowd', runtime: 25 },
    highestRated: [
      { title: 'Flight of the Conchords', rating: 5.0, year: 2007 },
      { title: 'Derry Girls', rating: 5.0, year: 2018 },
      { title: 'The Mighty Boosh', rating: 5.0, year: 2004 }
    ],
    lowestRated: [
      { title: 'Generic Sitcom 1', rating: 2.0, year: 2020 },
      { title: 'Bad Reality Show', rating: 2.25, year: 2019 },
      { title: 'Cancelled After One', rating: 2.5, year: 2021 }
    ],
    mostRewatched: [
      { title: "Bob's Burgers", rewatches: 5, year: 2011 },
      { title: 'The Office (US)', rewatches: 4, year: 2005 },
      { title: 'Peep Show', rewatches: 3, year: 2003 }
    ],
    mostWatchedGenre: 'Comedy',
    favouriteDecade: '2000s',
    uniqueCreators: 42
  };

  const stats = mediaType === 'movies' ? movieStats : tvStats;

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatTotalRuntime = (minutes: number) => {
    const days = Math.floor(minutes / (60 * 24));
    const hours = Math.floor((minutes % (60 * 24)) / 60);
    return `${days}d ${hours}h`;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl text-foreground">The Archives</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMediaType('movies')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                mediaType === 'movies'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground border border-border hover:bg-accent'
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => setMediaType('tv')}
              className={`px-6 py-2 rounded-lg transition-colors ${
                mediaType === 'tv'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground border border-border hover:bg-accent'
              }`}
            >
              TV Shows
            </button>
          </div>
        </div>
        <p className="text-muted-foreground">
          {mediaType === 'movies'
            ? 'Insights and statistics about your movie-watching journey'
            : 'Insights and statistics about your TV show-watching journey'}
        </p>
      </div>

      {/* Time Range Filter */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setTimeRange('month')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            timeRange === 'month'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-foreground border border-border hover:bg-accent'
          }`}
        >
          This Month
        </button>
        <button
          onClick={() => setTimeRange('year')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            timeRange === 'year'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-foreground border border-border hover:bg-accent'
          }`}
        >
          This Year
        </button>
        <button
          onClick={() => setTimeRange('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            timeRange === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-foreground border border-border hover:bg-accent'
          }`}
        >
          All Time
        </button>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <Film className="w-5 h-5 text-primary" />
            <h3 className="text-muted-foreground">
              {mediaType === 'movies' ? 'Total Movies' : 'Total Shows'}
            </h3>
          </div>
          <p className="text-3xl text-foreground font-semibold">
            {mediaType === 'movies' ? stats.totalMovies : stats.totalShows}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {mediaType === 'movies' ? stats.uniqueMovies : stats.uniqueShows} unique • +{mediaType === 'movies' ? stats.moviesThisMonth : stats.showsThisMonth} this month
          </p>
          <button
            onClick={() => setShowMoviesOverlay(true)}
            className="mt-3 w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            {mediaType === 'movies' ? 'See all movies' : 'See all shows'}
          </button>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="text-muted-foreground">Total Runtime</h3>
          </div>
          <p className="text-3xl text-foreground font-semibold">{formatTotalRuntime(stats.totalRuntime)}</p>
          <p className="text-sm text-muted-foreground mt-1">of cinema watched</p>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-5 h-5 text-primary" />
            <h3 className="text-muted-foreground">Average Rating</h3>
          </div>
          <p className="text-3xl text-foreground font-semibold">{stats.averageRating.toFixed(1)}</p>
          <p className="text-sm text-muted-foreground mt-1">out of 5.0</p>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-5 h-5 text-primary" />
            <h3 className="text-muted-foreground">
              {mediaType === 'movies' ? 'Directors' : 'Creators'}
            </h3>
          </div>
          <p className="text-3xl text-foreground font-semibold">
            {mediaType === 'movies' ? stats.uniqueDirectors : stats.uniqueCreators}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            unique {mediaType === 'movies' ? 'directors' : 'creators'}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Movies by Month */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h2 className="text-lg text-foreground mb-4">Movies Watched by Month</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mediaType === 'movies' ? moviesByMonth : showsByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2442" />
              <XAxis dataKey="month" stroke="#9fa8da" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9fa8da" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#141937',
                  border: '1px solid rgba(156, 169, 218, 0.2)',
                  borderRadius: '8px',
                  color: '#e8eaf6'
                }}
              />
              <Bar dataKey="movies" fill="#d4af37" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Genre Distribution */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h2 className="text-lg text-foreground mb-4">Genre Distribution</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={genreDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                style={{ fontSize: '11px' }}
              >
                {genreDistribution.map((entry) => (
                  <Cell key={`genre-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Country Distribution */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h2 className="text-lg text-foreground mb-4">Country of Origin</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={countryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                style={{ fontSize: '11px' }}
              >
                {countryDistribution.map((entry) => (
                  <Cell key={`country-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6 mb-8">
        <h2 className="text-xl text-foreground mb-6">Rating Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ratingDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2442" />
            <XAxis dataKey="rating" stroke="#9fa8da" />
            <YAxis stroke="#9fa8da" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#141937',
                border: '1px solid rgba(156, 169, 218, 0.2)',
                borderRadius: '8px',
                color: '#e8eaf6'
              }}
            />
            <Bar dataKey="count" fill="#3949ab" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Directors */}
      <div className="bg-card rounded-xl shadow-sm border border-border p-6 mb-8">
        <h2 className="text-xl text-foreground mb-6">Most Watched Directors</h2>
        <div className="space-y-4">
          {topDirectors.map((director, index) => (
            <div key={index} className="bg-muted rounded-lg overflow-hidden">
              <div
                onClick={() => setExpandedDirector(expandedDirector === index ? null : index)}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-foreground font-medium">{director.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {director.movies} {director.movies === 1 ? 'movie' : 'movies'} • Avg rating: {director.avgRating}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(director.avgRating)
                            ? 'fill-primary text-primary'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  {expandedDirector === index ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </div>

              {/* Expanded Filmography */}
              {expandedDirector === index && (
                <div className="px-4 pb-4 space-y-3">
                  <div className="h-px bg-border mb-3" />
                  {director.filmography.map((film) => (
                    <div
                      key={film.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/review/${film.id}`);
                      }}
                      className="flex items-center justify-between p-3 bg-card rounded-lg hover:bg-card/80 transition-colors cursor-pointer"
                    >
                      <div className="flex-1">
                        <h4 className="text-foreground font-medium mb-1">{film.title}</h4>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{film.year}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Film className="w-3 h-3" />
                            <span>{film.genre}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{film.runtime} min</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StarRating rating={film.rating} size={14} />
                        <span className="text-sm text-foreground font-medium">{film.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fun Facts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-secondary to-accent rounded-xl shadow-sm border border-border p-6">
          <h2 className="text-xl text-foreground mb-4">Longest Movie</h2>
          <p className="text-2xl text-foreground font-semibold mb-2">{stats.longestMovie.title}</p>
          <p className="text-muted-foreground">{formatRuntime(stats.longestMovie.runtime)}</p>
        </div>

        <div className="bg-gradient-to-br from-secondary to-accent rounded-xl shadow-sm border border-border p-6">
          <h2 className="text-xl text-foreground mb-4">Shortest Movie</h2>
          <p className="text-2xl text-foreground font-semibold mb-2">{stats.shortestMovie.title}</p>
          <p className="text-muted-foreground">{formatRuntime(stats.shortestMovie.runtime)}</p>
        </div>
      </div>

      {/* Highest and Lowest Rated */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-secondary to-accent rounded-xl shadow-sm border border-border p-6">
          <h2 className="text-xl text-foreground mb-4">Highest Rated</h2>
          <div className="space-y-3">
            {stats.highestRated.map((movie, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-foreground font-semibold">{movie.title}</p>
                  <p className="text-sm text-muted-foreground">{movie.year}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={movie.rating} size={14} />
                  <span className="text-primary font-semibold">{movie.rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-secondary to-accent rounded-xl shadow-sm border border-border p-6">
          <h2 className="text-xl text-foreground mb-4">Lowest Rated</h2>
          <div className="space-y-3">
            {stats.lowestRated.map((movie, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-foreground font-semibold">{movie.title}</p>
                  <p className="text-sm text-muted-foreground">{movie.year}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={movie.rating} size={14} />
                  <span className="text-muted-foreground font-semibold">{movie.rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Most Rewatched */}
      <div className="bg-gradient-to-br from-secondary to-accent rounded-xl shadow-sm border border-border p-6 mb-8">
        <h2 className="text-xl text-foreground mb-4">Most Rewatched</h2>
        <div className="space-y-3">
          {stats.mostRewatched.map((movie, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-semibold">{movie.title}</p>
                <p className="text-sm text-muted-foreground">{movie.year}</p>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <Film className="w-4 h-4" />
                <span className="font-semibold">{movie.rewatches} {movie.rewatches === 1 ? 'rewatch' : 'rewatches'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Movies Overlay */}
      {showMoviesOverlay && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-background border border-border rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Overlay Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h2 className="text-2xl text-foreground mb-1">
                  {timeRange === 'month' ? 'This Month' : 'This Year'} - Movies Archive
                </h2>
                <p className="text-muted-foreground">
                  {getFilteredMovies().length} {getFilteredMovies().length === 1 ? 'movie' : 'movies'} watched {timeRange === 'month' ? 'this month' : 'this year'}
                </p>
              </div>
              <button
                onClick={() => setShowMoviesOverlay(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Overlay Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {getFilteredMovies().map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => {
                      setShowMoviesOverlay(false);
                      navigate(`/review/${movie.id}`);
                    }}
                    className="bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                  >
                    <div className="relative overflow-hidden aspect-[2/3]">
                      <ImageWithFallback
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <div className="flex items-center gap-1">
                          <StarRating rating={movie.rating} size={12} />
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      <h3 className="text-xs text-foreground line-clamp-1">{movie.title}</h3>
                      <p className="text-xs text-muted-foreground">{movie.year}</p>
                    </div>
                  </div>
                ))}
              </div>

              {getFilteredMovies().length === 0 && (
                <div className="text-center py-12">
                  <Film className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-foreground mb-2">No movies found</h3>
                  <p className="text-muted-foreground">
                    No movies watched {timeRange === 'month' ? 'this month' : 'this year'} yet
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
