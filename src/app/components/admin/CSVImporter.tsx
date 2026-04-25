import { useState } from 'react';
import { Upload, Download } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import { toast } from 'sonner';

export function CSVImporter() {
  const [importing, setImporting] = useState(false);
  const [preview, setPreview] = useState<any[]>([]);

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
        const headers = lines[0].split(',').map(h => h.trim());

        const movies = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = line.split(',');
            const obj: any = {};
            headers.forEach((header, i) => {
              obj[header] = values[i]?.trim();
            });
            return obj;
          })
          .map(row => ({
            title: row['Name'] || row['Title'],
            director: row['Director'] || '',
            year: parseInt(row['Year']) || new Date().getFullYear(),
            rating: parseFloat(row['Rating']) || 0,
            date_watched: row['Watched Date'] || row['Date'] || new Date().toISOString().split('T')[0],
            runtime: parseInt(row['Runtime']) || null,
            genre: row['Genre'] || row['Genres'] || '',
            poster_url: row['Poster'] || '',
            review: row['Review'] || ''
          }));

        const { error } = await supabase
          .from('movies')
          .insert(movies);

        if (error) throw error;

        toast.success(`Successfully imported ${movies.length} movies!`);
        setPreview([]);
      };
      reader.readAsText(file);
    } catch (error: any) {
      toast.error(`Import failed: ${error.message}`);
    } finally {
      setImporting(false);
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
        <p className="text-muted-foreground mb-3">Your CSV should include these columns:</p>
        <div className="bg-muted rounded-lg p-4">
          <code className="text-foreground text-sm">
            Name, Director, Year, Rating, Watched Date, Runtime, Genre, Poster, Review
          </code>
        </div>
        <p className="text-muted-foreground mt-3 text-sm">
          Note: Also compatible with Letterboxd export format
        </p>
      </div>
    </div>
  );
}
