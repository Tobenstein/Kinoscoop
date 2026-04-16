import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function AnalyticsDataManager() {
  const [moviesByMonth, setMoviesByMonth] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('logged_movies')
        .select('date_watched');

      if (error) throw error;

      // Group by month
      const monthCounts: { [key: string]: number } = {};
      data?.forEach((movie) => {
        const month = new Date(movie.date_watched).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      });

      const chartData = Object.entries(monthCounts).map(([month, count]) => ({
        month,
        movies: count
      }));

      setMoviesByMonth(chartData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isSupabaseConfigured()) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <p className="text-muted-foreground">
          Supabase is not configured. Please set up your database to view analytics.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-foreground">Analytics Data</h2>

      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-foreground mb-6">Movies by Month</h3>
        {loading ? (
          <p className="text-muted-foreground text-center py-12">Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
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
              <Bar dataKey="movies" fill="#d4af37" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
