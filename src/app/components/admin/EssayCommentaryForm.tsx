import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { toast } from 'sonner';

interface EssayCommentaryFormProps {
  commentary?: any | null;
  onClose: () => void;
}

export function EssayCommentaryForm({ commentary, onClose }: EssayCommentaryFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    published_date: new Date().toISOString().split('T')[0],
    essay_body: '',
    citations: '',
    tags: '',
    poster_url: '',
    is_featured: false
  });

  useEffect(() => {
    if (commentary) {
      setFormData({
        title: commentary.title || '',
        subtitle: commentary.subtitle || '',
        published_date: commentary.published_date || new Date().toISOString().split('T')[0],
        essay_body: commentary.essay_body || '',
        citations: commentary.citations || '',
        tags: commentary.tags?.join(', ') || '',
        poster_url: commentary.poster_url || '',
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
        type: 'essay',
        ...formData,
        tags: tagsArray
      };

      if (commentary) {
        const { error } = await supabase
          .from('commentary')
          .update(payload)
          .eq('id', commentary.id);

        if (error) throw error;
        toast.success('Essay updated successfully!');
      } else {
        const { error } = await supabase
          .from('commentary')
          .insert([payload]);

        if (error) throw error;
        toast.success('Essay created successfully!');
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
          {commentary ? 'Edit Essay' : 'New Essay'}
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
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-foreground mb-2">Essay Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Subtitle</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="block text-foreground mb-2">Header Image URL (optional)</label>
              <input
                type="url"
                value={formData.poster_url}
                onChange={(e) => setFormData({ ...formData, poster_url: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
              />
            </div>
          </div>
        </div>

        {/* Essay Body */}
        <div>
          <label className="block text-foreground mb-2">Essay Body *</label>
          <textarea
            required
            value={formData.essay_body}
            onChange={(e) => setFormData({ ...formData, essay_body: e.target.value })}
            rows={20}
            placeholder="Your essay content..."
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Tip: Use double line breaks to separate paragraphs
          </p>
        </div>

        {/* Citations */}
        <div>
          <label className="block text-foreground mb-2">Citations (optional)</label>
          <textarea
            value={formData.citations}
            onChange={(e) => setFormData({ ...formData, citations: e.target.value })}
            rows={5}
            placeholder="List your sources and citations here..."
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
            placeholder="Film Analysis, Philosophy, Culture, etc."
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
            Feature this essay on the main page
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
            {loading ? 'Saving...' : commentary ? 'Update Essay' : 'Publish Essay'}
          </button>
        </div>
      </form>
    </div>
  );
}
