import { BarChart3, TrendingUp, Film, Clock, Calendar, Star, User } from 'lucide-react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsProps {
  onNavigateToReview: (reviewId: number) => void;
}

export function Analytics({ onNavigateToReview }: AnalyticsProps) {
  const [timeRange, setTimeRange] = useState('year');

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
    { name: 'Drama', value: 28, color: '#c62828' },
    { name: 'Action', value: 22, color: '#3949ab' },
    { name: 'Sci-Fi', value: 18, color: '#5c6bc0' },
    { name: 'Thriller', value: 15, color: '#7986cb' },
    { name: 'Comedy', value: 10, color: '#9fa8da' },
    { name: 'Other', value: 7, color: '#283593' }
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
    { name: 'Christopher Nolan', movies: 8, avgRating: 4.7 },
    { name: 'Martin Scorsese', movies: 6, avgRating: 4.5 },
    { name: 'Quentin Tarantino', movies: 5, avgRating: 4.6 },
    { name: 'Denis Villeneuve', movies: 4, avgRating: 4.8 },
    { name: 'David Fincher', movies: 4, avgRating: 4.4 }
  ];

  const stats = {
    totalMovies: 152,
    totalRuntime: 18240, // in minutes
    averageRating: 4.2,
    moviesThisMonth: 12,
    longestMovie: { title: 'The Irishman', runtime: 209 },
    shortestMovie: { title: 'Sherlock Jr.', runtime: 45 },
    mostWatchedGenre: 'Drama',
    favoriteDecade: '1990s',
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
          <h1 className="text-3xl text-foreground">Analytics</h1>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Movies by Month */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h2 className="text-xl text-foreground mb-6">Movies Watched by Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={moviesByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2442" />
              <XAxis dataKey="month" stroke="#9fa8da" />
              <YAxis stroke="#9fa8da" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#141937',
                  border: '1px solid rgba(156, 169, 218, 0.2)',
                  borderRadius: '8px',
                  color: '#e8eaf6'
                }}
              />
              <Bar dataKey="movies" fill="#c62828" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Genre Distribution */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-6">
          <h2 className="text-xl text-foreground mb-6">Genre Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genreDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
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
            <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-4">
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
