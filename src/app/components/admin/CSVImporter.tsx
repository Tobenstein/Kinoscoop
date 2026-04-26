import { useState } from 'react';
import { Upload, Download, Trash2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { toast } from 'sonner';

// TMDB API key - replace with your own or use environment variable
const TMDB_API_KEY = ''; // Add your TMDB API key here

export function CSVImporter() {
  const [importing, setImporting] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);
  const [deleting, setDeleting] = useState(false);

  const fetchPosterFromTMDB = async (title: string, year: number): Promise<string> => {
    if (!TMDB_API_KEY) return '';

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&year=${year}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const posterPath = data.results[0].poster_path;
        return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : '';
      }
    } catch (error) {
      console.error('Error fetching poster:', error);
    }

    return '';
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csv = event.target?.result as string;
      const lines = csv.split('\n');
      const headers = lines[0].split(',').map(h => h.trim());

      const data = lines.slice(1, 6).map(line => {
        const values = line.split(',');
        const obj: any = {};
        headers.forEach((header, i) => {
          obj[header] = values[i]?.trim();
        });
        return obj;
      });

      setPreview(data);
    };
    reader.readAsText(file);
  };

  const importCSV = async () => {
    if (!isSupabaseConfigured()) {
      toast.error('Supabase not configured');
      return;
    }

    setImporting(true);

    try {
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = fileInput?.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (event) => {
        const csv = event.target?.result as string;
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

        // Get existing movies to check for duplicates
        const { data: existingMovies } = await supabase
          .from('movies')
          .select('title, year, date_watched');

        const existingSet = new Set(
          existingMovies?.map(m => `${m.title.toLowerCase()}_${m.year}_${m.date_watched}`) || []
        );

        const moviesToImport = [];
        let skippedCount = 0;
        let postersFetched = 0;

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          // Parse CSV line handling quoted values
          const values: string[] = [];
          let current = '';
          let inQuotes = false;

          for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              values.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          values.push(current.trim());

          const obj: any = {};
          headers.forEach((header, idx) => {
            obj[header] = values[idx]?.replace(/"/g, '') || '';
          });

          // Map Letterboxd fields
          const title = obj['Name'] || obj['Title'] || '';
          const year = parseInt(obj['Year']) || new Date().getFullYear();
          const dateWatched = obj['Watched Date'] || obj['Date'] || new Date().toISOString().split('T')[0];

          // Check for duplicates
          const duplicateKey = `${title.toLowerCase()}_${year}_${dateWatched}`;
          if (existingSet.has(duplicateKey)) {
            skippedCount++;
            continue;
          }

          // Parse rating (Letterboxd uses 0-5 scale, sometimes with stars)
          let rating = 0;
          const ratingStr = obj['Rating'] || obj['Letterboxd Rating'] || '';
          if (ratingStr) {
            // Remove any star symbols and parse
            const numericRating = parseFloat(ratingStr.replace(/★/g, '').trim());
            rating = isNaN(numericRating) ? 0 : numericRating;
          }

          // Fetch poster if TMDB key is available and no poster URL provided
          let posterUrl = obj['Poster'] || '';
          if (!posterUrl && title && year && TMDB_API_KEY) {
            posterUrl = await fetchPosterFromTMDB(title, year);
            if (posterUrl) postersFetched++;
          }

          const movie = {
            title,
            director: obj['Directors'] || obj['Director'] || '',
            year,
            rating,
            date_watched: dateWatched,
            runtime: parseInt(obj['Runtime (mins)'] || obj['Runtime']) || null,
            genre: obj['Genres'] || obj['Genre'] || '',
            poster_url: posterUrl,
            review: obj['Review'] || obj['Notes'] || ''
          };

          moviesToImport.push(movie);
          existingSet.add(duplicateKey); // Prevent duplicates within the same import
        }

        if (moviesToImport.length === 0) {
          toast.info(`All ${skippedCount} movies already exist in database`);
          setPreview([]);
          setImporting(false);
          return;
        }

        const { error } = await supabase
          .from('movies')
          .insert(moviesToImport);

        if (error) throw error;

        const message = `Successfully imported ${moviesToImport.length} movies!${skippedCount > 0 ? ` (Skipped ${skippedCount} duplicates)` : ''}${postersFetched > 0 ? ` (Fetched ${postersFetched} posters)` : ''}`;
        toast.success(message);
        setPreview([]);
      };
      reader.readAsText(file);
    } catch (error: any) {
      toast.error(`Import failed: ${error.message}`);
    } finally {
      setImporting(false);
    }
  };

  const deleteAllMovies = async () => {
    if (!confirm('Are you absolutely sure you want to delete ALL logged movies? This cannot be undone!')) {
      return;
    }

    if (!confirm('Seriously? This will permanently delete everything. Type DELETE in the next prompt to confirm.')) {
      return;
    }

    const userInput = prompt('Type DELETE to confirm deletion of all movies:');
    if (userInput !== 'DELETE') {
      toast.info('Deletion cancelled');
      return;
    }

    setDeleting(true);

    try {
      const { error } = await supabase
        .from('movies')
        .delete()
        .neq('id', 0); // Delete all rows

      if (error) throw error;

      toast.success('All movies have been deleted');
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setDeleting(false);
    }
  };

  const downloadTemplate = () => {
    const csv = `Name,Director,Year,Rating,Watched Date,Runtime,Genre,Poster,Review
The Dark Knight,Christopher Nolan,2008,4.5,2024-01-15,152,Action,https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg,Amazing film
Parasite,Bong Joon-ho,2019,5.0,2024-01-20,132,Thriller,https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg,Masterpiece`;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kinoscoop-template.csv';
    a.click();
  };

  if (!isSupabaseConfigured()) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <p className="text-muted-foreground">
          Supabase is not configured. Please set up your database to import movies.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-foreground">Import from CSV</h2>

      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-foreground mb-4">Upload CSV File</h3>
        <p className="text-muted-foreground mb-4">
          Import movies from a CSV file. Supports Letterboxd export format or custom format.
        </p>

        <div className="flex gap-4 mb-6">
          <label className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg cursor-pointer hover:bg-primary/90">
            <Upload className="w-4 h-4" />
            <span>Choose CSV File</span>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <button
            onClick={downloadTemplate}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-accent"
          >
            <Download className="w-4 h-4" />
            Download Template
          </button>
        </div>

        {preview.length > 0 && (
          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <h4 className="text-foreground mb-2">Preview (first 5 rows)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-2 text-foreground">Title</th>
                      <th className="text-left py-2 px-2 text-foreground">Director</th>
                      <th className="text-left py-2 px-2 text-foreground">Year</th>
                      <th className="text-left py-2 px-2 text-foreground">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((row, i) => (
                      <tr key={i} className="border-b border-border">
                        <td className="py-2 px-2 text-muted-foreground">{row.Name || row.Title}</td>
                        <td className="py-2 px-2 text-muted-foreground">{row.Director}</td>
                        <td className="py-2 px-2 text-muted-foreground">{row.Year}</td>
                        <td className="py-2 px-2 text-muted-foreground">{row.Rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <button
              onClick={importCSV}
              disabled={importing}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {importing ? 'Importing...' : 'Import All Rows'}
            </button>
          </div>
        )}
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-foreground mb-3">CSV Format</h3>
        <p className="text-muted-foreground mb-3">Supports Letterboxd exports (watched or diary) and custom format:</p>
        <div className="bg-muted rounded-lg p-4">
          <code className="text-foreground text-sm">
            Name, Directors, Year, Rating, Watched Date, Runtime (mins), Genres, Review
          </code>
        </div>
        <p className="text-muted-foreground mt-3 text-sm">
          <strong>Note:</strong> Import automatically skips duplicates and can fetch movie posters from TMDB if API key is configured.
        </p>
      </div>

      {/* Danger Zone */}
      <div className="bg-destructive/10 border border-destructive rounded-lg p-6">
        <h3 className="text-destructive mb-3 font-semibold">Danger Zone</h3>
        <p className="text-muted-foreground mb-4">
          Permanently delete all logged movies from the database. This action cannot be undone.
        </p>
        <button
          onClick={deleteAllMovies}
          disabled={deleting}
          className="flex items-center gap-2 px-6 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          {deleting ? 'Deleting...' : 'Delete All Movies'}
        </button>
      </div>
    </div>
  );
}
