import { useState, useEffect } from 'react';
import { Save, X, Plus, Trash2, MoveUp, MoveDown } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { toast } from 'sonner';

interface ListEntry {
  title: string;
  image_url: string;
  content: string;
}

interface ListCommentaryFormProps {
  commentary?: any | null;
  onClose: () => void;
}

export function ListCommentaryForm({ commentary, onClose }: ListCommentaryFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    published_date: new Date().toISOString().split('T')[0],
    list_intro: '',
    list_conclusion: '',
    tags: '',
    poster_url: '',
    is_featured: false
  });

  const [listEntries, setListEntries] = useState<ListEntry[]>([
    { title: '', image_url: '', content: '' }
  ]);

  useEffect(() => {
    if (commentary) {
      setFormData({
        title: commentary.title || '',
        published_date: commentary.published_date || new Date().toISOString().split('T')[0],
        list_intro: commentary.list_intro || '',
        list_conclusion: commentary.list_conclusion || '',
        tags: commentary.tags?.join(', ') || '',
        poster_url: commentary.poster_url || '',
        is_featured: commentary.is_featured || false
      });

      if (commentary.list_entries && commentary.list_entries.length > 0) {
        setListEntries(commentary.list_entries);
      }
    }
  }, [commentary]);

  const addEntry = () => {
    setListEntries([...listEntries, { title: '', image_url: '', content: '' }]);
  };

  const removeEntry = (index: number) => {
    setListEntries(listEntries.filter((_, i) => i !== index));
  };

  const moveEntry = (index: number, direction: 'up' | 'down') => {
    const newEntries = [...listEntries];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newEntries.length) {
      [newEntries[index], newEntries[targetIndex]] = [newEntries[targetIndex], newEntries[index]];
      setListEntries(newEntries);
    }
  };

  const updateEntry = (index: number, field: keyof ListEntry, value: string) => {
    const updatedEntries = [...listEntries];
    updatedEntries[index] = { ...updatedEntries[index], [field]: value };
    setListEntries(updatedEntries);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t);

      const payload = {
        type: 'list',
        ...formData,
        list_entries: listEntries,
        tags: tagsArray
      };

      if (commentary) {
        const { error } = await supabase
          .from('commentary')
          .update(payload)
          .eq('id', commentary.id);

        if (error) throw error;
        toast.success('Article updated successfully!');
      } else {
        const { error } = await supabase
          .from('commentary')
          .insert([payload]);

        if (error) throw error;
        toast.success('Article created successfully!');
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
          {commentary ? 'Edit Article/Listicle' : 'New Article/Listicle'}
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
            <label className="block text-foreground mb-2">Article Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., 10 Best Horror Movies of All Time"
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

        {/* Introduction */}
        <div>
          <label className="block text-foreground mb-2">Introduction *</label>
          <textarea
            required
            value={formData.list_intro}
            onChange={(e) => setFormData({ ...formData, list_intro: e.target.value })}
            rows={5}
            placeholder="Set the stage for your article..."
            className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
          />
        </div>

        {/* List Entries */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-foreground">List Entries</h3>
            <button
              type="button"
              onClick={addEntry}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Entry
            </button>
          </div>

          {listEntries.map((entry, index) => (
            <div key={index} className="bg-accent/30 border border-border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-foreground font-semibold">#{index + 1}</h4>
                <div className="flex items-center gap-2">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => moveEntry(index, 'up')}
                      className="p-2 text-foreground hover:bg-accent rounded"
                      title="Move up"
                    >
                      <MoveUp className="w-4 h-4" />
                    </button>
                  )}
                  {index < listEntries.length - 1 && (
                    <button
                      type="button"
                      onClick={() => moveEntry(index, 'down')}
                      className="p-2 text-foreground hover:bg-accent rounded"
                      title="Move down"
                    >
                      <MoveDown className="w-4 h-4" />
                    </button>
                  )}
                  {listEntries.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEntry(index)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-foreground mb-2">Entry Title *</label>
                  <input
                    type="text"
                    required
                    value={entry.title}
                    onChange={(e) => updateEntry(index, 'title', e.target.value)}
                    placeholder="e.g., The Shining (1980)"
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-foreground mb-2">Image URL</label>
                  <input
                    type="url"
                    value={entry.image_url}
                    onChange={(e) => updateEntry(index, 'image_url', e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                  />
                </div>

                <div>
                  <label className="block text-foreground mb-2">Content *</label>
                  <textarea
                    required
                    value={entry.content}
                    onChange={(e) => updateEntry(index, 'content', e.target.value)}
                    rows={5}
                    placeholder="Write about this entry..."
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div>
          <label className="block text-foreground mb-2">Conclusion *</label>
          <textarea
            required
            value={formData.list_conclusion}
            onChange={(e) => setFormData({ ...formData, list_conclusion: e.target.value })}
            rows={5}
            placeholder="Wrap up your article..."
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
            placeholder="Horror, Top 10, Classic Films, etc."
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
            Feature this article on the main page
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
            {loading ? 'Saving...' : commentary ? 'Update Article' : 'Publish Article'}
          </button>
        </div>
      </form>
    </div>
  );
}
