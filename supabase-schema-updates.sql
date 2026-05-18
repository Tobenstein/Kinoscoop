-- Schema updates for Challenges and About Me features

-- Create challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  goal INTEGER NOT NULL DEFAULT 10,
  current INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  deadline TEXT,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create about_page_content table
CREATE TABLE IF NOT EXISTS about_page_content (
  id INTEGER PRIMARY KEY DEFAULT 1,
  recent_favourites JSONB,
  ten_for_all_time JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row_check CHECK (id = 1)
);

-- Create challenges_config table
CREATE TABLE IF NOT EXISTS challenges_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  current_focus JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row_config_check CHECK (id = 1)
);

-- Enable RLS on challenges table
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

-- Create policies for challenges
CREATE POLICY "Allow read access to challenges" ON challenges
  FOR SELECT USING (true);

CREATE POLICY "Allow insert access to challenges" ON challenges
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update access to challenges" ON challenges
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete access to challenges" ON challenges
  FOR DELETE USING (true);

-- Enable RLS on about_page_content table
ALTER TABLE about_page_content ENABLE ROW LEVEL SECURITY;

-- Create policies for about_page_content
CREATE POLICY "Allow read access to about_page_content" ON about_page_content
  FOR SELECT USING (true);

CREATE POLICY "Allow insert access to about_page_content" ON about_page_content
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update access to about_page_content" ON about_page_content
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete access to about_page_content" ON about_page_content
  FOR DELETE USING (true);

-- Enable RLS on challenges_config table
ALTER TABLE challenges_config ENABLE ROW LEVEL SECURITY;

-- Create policies for challenges_config
CREATE POLICY "Allow read access to challenges_config" ON challenges_config
  FOR SELECT USING (true);

CREATE POLICY "Allow insert access to challenges_config" ON challenges_config
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update access to challenges_config" ON challenges_config
  FOR UPDATE USING (true);

CREATE POLICY "Allow delete access to challenges_config" ON challenges_config
  FOR DELETE USING (true);

-- Insert default data for challenges
INSERT INTO challenges (title, description, goal, current, category, deadline, completed) VALUES
  ('Century Club', 'Watch 100 movies in 2026', 100, 67, 'Annual', 'December 31, 2026', false),
  ('Director Deep Dive: Nolan', 'Watch all Christopher Nolan films', 12, 8, 'Director', NULL, false),
  ('Criterion Collection Explorer', 'Watch 25 Criterion Collection films', 25, 12, 'Collection', NULL, false),
  ('Oscar Winners Marathon', 'Watch all Best Picture winners from the 1990s', 10, 10, 'Awards', NULL, true),
  ('Foreign Film Focus', 'Watch 30 non-English language films', 30, 18, 'International', NULL, false),
  ('Silent Cinema Appreciation', 'Watch 10 silent films', 10, 4, 'Classic', NULL, false)
ON CONFLICT (id) DO NOTHING;

-- Insert default data for about_page_content with the current movies
INSERT INTO about_page_content (id, recent_favourites, ten_for_all_time) VALUES (
  1,
  '[
    {
      "title": "A Tale of Summer",
      "poster_url": "https://image.tmdb.org/t/p/w500/gDNpFRRFoN5ZXNYpWuWe0zt3Dvh.jpg",
      "rating": 5.0,
      "year": 1996
    },
    {
      "title": "Ghost Dog: The Way of the Samurai",
      "poster_url": "https://image.tmdb.org/t/p/w500/nOMqkW1eGBj4p1gkFaJJjhh5mNR.jpg",
      "rating": 4.75,
      "year": 1999
    },
    {
      "title": "Denmark",
      "poster_url": "https://image.tmdb.org/t/p/w500/xZGUTyFh9AhxHlgDgXchBj2zlp7.jpg",
      "rating": 4.75,
      "year": 2019
    }
  ]'::jsonb,
  '[
    {
      "title": "Marius",
      "poster_url": "https://image.tmdb.org/t/p/w500/wDqYGT8A4YjJznWmNdp1u3Z7RbX.jpg",
      "rating": 5.0,
      "year": 1931
    },
    {
      "title": "It Turned Out Nice Again",
      "poster_url": "https://image.tmdb.org/t/p/w500/aUmG2nY0QCRe0NdDrz4BNxS0G1w.jpg",
      "rating": 5.0,
      "year": 1941
    },
    {
      "title": "Three Colours: White",
      "poster_url": "https://image.tmdb.org/t/p/w500/6viBH4TzCofiux76n1j1b7xjW0c.jpg",
      "rating": 5.0,
      "year": 1994
    },
    {
      "title": "The NeverEnding Story",
      "poster_url": "https://image.tmdb.org/t/p/w500/6O3l0mOwXKj6r9VWaTXkNgCxgBl.jpg",
      "rating": 5.0,
      "year": 1984
    },
    {
      "title": "The Mothman Prophecies",
      "poster_url": "https://image.tmdb.org/t/p/w500/jvtKY7pWcVo4GWbgCZ6F7RXZQqH.jpg",
      "rating": 5.0,
      "year": 2002
    },
    {
      "title": "Interstellar",
      "poster_url": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      "rating": 5.0,
      "year": 2014
    },
    {
      "title": "The Good, the Bad and the Ugly",
      "poster_url": "https://image.tmdb.org/t/p/w500/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg",
      "rating": 5.0,
      "year": 1966
    },
    {
      "title": "The 10th Kingdom",
      "poster_url": "https://image.tmdb.org/t/p/w500/cCb8AF7FPSJiZ9PAgOaGLBsyPRM.jpg",
      "rating": 5.0,
      "year": 2000
    },
    {
      "title": "Willy Wonka & the Chocolate Factory",
      "poster_url": "https://image.tmdb.org/t/p/w500/vzVic5LiqcDYRsLmk01J0wd8wF5.jpg",
      "rating": 5.0,
      "year": 1971
    }
  ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  recent_favourites = EXCLUDED.recent_favourites,
  ten_for_all_time = EXCLUDED.ten_for_all_time,
  updated_at = NOW();

-- Insert default data for challenges_config
INSERT INTO challenges_config (id, current_focus) VALUES (
  1,
  '{
    "title": "Christopher Nolan Films",
    "description": "Exploring the complete filmography of one of cinema''s most innovative directors",
    "movies": [
      {"title": "Tenet", "progress": 35},
      {"title": "The Dark Knight Rises", "progress": 0},
      {"title": "Dunkirk", "progress": 100},
      {"title": "Memento", "progress": 100}
    ]
  }'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  current_focus = EXCLUDED.current_focus,
  updated_at = NOW();
