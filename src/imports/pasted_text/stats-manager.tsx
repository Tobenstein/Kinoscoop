import { useState, useEffect } from 'react';
import { Film, TrendingUp, Calendar, Star } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';

export function StatsManager() {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalRuntime: 0,
    averageRating: 0,
    moviesThisMonth: 0,
    moviesThisYear: 0,
    uniqueDirectors: 0,
    mostWatchedGenre: '-',
    topRatedMovie: '-'
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    if (!isSupabaseConfigured()) return;

    try {
      const { data: movies, error } = await supabase
        .from('logged_movies')
        .select('*');

      if (error) throw error;

      if (!movies || movies.length === 0) return;

      // Calculate stats
      const now = new Date();
      const thisMonth = movies.filter(m => {
        const watchedDate = new Date(m.date_watched);
        return watchedDate.getMonth() === now.getMonth() &&
               watchedDate.getFullYear() === now.getFullYear();
      });

      const thisYear = movies.filter(m => {
        const watchedDate = new Date(m.date_watched);
        return watchedDate.getFullYear() === now.getFullYear();
      });

      const totalRuntime = movies.reduce((sum, m) => sum + (m.runtime || 0), 0);
      const avgRating = movies.reduce((sum, m) => sum + m.rating, 0) / movies.length;

      const directors = new Set(movies.map(m => m.director));

      // Genre count
      const genreCounts: { [key: string]: number } = {};
      movies.forEach(m => {
        if (m.genre) {
          genreCounts[m.genre] = (genreCounts[m.genre] || 0) + 1;
        }
      });
      const mostWatchedGenre = Object.keys(genreCounts).length > 0
        ? Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0][0]
        : '-';

      // Top rated
      const topRated = movies.sort((a, b) => b.rating - a.rating)[0];

      setStats({
        totalMovies: movies.length,
        totalRuntime,
        averageRating: avgRating,
        moviesThisMonth: thisMonth.length,
        moviesThisYear: thisYear.length,
        uniqueDirectors: directors.size,
        mostWatchedGenre,
        topRatedMovie: topRated ? topRated.movie_title : '-'
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const formatRuntime = (minutes: number) => {
    const days = Math.floor(minutes / (60 * 24));
    const hours = Math.floor((minutes % (60 * 24)) / 60);
    return `${days}d ${hours}h`;
  };

  if (!isSupabaseConfigured()) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <p className="text-muted-foreground">
          Supabase is not configured. Please set up your database to view statistics.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-foreground">Statistics Overview</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <Film className="w-5 h-5 text-primary" />
            <h3 className="text-muted-foreground">Total Movies</h3>
          </div>
          <p className="text-3xl text-foreground font-semibold">{stats.totalMovies}</p>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-muted-foreground">This Year</h3>
          </div>
          <p className="text-3xl text-foreground font-semibold">{stats.moviesThisYear}</p>
          <p className="text-sm text-muted-foreground mt-1">+{stats.moviesThisMonth} this month</p>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-5 h-5 text-primary" />
            <h3 className="text-muted-foreground">Avg Rating</h3>
          </div>
          <p className="text-3xl text-foreground font-semibold">{stats.averageRating.toFixed(1)}</p>
          <p className="text-sm text-muted-foreground mt-1">out of 5.0</p>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-muted-foreground">Total Runtime</h3>
          </div>
          <p className="text-3xl text-foreground font-semibold">{formatRuntime(stats.totalRuntime)}</p>
          <p className="text-sm text-muted-foreground mt-1">of cinema</p>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-foreground mb-4">Quick Facts</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Unique Directors</span>
              <span className="text-foreground font-medium">{stats.uniqueDirectors}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Most Watched Genre</span>
              <span className="text-foreground font-medium">{stats.mostWatchedGenre}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Top Rated Movie</span>
              <span className="text-foreground font-medium">{stats.topRatedMovie}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-secondary to-accent rounded-lg border border-border p-6">
          <h3 className="text-foreground mb-4">This Month's Progress</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground">Movies Watched</span>
                <span className="text-foreground">{stats.moviesThisMonth}</span>
              </div>
              <div className="w-full bg-background/20 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${Math.min((stats.moviesThisMonth / 10) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-foreground mt-1">Goal: 10 per month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
