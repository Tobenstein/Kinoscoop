import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { toast } from 'sonner';

interface LogMovieFormProps {
  movie?: {
    id: number;
    movie_title: string;
    director: string;
    year: number;
    rating: number;
    date_watched: string;
    runtime?: number;
    genre?: string;
    poster_url?: string;
    review?: string;
  } | null;
  onClose: () => void;
}

export function LogMovieForm({ movie, onClose }: LogMovieFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    movie_title: '',
    director: '',
    year: new Date().getFullYear(),
    rating: 4.0,
    date_watched: new Date().toISOString().split('T')[0],
    runtime: 120,
    genre: '',
    poster_url: '',
    review: ''
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        movie_title: movie.movie_title,
        director: movie.director,
        year: movie.year,
        rating: movie.rating,
        date_watched: movie.date_watched,
        runtime: movie.runtime || 120,
        genre: movie.genre || '',
        poster_url: movie.poster_url || '',
        review: movie.review || ''
      });
    }
  }, [movie]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (movie) {
        // Update existing
        const { error } = await supabase
          .from('logged_movies')
          .update(formData)
          .eq('id', movie.id);

        if (error) throw error;
        toast.success('Movie updated successfully!');
      } else {
        // Create new
        const { error } = await supabase
          .from('logged_movies')
          .insert([formData]);

        if (error) throw error;
        toast.success('Movie logged successfully!');
      }

      onClose();
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-foreground">
          {movie ? 'Edit Movie' : 'Log New Movie'}
        </h2>
        <button
          onClick={onClose}
          className="p-2 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-6 space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-foreground mb-2">Movie Title *</label>
            <input
              type="text"
              required
              value={formData.movie_title}
              onChange={(e) => setFormData({ ...formData, movie_title: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Director *</label>
            <input
              type="text"
              required
              value={formData.director}
              onChange={(e) => setFormData({ ...formData, director: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Year *</label>
            <input
              type="number"
              required
              min="1888"
              max={new Date().getFullYear() + 1}
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Runtime (minutes)</label>
            <input
              type="number"
              min="1"
              value={formData.runtime}
              onChange={(e) => setFormData({ ...formData, runtime: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Genre</label>
            <input
              type="text"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              placeholder="Drama, Action, Sci-Fi, etc."
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Date Watched *</label>
            <input
              type="date"
              required
              value={formData.date_watched}
              onChange={(e) => setFormData({ ...formData, date_watched: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Rating (0-5) *</label>
            <input
              type="number"
              required
              min="0"
              max="5"
              step="0.25"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Poster URL (TMDB)</label>
            <input
              type="url"
              value={formData.poster_url}
              onChange={(e) => setFormData({ ...formData, poster_url: e.target.value })}
              placeholder="https://image.tmdb.org/t/p/w500/..."
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>
        </div>

        {/* Review */}
        <div>
          <label className="block text-foreground mb-2">Review (optional)</label>
          <textarea
            value={formData.review}
            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
            rows={6}
            placeholder="Your thoughts on the movie..."
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-accent"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : movie ? 'Update Movie' : 'Log Movie'}
          </button>
        </div>
      </form>
    </div>
  );
}
