import { useState, useEffect } from 'react';
import { Trash2, Edit, Plus } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { toast } from 'sonner';
import { LogMovieForm } from './LogMovieForm';
import { LogTVShowForm } from './LogTVShowForm';

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

interface LoggedTVShow {
  id: number;
  title: string;
  creator: string;
  year: number;
  rating: number;
  date_watched: string;
  episodes?: number;
  avg_runtime?: number;
  genre?: string;
  poster_url?: string;
  review?: string;
}

export function LogManager() {
  const [mediaType, setMediaType] = useState<'movies' | 'tv'>('movies');
  const [movies, setMovies] = useState<LoggedMovie[]>([]);
  const [tvShows, setTVShows] = useState<LoggedTVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<LoggedMovie | null>(null);
  const [editingTVShow, setEditingTVShow] = useState<LoggedTVShow | null>(null);

  useEffect(() => {
    fetchMovies();
    fetchTVShows();
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

  const fetchTVShows = async () => {
    if (!isSupabaseConfigured()) {
      return;
    }

    try {
      const { data, error } = await supabase
        .from('tv_shows')
        .select('*')
        .order('date_watched', { ascending: false });

      if (error) throw error;

      setTVShows(data || []);
    } catch (error: any) {
      console.error('Error loading TV shows:', error);
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

  const handleDeleteTVShow = async (id: number) => {
    if (!confirm('Are you sure you want to delete this TV show?')) return;

    try {
      const { error } = await supabase
        .from('tv_shows')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('TV show deleted successfully');
      fetchTVShows();
    } catch (error: any) {
      toast.error(`Error deleting TV show: ${error.message}`);
    }
  };

  const handleEdit = (movie: LoggedMovie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleEditTVShow = (show: LoggedTVShow) => {
    setEditingTVShow(show);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingMovie(null);
    setEditingTVShow(null);
    fetchMovies();
    fetchTVShows();
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
    return mediaType === 'movies' ? (
      <LogMovieForm
        movie={editingMovie}
        onClose={handleFormClose}
      />
    ) : (
      <LogTVShowForm
        show={editingTVShow}
        onClose={handleFormClose}
      />
    );
  }

  const currentList = mediaType === 'movies' ? movies : tvShows;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setMediaType('movies')}
          className={`px-6 py-3 rounded-lg transition-colors ${
            mediaType === 'movies'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-foreground border border-border hover:bg-accent'
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => setMediaType('tv')}
          className={`px-6 py-3 rounded-lg transition-colors ${
            mediaType === 'tv'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-foreground border border-border hover:bg-accent'
          }`}
        >
          TV Shows
        </button>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-foreground">
          {mediaType === 'movies' ? `Logged Movies (${movies.length})` : `Logged TV Shows (${tvShows.length})`}
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          {mediaType === 'movies' ? 'Log New Movie' : 'Log New TV Show'}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      ) : currentList.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <p className="text-muted-foreground mb-4">
            {mediaType === 'movies' ? 'No movies logged yet' : 'No TV shows logged yet'}
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            {mediaType === 'movies' ? 'Log Your First Movie' : 'Log Your First TV Show'}
          </button>
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-foreground">Title</th>
                  <th className="px-6 py-3 text-left text-foreground">
                    {mediaType === 'movies' ? 'Director' : 'Creator'}
                  </th>
                  <th className="px-6 py-3 text-left text-foreground">Year</th>
                  <th className="px-6 py-3 text-left text-foreground">Rating</th>
                  <th className="px-6 py-3 text-left text-foreground">Date Watched</th>
                  <th className="px-6 py-3 text-left text-foreground">
                    {mediaType === 'movies' ? 'Genre' : 'Episodes'}
                  </th>
                  <th className="px-6 py-3 text-right text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mediaType === 'movies' ? (
                  movies.map((movie) => (
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
                  ))
                ) : (
                  tvShows.map((show) => (
                    <tr key={show.id} className="border-b border-border hover:bg-muted/50">
                      <td className="px-6 py-4 text-foreground font-medium">{show.title}</td>
                      <td className="px-6 py-4 text-muted-foreground">{show.creator}</td>
                      <td className="px-6 py-4 text-muted-foreground">{show.year}</td>
                      <td className="px-6 py-4 text-foreground">{show.rating.toFixed(1)} ⭐</td>
                      <td className="px-6 py-4 text-muted-foreground">{formatDate(show.date_watched)}</td>
                      <td className="px-6 py-4 text-muted-foreground">{show.episodes || '-'}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditTVShow(show)}
                            className="p-2 text-foreground hover:bg-accent rounded-lg"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTVShow(show.id)}
                            className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
