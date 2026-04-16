import { BarChart3, TrendingUp, Film, Clock, Calendar, Star, User, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { StarRating } from '../components/StarRating';

export function Analytics() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('year');
  const [expandedDirector, setExpandedDirector] = useState<number | null>(null);

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

  const genreDistribution = [
    { name: 'Drama', value: 28, color: '#d4af37' },
    { name: 'Action', value: 22, color: '#3949ab' },
    { name: 'Sci-Fi', value: 18, color: '#5c6bc0' },
    { name: 'Thriller', value: 15, color: '#7986cb' },
    { name: 'Comedy', value: 10, color: '#9fa8da' },
    { name: 'Other', value: 7, color: '#283593' }
  ];

  const countryDistribution = [
    { name: 'France', value: 32, color: '#d4af37' },
    { name: 'USA', value: 45, color: '#3949ab' },
    { name: 'UK', value: 18, color: '#5c6bc0' },
    { name: 'Japan', value: 15, color: '#7986cb' },
    { name: 'South Korea', value: 12, color: '#9fa8da' },
    { name: 'Other', value: 30, color: '#283593' }
  ];

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

  const stats = {
    totalMovies: 152,
    totalRuntime: 18240, // in minutes
    averageRating: 4.2,
    moviesThisMonth: 12,
    longestMovie: { title: 'The Irishman', runtime: 209 },
    shortestMovie: { title: 'Sherlock Jr.', runtime: 45 },
    mostWatchedGenre: 'Drama',
    favouriteDecade: '1990s',
    uniqueDirectors: 87
  };

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
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-8 h-8 text-primary" />
          <h1 className="text-3xl text-foreground">The Archives</h1>
        </div>
        <p className="text-muted-foreground">
          Insights and statistics about your movie-watching journey
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
            <h3 className="text-muted-foreground">Total Movies</h3>
          </div>
          <p className="text-3xl text-foreground font-semibold">{stats.totalMovies}</p>
          <p className="text-sm text-muted-foreground mt-1">+{stats.moviesThisMonth} this month</p>
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
            <h3 className="text-muted-foreground">Directors</h3>
          </div>
          <p className="text-3xl text-foreground font-semibold">{stats.uniqueDirectors}</p>
          <p className="text-sm text-muted-foreground mt-1">unique directors</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Movies by Month */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h2 className="text-lg text-foreground mb-4">Movies Watched by Month</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={moviesByMonth}>
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
                {genreDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#141937',
                  border: '1px solid rgba(156, 169, 218, 0.2)',
                  borderRadius: '8px',
                  color: '#e8eaf6'
                }}
              />
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
                {countryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#141937',
                  border: '1px solid rgba(156, 169, 218, 0.2)',
                  borderRadius: '8px',
                  color: '#e8eaf6'
                }}
              />
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
}
