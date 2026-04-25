import { useState, useEffect } from 'react';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { toast } from 'sonner';

interface Match {
  title: string;
  stipulation: string;
  rating: number;
  commentary: string;
}

interface WrestlingCommentaryFormProps {
  commentary?: any | null;
  onClose: () => void;
}

export function WrestlingCommentaryForm({ commentary, onClose }: WrestlingCommentaryFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    promotion: '',
    year: new Date().getFullYear(),
    published_date: new Date().toISOString().split('T')[0],
    runtime: 180,
    location: '',
    episodes: 0,
    poster_url: '',
    backdrop_url: '',
    main_event: '',
    featured_matches: '',
    introduction: '',
    conclusion: '',
    tags: '',
    is_featured: false
  });

  const [matches, setMatches] = useState<Match[]>([
    { title: '', stipulation: '', rating: 3.0, commentary: '' }
  ]);

  useEffect(() => {
    if (commentary) {
      setFormData({
        title: commentary.title || '',
        promotion: commentary.promotion || '',
        year: commentary.year || new Date().getFullYear(),
        published_date: commentary.published_date || new Date().toISOString().split('T')[0],
        runtime: commentary.runtime || 180,
        location: commentary.location || '',
        episodes: commentary.episodes || 0,
        poster_url: commentary.poster_url || '',
        backdrop_url: commentary.backdrop_url || '',
        main_event: commentary.main_event || '',
        featured_matches: commentary.featured_matches || '',
        introduction: commentary.introduction || '',
        conclusion: commentary.conclusion || '',
        tags: commentary.tags?.join(', ') || '',
        is_featured: commentary.is_featured || false
      });

      if (commentary.matches && commentary.matches.length > 0) {
        setMatches(commentary.matches);
      }
    }
  }, [commentary]);

  const addMatch = () => {
    setMatches([...matches, { title: '', stipulation: '', rating: 3.0, commentary: '' }]);
  };

  const removeMatch = (index: number) => {
    setMatches(matches.filter((_, i) => i !== index));
  };

  const updateMatch = (index: number, field: keyof Match, value: string | number) => {
    const updatedMatches = [...matches];
    updatedMatches[index] = { ...updatedMatches[index], [field]: value };
    setMatches(updatedMatches);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);

      const payload = {
        type: 'wrestling',
        ...formData,
        matches,
        tags: tagsArray
      };

      if (commentary) {
        const { error } = await supabase
          .from('commentary')
          .update(payload)
          .eq('id', commentary.id);

        if (error) throw error;
        toast.success('Wrestling commentary updated successfully!');
      } else {
        const { error } = await supabase
          .from('commentary')
          .insert([payload]);

        if (error) throw error;
        toast.success('Wrestling commentary created successfully!');
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
          {commentary ? 'Edit Wrestling Event Commentary' : 'New Wrestling Event Commentary'}
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
            <label className="block text-foreground mb-2">Event Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Promotion *</label>
            <input
              type="text"
              required
              value={formData.promotion}
              onChange={(e) => setFormData({ ...formData, promotion: e.target.value })}
              placeholder="e.g., WWE, AEW, NJPW, etc."
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
            <label className="block text-foreground mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Madison Square Garden, New York"
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Runtime (minutes)</label>
            <input
              type="number"
              min="1"
              value={formData.runtime}
              onChange={(e) => setFormData({ ...formData, runtime: parseInt(e.target.value) || 180 })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Number of Matches</label>
            <input
              type="number"
              min="0"
              value={formData.episodes || ''}
              onChange={(e) => setFormData({ ...formData, episodes: parseInt(e.target.value) || 0 })}
              placeholder="e.g., 8"
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
            <label className="block text-foreground mb-2">Poster URL</label>
            <input
              type="url"
              value={formData.poster_url}
              onChange={(e) => setFormData({ ...formData, poster_url: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Backdrop URL</label>
            <input
              type="url"
              value={formData.backdrop_url}
              onChange={(e) => setFormData({ ...formData, backdrop_url: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>
        </div>

        {/* Main Event */}
        <div>
          <label className="block text-foreground mb-2">Main Event</label>
          <input
            type="text"
            value={formData.main_event}
            onChange={(e) => setFormData({ ...formData, main_event: e.target.value })}
            placeholder="e.g., John Cena vs. The Rock"
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
          />
        </div>

        {/* Featured Matches */}
        <div>
          <label className="block text-foreground mb-2">Featured Matches</label>
          <textarea
            value={formData.featured_matches}
            onChange={(e) => setFormData({ ...formData, featured_matches: e.target.value })}
            rows={3}
            placeholder="List of key matches on the card..."
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
          />
        </div>

        {/* Introduction */}
        <div>
          <label className="block text-foreground mb-2">Introduction *</label>
          <textarea
            required
            value={formData.introduction}
            onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
            rows={5}
            placeholder="Event introduction and context..."
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
          />
        </div>

        {/* Match Entries */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-foreground">Match Reviews</h3>
            <button
              type="button"
              onClick={addMatch}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Match
            </button>
          </div>

          {matches.map((match, index) => (
            <div key={index} className="bg-accent/30 border border-border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-foreground font-semibold">Match {index + 1}</h4>
                {matches.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMatch(index)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-foreground mb-2">Match Title *</label>
                  <input
                    type="text"
                    required
                    value={match.title}
                    onChange={(e) => updateMatch(index, 'title', e.target.value)}
                    placeholder="e.g., Hulk Hogan vs. Andre the Giant"
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-foreground mb-2">Stipulation</label>
                  <input
                    type="text"
                    value={match.stipulation}
                    onChange={(e) => updateMatch(index, 'stipulation', e.target.value)}
                    placeholder="e.g., WWE Championship Match, Steel Cage, etc."
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-foreground mb-2">Star Rating (0-5) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="5"
                    step="0.25"
                    value={match.rating}
                    onChange={(e) => updateMatch(index, 'rating', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-foreground mb-2">Match Commentary *</label>
                <textarea
                  required
                  value={match.commentary}
                  onChange={(e) => updateMatch(index, 'commentary', e.target.value)}
                  rows={5}
                  placeholder="Your analysis and thoughts on this match..."
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div>
          <label className="block text-foreground mb-2">Conclusion *</label>
          <textarea
            required
            value={formData.conclusion}
            onChange={(e) => setFormData({ ...formData, conclusion: e.target.value })}
            rows={5}
            placeholder="Overall thoughts and wrap-up..."
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
            placeholder="WrestleMania, Classic, Pay-Per-View, etc."
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
