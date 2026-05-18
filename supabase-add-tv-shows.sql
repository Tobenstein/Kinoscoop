-- Add tv_shows table for TV show logging feature

-- Create tv_shows table
CREATE TABLE IF NOT EXISTS tv_shows (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  creator TEXT NOT NULL,
  year INTEGER NOT NULL,
  rating NUMERIC(3,2) NOT NULL CHECK (rating >= 0 AND rating <= 5),
  date_watched DATE NOT NULL,
  episodes INTEGER,
  avg_runtime INTEGER,
  genre TEXT,
  poster_url TEXT,
  review TEXT,
  viewing_medium TEXT,
  streaming_service TEXT,
  imdb_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on tv_shows table
ALTER TABLE tv_shows ENABLE ROW LEVEL SECURITY;

-- Create policies for tv_shows (with DROP IF EXISTS to avoid conflicts)
DROP POLICY IF EXISTS "Allow read access to tv_shows" ON tv_shows;
CREATE POLICY "Allow read access to tv_shows" ON tv_shows
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert access to tv_shows" ON tv_shows;
CREATE POLICY "Allow insert access to tv_shows" ON tv_shows
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update access to tv_shows" ON tv_shows;
CREATE POLICY "Allow update access to tv_shows" ON tv_shows
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow delete access to tv_shows" ON tv_shows;
CREATE POLICY "Allow delete access to tv_shows" ON tv_shows
  FOR DELETE USING (true);

-- Insert example data for tv_shows
INSERT INTO tv_shows (title, creator, year, rating, date_watched, episodes, avg_runtime, genre, review) VALUES
  ('The Office (US)', 'Greg Daniels', 2005, 4.75, '2026-01-15', 201, 22, 'Comedy, Sitcom', 'One of the greatest sitcoms of all time. The mockumentary format never gets old.'),
  ('Derry Girls', 'Lisa McGee', 2018, 4.5, '2026-02-20', 19, 24, 'Comedy, Coming-of-age', 'Hilarious and heartfelt. Captures the spirit of the 90s in Northern Ireland perfectly.')
ON CONFLICT DO NOTHING;
