import { useState, useEffect } from 'react';
import { Trash2, Edit, Plus } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { toast } from 'sonner';
import { LogMovieForm } from './LogMovieForm';

interface LoggedMovie {
  id: number;
  title: string;
  director: string;
  year: number;
  rating: number;
  date_watched: string;
  runtime?: number;
  genre?: string;
  poster_url?: string;
  review?: string;
}

export function LogManager() {
  const [movies, setMovies] = useState<LoggedMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<LoggedMovie | null>(null);

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
        .from('movies')
        .select('*')
        .order('date_watched', { ascending: false });

      if (error) throw error;

      setMovies(data || []);
    } catch (error: any) {
      toast.error(`Error loading movies: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this movie?')) return;

    try {
      const { error } = await supabase
        .from('movies')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Movie deleted successfully');
      fetchMovies();
    } catch (error: any) {
      toast.error(`Error deleting movie: ${error.message}`);
    }
  };

  const handleEdit = (movie: LoggedMovie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingMovie(null);
    fetchMovies();
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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

  if (showForm) {
    return (
      <LogMovieForm
        movie={editingMovie}
        onClose={handleFormClose}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-foreground">Logged Movies ({movies.length})</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Log New Movie
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      ) : movies.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <p className="text-muted-foreground mb-4">No movies logged yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            Log Your First Movie
          </button>
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-foreground">Title</th>
                  <th className="px-6 py-3 text-left text-foreground">Director</th>
                  <th className="px-6 py-3 text-left text-foreground">Year</th>
                  <th className="px-6 py-3 text-left text-foreground">Rating</th>
                  <th className="px-6 py-3 text-left text-foreground">Date Watched</th>
                  <th className="px-6 py-3 text-left text-foreground">Genre</th>
                  <th className="px-6 py-3 text-right text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 text-foreground font-medium">{movie.title}</td>
                    <td className="px-6 py-4 text-muted-foreground">{movie.director}</td>
                    <td className="px-6 py-4 text-muted-foreground">{movie.year}</td>
                    <td className="px-6 py-4 text-foreground">{movie.rating.toFixed(1)} ⭐</td>
                    <td className="px-6 py-4 text-muted-foreground">{formatDate(movie.date_watched)}</td>
                    <td className="px-6 py-4 text-muted-foreground">{movie.genre || '-'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(movie)}
                          className="p-2 text-foreground hover:bg-accent rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(movie.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
