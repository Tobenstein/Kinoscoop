import { useState, useEffect } from 'react';
import { Save, Plus, X } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { toast } from 'sonner';

interface Movie {
  title: string;
  director?: string;
  poster_url: string;
  year?: number;
  rating?: number;
}

export function AboutMeManager() {
  const [loading, setLoading] = useState(false);
  const [recentFavourites, setRecentFavourites] = useState<Movie[]>([]);
  const [tenForAllTime, setTenForAllTime] = useState<Movie[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('about_page_content')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching content:', error);
        return;
      }

      if (data) {
        if (data.recent_favourites) {
          setRecentFavourites(data.recent_favourites);
        }

        if (data.ten_for_all_time) {
          setTenForAllTime(data.ten_for_all_time);
        }
      }
    };

    fetchContent();
  }, []);

  const handleSave = async () => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase is not configured');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('about_page_content')
        .upsert({
          id: 1,
          recent_favourites: recentFavourites,
          ten_for_all_time: tenForAllTime,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast.success('About Me content saved successfully!');
    } catch (error: any) {
      toast.error(`Error saving: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addToRecentFavourites = () => {
    if (recentFavourites.length < 3) {
      setRecentFavourites([
        ...recentFavourites,
        { title: '', poster_url: '', year: new Date().getFullYear(), rating: 5.0 }
      ]);
    }
  };

  const removeFromRecentFavourites = (index: number) => {
    setRecentFavourites(recentFavourites.filter((_, i) => i !== index));
  };

  const updateRecentFavouritesItem = (index: number, field: keyof Movie, value: string | number) => {
    const updated = [...recentFavourites];
    updated[index] = { ...updated[index], [field]: value };
    setRecentFavourites(updated);
  };

  const addToTenForAllTime = () => {
    if (tenForAllTime.length < 10) {
      setTenForAllTime([
        ...tenForAllTime,
        { title: '', poster_url: '', year: new Date().getFullYear(), rating: 5.0 }
      ]);
    }
  };

  const removeFromTenForAllTime = (index: number) => {
    setTenForAllTime(tenForAllTime.filter((_, i) => i !== index));
  };

  const updateTenForAllTimeItem = (index: number, field: keyof Movie, value: string | number) => {
    const updated = [...tenForAllTime];
    updated[index] = { ...updated[index], [field]: value };
    setTenForAllTime(updated);
  };

  if (!isSupabaseConfigured()) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <p className="text-muted-foreground">
          Supabase is not configured. Please set up your database to use the admin panel.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-foreground mb-4">About Me Page Content</h2>

      {/* Recent Favourites */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl text-foreground">Recent Favourites (Max 3)</h3>
          <button
            onClick={addToRecentFavourites}
            disabled={recentFavourites.length >= 3}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            Add Movie
          </button>
        </div>

        <div className="space-y-4">
          {recentFavourites.map((movie, index) => (
            <div key={index} className="bg-muted rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    value={movie.title}
                    onChange={(e) => updateRecentFavouritesItem(index, 'title', e.target.value)}
                    placeholder="Movie Title"
                    className="px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                  />
                  <input
                    type="text"
                    value={movie.poster_url}
                    onChange={(e) => updateRecentFavouritesItem(index, 'poster_url', e.target.value)}
                    placeholder="Poster URL (TMDB)"
                    className="px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                  />
                  <input
                    type="number"
                    value={movie.year || ''}
                    onChange={(e) => updateRecentFavouritesItem(index, 'year', parseInt(e.target.value) || new Date().getFullYear())}
                    placeholder="Year"
                    className="px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                  />
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    max="5"
                    value={movie.rating || ''}
                    onChange={(e) => updateRecentFavouritesItem(index, 'rating', parseFloat(e.target.value) || 0)}
                    placeholder="Rating (0-5)"
                    className="px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                  />
                </div>
                <button
                  onClick={() => removeFromRecentFavourites(index)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {recentFavourites.length === 0 && (
            <p className="text-muted-foreground text-center py-8">
              No recent favourites added yet. Click "Add Movie" to get started.
            </p>
          )}
        </div>
      </div>

      {/* 10 for All Time */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl text-foreground">10 for All Time (Max 10)</h3>
          <button
            onClick={addToTenForAllTime}
            disabled={tenForAllTime.length >= 10}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            Add Movie
          </button>
        </div>

        <div className="space-y-4">
          {tenForAllTime.map((movie, index) => (
            <div key={index} className="bg-muted rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input
                    type="text"
                    value={movie.title}
                    onChange={(e) => updateTenForAllTimeItem(index, 'title', e.target.value)}
                    placeholder="Movie Title"
                    className="px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                  />
                  <input
                    type="text"
                    value={movie.poster_url}
                    onChange={(e) => updateTenForAllTimeItem(index, 'poster_url', e.target.value)}
                    placeholder="Poster URL (TMDB)"
                    className="px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                  />
                  <input
                    type="number"
                    value={movie.year || ''}
                    onChange={(e) => updateTenForAllTimeItem(index, 'year', parseInt(e.target.value) || new Date().getFullYear())}
                    placeholder="Year"
                    className="px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                  />
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    max="5"
                    value={movie.rating || ''}
                    onChange={(e) => updateTenForAllTimeItem(index, 'rating', parseFloat(e.target.value) || 0)}
                    placeholder="Rating (0-5)"
                    className="px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                  />
                </div>
                <button
                  onClick={() => removeFromTenForAllTime(index)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {tenForAllTime.length === 0 && (
            <p className="text-muted-foreground text-center py-8">
              No movies added yet. Click "Add Movie" to get started.
            </p>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
