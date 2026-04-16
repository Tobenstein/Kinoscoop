import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { toast } from 'sonner';

export function ReviewsManager() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('logged_movies')
        .select('*')
        .order('date_watched', { ascending: false });

      if (error) throw error;
      setMovies(data || []);
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateReview = async (id: number, review: string) => {
    try {
      const { error } = await supabase
        .from('logged_movies')
        .update({ review })
        .eq('id', id);

      if (error) throw error;
      toast.success('Review updated!');
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  if (!isSupabaseConfigured()) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <p className="text-muted-foreground">
          Supabase is not configured. Please set up your database to use this feature.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-foreground">Manage Reviews</h2>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-foreground mb-2">{movie.movie_title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {movie.director} • {movie.year} • ⭐ {movie.rating}
              </p>
              <textarea
                defaultValue={movie.review || ''}
                onBlur={(e) => updateReview(movie.id, e.target.value)}
                placeholder="Write your review..."
                rows={4}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
