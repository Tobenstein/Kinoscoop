import { useState, useEffect } from 'react';
import { Save, Plus, X } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { toast } from 'sonner';

interface Movie {
  title: string;
  director: string;
  poster_url: string;
  year?: number;
}

export function HomePageManager() {
  const [loading, setLoading] = useState(false);
  const [heroHeader, setHeroHeader] = useState('Welcome to My Cinema Journey');
  const [heroSubheader, setHeroSubheader] = useState('Exploring worlds one film at a time');
  const [introText, setIntroText] = useState('');
  const [closingText, setClosingText] = useState('');

  const [currentlyWatching, setCurrentlyWatching] = useState<Movie & { progress: number; runtime?: number }>({
    title: '',
    director: '',
    poster_url: '',
    progress: 0,
    year: new Date().getFullYear(),
    runtime: 120
  });

  const [movieOfMonth, setMovieOfMonth] = useState<Movie & { synopsis: string }>({
    title: '',
    director: '',
    poster_url: '',
    synopsis: '',
    year: new Date().getFullYear()
  });

  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const [socialHandles, setSocialHandles] = useState({
    instagram: '',
    facebook: '',
    youtube: '',
    tiktok: '',
    bluesky: '',
    letterboxd: '',
    imdb: ''
  });

  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const fetchContent = async () => {
      const { data, error } = await supabase
        .from('home_page_content')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching content:', error);
        return;
      }

      if (data) {
        setHeroHeader(data.hero_header || '');
        setHeroSubheader(data.hero_subheader || '');
        setIntroText(data.hero_intro_paragraph || '');
        setClosingText(data.hero_closing_paragraph || '');

        if (data.currently_watching) {
          setCurrentlyWatching(data.currently_watching);
        }

        if (data.movie_of_month) {
          setMovieOfMonth(data.movie_of_month);
        }

        if (data.watchlist) {
          setWatchlist(data.watchlist);
        }

        setSocialHandles({
          instagram: data.instagram_handle || '',
          facebook: data.facebook_handle || '',
          youtube: data.youtube_handle || '',
          tiktok: data.tiktok_handle || '',
          bluesky: data.bluesky_handle || '',
          letterboxd: data.letterboxd_handle || '',
          imdb: data.imdb_handle || ''
        });
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
        .from('home_page_content')
        .upsert({
          id: 1,
          hero_header: heroHeader,
          hero_subheader: heroSubheader,
          hero_intro_paragraph: introText,
          hero_closing_paragraph: closingText,
          currently_watching: currentlyWatching,
          movie_of_month: movieOfMonth,
          watchlist: watchlist,
          instagram_handle: socialHandles.instagram,
          facebook_handle: socialHandles.facebook,
          youtube_handle: socialHandles.youtube,
          tiktok_handle: socialHandles.tiktok,
          bluesky_handle: socialHandles.bluesky,
          letterboxd_handle: socialHandles.letterboxd,
          imdb_handle: socialHandles.imdb,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast.success('Home page content saved successfully!');
    } catch (error: any) {
      toast.error(`Error saving: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addToWatchlist = () => {
    setWatchlist([...watchlist, { title: '', director: '', poster_url: '', year: new Date().getFullYear() }]);
  };

  const removeFromWatchlist = (index: number) => {
    setWatchlist(watchlist.filter((_, i) => i !== index));
  };

  const updateWatchlistItem = (index: number, field: keyof Movie, value: string | number) => {
    const updated = [...watchlist];
    updated[index] = { ...updated[index], [field]: value };
    setWatchlist(updated);
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
      {/* Hero Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl text-foreground mb-4">Hero Section</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-foreground mb-2">Header</label>
            <input
              type="text"
              value={heroHeader}
              onChange={(e) => setHeroHeader(e.target.value)}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Subheader</label>
            <input
              type="text"
              value={heroSubheader}
              onChange={(e) => setHeroSubheader(e.target.value)}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Introduction Paragraph</label>
            <textarea
              value={introText}
              onChange={(e) => setIntroText(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Closing Paragraph</label>
            <textarea
              value={closingText}
              onChange={(e) => setClosingText(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Currently Watching */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl text-foreground mb-4">Currently Watching</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-foreground mb-2">Movie Title</label>
            <input
              type="text"
              value={currentlyWatching.title}
              onChange={(e) => setCurrentlyWatching({ ...currentlyWatching, title: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Director</label>
            <input
              type="text"
              value={currentlyWatching.director}
              onChange={(e) => setCurrentlyWatching({ ...currentlyWatching, director: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Poster URL (TMDB)</label>
            <input
              type="text"
              value={currentlyWatching.poster_url}
              onChange={(e) => setCurrentlyWatching({ ...currentlyWatching, poster_url: e.target.value })}
              placeholder="https://image.tmdb.org/t/p/w500/..."
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Progress (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={currentlyWatching.progress}
              onChange={(e) => setCurrentlyWatching({ ...currentlyWatching, progress: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Year</label>
            <input
              type="number"
              value={currentlyWatching.year}
              onChange={(e) => setCurrentlyWatching({ ...currentlyWatching, year: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Runtime (minutes)</label>
            <input
              type="number"
              value={currentlyWatching.runtime}
              onChange={(e) => setCurrentlyWatching({ ...currentlyWatching, runtime: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Movie of the Month */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl text-foreground mb-4">Movie of the Month</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-foreground mb-2">Movie Title</label>
            <input
              type="text"
              value={movieOfMonth.title}
              onChange={(e) => setMovieOfMonth({ ...movieOfMonth, title: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Director</label>
            <input
              type="text"
              value={movieOfMonth.director}
              onChange={(e) => setMovieOfMonth({ ...movieOfMonth, director: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Poster URL (TMDB)</label>
            <input
              type="text"
              value={movieOfMonth.poster_url}
              onChange={(e) => setMovieOfMonth({ ...movieOfMonth, poster_url: e.target.value })}
              placeholder="https://image.tmdb.org/t/p/w500/..."
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Year</label>
            <input
              type="number"
              value={movieOfMonth.year}
              onChange={(e) => setMovieOfMonth({ ...movieOfMonth, year: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-foreground mb-2">Synopsis</label>
            <textarea
              value={movieOfMonth.synopsis}
              onChange={(e) => setMovieOfMonth({ ...movieOfMonth, synopsis: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Watchlist */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl text-foreground">Watchlist</h2>
          <button
            onClick={addToWatchlist}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
            Add Movie
          </button>
        </div>

        <div className="space-y-4">
          {watchlist.map((movie, index) => (
            <div key={index} className="bg-muted rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={movie.title}
                    onChange={(e) => updateWatchlistItem(index, 'title', e.target.value)}
                    placeholder="Movie Title"
                    className="px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                  />
                  <input
                    type="text"
                    value={movie.director}
                    onChange={(e) => updateWatchlistItem(index, 'director', e.target.value)}
                    placeholder="Director"
                    className="px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                  />
                  <input
                    type="text"
                    value={movie.poster_url}
                    onChange={(e) => updateWatchlistItem(index, 'poster_url', e.target.value)}
                    placeholder="Poster URL"
                    className="px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
                  />
                </div>
                <button
                  onClick={() => removeFromWatchlist(index)}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Handles */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl text-foreground mb-4">Social Media Handles</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-foreground mb-2">Instagram</label>
            <input
              type="text"
              value={socialHandles.instagram}
              onChange={(e) => setSocialHandles({ ...socialHandles, instagram: e.target.value })}
              placeholder="username"
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Facebook</label>
            <input
              type="text"
              value={socialHandles.facebook}
              onChange={(e) => setSocialHandles({ ...socialHandles, facebook: e.target.value })}
              placeholder="username"
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">YouTube</label>
            <input
              type="text"
              value={socialHandles.youtube}
              onChange={(e) => setSocialHandles({ ...socialHandles, youtube: e.target.value })}
              placeholder="@username"
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">TikTok</label>
            <input
              type="text"
              value={socialHandles.tiktok}
              onChange={(e) => setSocialHandles({ ...socialHandles, tiktok: e.target.value })}
              placeholder="@username"
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">BlueSky</label>
            <input
              type="text"
              value={socialHandles.bluesky}
              onChange={(e) => setSocialHandles({ ...socialHandles, bluesky: e.target.value })}
              placeholder="username.bsky.social"
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">Letterboxd</label>
            <input
              type="text"
              value={socialHandles.letterboxd}
              onChange={(e) => setSocialHandles({ ...socialHandles, letterboxd: e.target.value })}
              placeholder="username"
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>

          <div>
            <label className="block text-foreground mb-2">IMDb</label>
            <input
              type="text"
              value={socialHandles.imdb}
              onChange={(e) => setSocialHandles({ ...socialHandles, imdb: e.target.value })}
              placeholder="username"
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg text-foreground"
            />
          </div>
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
