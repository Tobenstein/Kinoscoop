import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { toast } from 'sonner';

interface TVCommentaryFormProps {
  commentary?: any | null;
  onClose: () => void;
}

export function TVCommentaryForm({ commentary, onClose }: TVCommentaryFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    year: new Date().getFullYear(),
    rating: 4.0,
    published_date: new Date().toISOString().split('T')[0],
    genre: '',
    poster_url: '',
    backdrop_url: '',
    cast_members: '',
    synopsis: '',
    review: '',
    standout_moments: '',
    rewatch: '',
    tags: '',
    viewing_medium: '',
    streaming_service: '',
    imdb_url: '',
    broadcaster: '',
    seasons: 1,
    episodes: 1,
    avg_runtime: 45,
    is_featured: false
  });

  useEffect(() => {
    if (commentary) {
      setFormData({
        title: commentary.title || '',
        director: commentary.director || '',
        year: commentary.year || new Date().getFullYear(),
        rating: commentary.rating || 4.0,
        published_date: commentary.published_date || new Date().toISOString().split('T')[0],
        genre: commentary.genre || '',
        poster_url: commentary.poster_url || '',
        backdrop_url: commentary.backdrop_url || '',
        cast: commentary.cast || '',
        synopsis: commentary.synopsis || '',
        review: commentary.review || '',
        standout_moments: commentary.standout_moments || '',
        rewatch: commentary.rewatch || '',
        tags: commentary.tags?.join(', ') || '',
        viewing_medium: commentary.viewing_medium || '',
        streaming_service: commentary.streaming_service || '',
        imdb_url: commentary.imdb_url || '',
        broadcaster: commentary.broadcaster || '',
        seasons: commentary.seasons || 1,
        episodes: commentary.episodes || 1,
        avg_runtime: commentary.avg_runtime || 45,
        is_featured: commentary.is_featured || false
      });
    }
  }, [commentary]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);

      const payload = {
        type: 'tv',
        ...formData,
        tags: tagsArray
      };

      if (commentary) {
        const { error } = await supabase
          .from('commentary')
          .update(payload)
          .eq('id', commentary.id);

        if (error) throw error;
        toast.success('TV commentary updated successfully!');
      } else {
        const { error } = await supabase
          .from('commentary')
          .insert([payload]);

        if (error) throw error;
        toast.success('TV commentary created successfully!');
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
          {commentary ? 'Edit TV Show Commentary' : 'New TV Show Commentary'}
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
            <label className="block text-foreground mb-2">TV Show Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Creator/Director</label>
            <input
              type="text"
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
              min="1950"
              max={new Date().getFullYear() + 1}
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Broadcaster</label>
            <input
              type="text"
              value={formData.broadcaster}
              onChange={(e) => setFormData({ ...formData, broadcaster: e.target.value })}
              placeholder="e.g., BBC, HBO, Netflix, etc."
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Number of Seasons</label>
            <input
              type="number"
              min="1"
              value={formData.seasons}
              onChange={(e) => setFormData({ ...formData, seasons: parseInt(e.target.value) || 1 })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Total Episodes</label>
            <input
              type="number"
              min="1"
              value={formData.episodes}
              onChange={(e) => setFormData({ ...formData, episodes: parseInt(e.target.value) || 1 })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Average Runtime (minutes)</label>
            <input
              type="number"
              min="1"
              value={formData.avg_runtime}
              onChange={(e) => setFormData({ ...formData, avg_runtime: parseInt(e.target.value) || 45 })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Genre</label>
            <input
              type="text"
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              placeholder="Drama, Comedy, Crime, etc."
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Published Date *</label>
            <input
              type="date"
              required
              value={formData.published_date}
              onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
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

          <div>
            <label className="block text-foreground mb-2">Backdrop URL (TMDB)</label>
            <input
              type="url"
              value={formData.backdrop_url}
              onChange={(e) => setFormData({ ...formData, backdrop_url: e.target.value })}
              placeholder="https://image.tmdb.org/t/p/original/..."
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>
        </div>

        {/* Viewing Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-foreground mb-2">Viewing Medium</label>
            <select
              value={formData.viewing_medium}
              onChange={(e) => setFormData({ ...formData, viewing_medium: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            >
              <option value="">Select medium...</option>
              <option value="Streaming">Streaming</option>
              <option value="TV">TV</option>
              <option value="Home Video">Home Video (DVD/Blu-ray)</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {formData.viewing_medium === 'Streaming' && (
            <div>
              <label className="block text-foreground mb-2">Streaming Service</label>
              <input
                type="text"
                value={formData.streaming_service}
                onChange={(e) => setFormData({ ...formData, streaming_service: e.target.value })}
                placeholder="e.g., Netflix, Amazon Prime, etc."
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
              />
            </div>
          )}

          <div>
            <label className="block text-foreground mb-2">IMDb Link (optional)</label>
            <input
              type="url"
              value={formData.imdb_url}
              onChange={(e) => setFormData({ ...formData, imdb_url: e.target.value })}
              placeholder="https://www.imdb.com/title/..."
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>
        </div>

        {/* Cast */}
        <div>
          <label className="block text-foreground mb-2">Cast</label>
          <input
            type="text"
            value={formData.cast}
            onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
            placeholder="Actor 1, Actor 2, Actor 3, etc."
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
          />
        </div>

        {/* Synopsis */}
        <div>
          <label className="block text-foreground mb-2">Synopsis</label>
          <textarea
            value={formData.synopsis}
            onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
            rows={3}
            placeholder="Brief plot summary..."
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
          />
        </div>

        {/* Review */}
        <div>
          <label className="block text-foreground mb-2">Review *</label>
          <textarea
            required
            value={formData.review}
            onChange={(e) => setFormData({ ...formData, review: e.target.value })}
            rows={12}
            placeholder="Your full review..."
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
          />
        </div>

        {/* Standout Moments */}
        <div>
          <label className="block text-foreground mb-2">Standout Moments</label>
          <textarea
            value={formData.standout_moments}
            onChange={(e) => setFormData({ ...formData, standout_moments: e.target.value })}
            rows={3}
            placeholder="Memorable episodes or moments..."
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
          />
        </div>

        {/* Rewatch Value */}
        <div>
          <label className="block text-foreground mb-2">Would I Rewatch?</label>
          <textarea
            value={formData.rewatch}
            onChange={(e) => setFormData({ ...formData, rewatch: e.target.value })}
            rows={2}
            placeholder="Your thoughts on rewatchability..."
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-foreground mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="Thriller, Mind-Bending, Comedy, etc."
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
          />
        </div>

        {/* Featured */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_featured"
            checked={formData.is_featured}
            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
            className="w-4 h-4"
          />
          <label htmlFor="is_featured" className="text-foreground">
            Feature this commentary on the main page
          </label>
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
            {loading ? 'Saving...' : commentary ? 'Update Commentary' : 'Create Commentary'}
          </button>
        </div>
      </form>
    </div>
  );
}
