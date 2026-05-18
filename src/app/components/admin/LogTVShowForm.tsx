import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { toast } from 'sonner';

interface LogTVShowFormProps {
  show?: {
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
  } | null;
  onClose: () => void;
}

export function LogTVShowForm({ show, onClose }: LogTVShowFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    creator: '',
    year: new Date().getFullYear(),
    rating: 4.0,
    date_watched: new Date().toISOString().split('T')[0],
    episodes: 1,
    avg_runtime: 22,
    genre: '',
    poster_url: '',
    review: '',
    viewing_medium: '',
    streaming_service: '',
    imdb_url: ''
  });

  useEffect(() => {
    if (show) {
      setFormData({
        title: show.title,
        creator: show.creator,
        year: show.year,
        rating: show.rating,
        date_watched: show.date_watched,
        episodes: show.episodes || 1,
        avg_runtime: show.avg_runtime || 22,
        genre: show.genre || '',
        poster_url: show.poster_url || '',
        review: show.review || '',
        viewing_medium: (show as any).viewing_medium || '',
        streaming_service: (show as any).streaming_service || '',
        imdb_url: (show as any).imdb_url || ''
      });
    }
  }, [show]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (show) {
        // Update existing
        const { error } = await supabase
          .from('tv_shows')
          .update(formData)
          .eq('id', show.id);

        if (error) throw error;
        toast.success('TV show updated successfully!');
      } else {
        // Create new
        const { error } = await supabase
          .from('tv_shows')
          .insert([formData]);

        if (error) throw error;
        toast.success('TV show logged successfully!');
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
          {show ? 'Edit TV Show' : 'Log New TV Show'}
        </h2>
        <button
          onClick={onClose}
          className="p-2 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-foreground mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
              placeholder="Bob's Burgers"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Creator(s) *</label>
            <input
              type="text"
              required
              value={formData.creator}
              onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
              placeholder="Loren Bouchard"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Year (Start) *</label>
            <input
              type="number"
              required
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
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
              step="0.25"
              min="0"
              max="5"
              required
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Episodes Watched</label>
            <input
              type="number"
              value={formData.episodes}
              onChange={(e) => setFormData({ ...formData, episodes: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
              placeholder="12"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Avg Runtime (minutes)</label>
            <input
              type="number"
              value={formData.avg_runtime}
              onChange={(e) => setFormData({ ...formData, avg_runtime: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
              placeholder="22"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Genre</label>
            <input
              type="text"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
              placeholder="Comedy, Sitcom, Animation"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Viewing Medium</label>
            <input
              type="text"
              value={formData.viewing_medium}
              onChange={(e) => setFormData({ ...formData, viewing_medium: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
              placeholder="Streaming, DVD, Blu-ray"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Streaming Service</label>
            <input
              type="text"
              value={formData.streaming_service}
              onChange={(e) => setFormData({ ...formData, streaming_service: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
              placeholder="Netflix, Hulu, etc."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-foreground mb-2">Poster URL (TMDB)</label>
            <input
              type="url"
              value={formData.poster_url}
              onChange={(e) => setFormData({ ...formData, poster_url: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
              placeholder="https://image.tmdb.org/t/p/w500/..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-foreground mb-2">IMDB URL</label>
            <input
              type="url"
              value={formData.imdb_url}
              onChange={(e) => setFormData({ ...formData, imdb_url: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
              placeholder="https://www.imdb.com/title/..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-foreground mb-2">Review/Notes</label>
            <textarea
              value={formData.review}
              onChange={(e) => setFormData({ ...formData, review: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
              placeholder="Your thoughts about this show..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
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
            {loading ? 'Saving...' : (show ? 'Update Show' : 'Log Show')}
          </button>
        </div>
      </form>
    </div>
  );
}
