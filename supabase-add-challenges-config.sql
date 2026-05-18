-- Add challenges_config table for Current Focus feature

-- Create challenges_config table
CREATE TABLE IF NOT EXISTS challenges_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  current_focus JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row_config_check CHECK (id = 1)
);

-- Enable RLS on challenges_config table
ALTER TABLE challenges_config ENABLE ROW LEVEL SECURITY;

-- Create policies for challenges_config (with DROP IF EXISTS to avoid conflicts)
DROP POLICY IF EXISTS "Allow read access to challenges_config" ON challenges_config;
CREATE POLICY "Allow read access to challenges_config" ON challenges_config
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert access to challenges_config" ON challenges_config;
CREATE POLICY "Allow insert access to challenges_config" ON challenges_config
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow update access to challenges_config" ON challenges_config;
CREATE POLICY "Allow update access to challenges_config" ON challenges_config
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow delete access to challenges_config" ON challenges_config;
CREATE POLICY "Allow delete access to challenges_config" ON challenges_config
  FOR DELETE USING (true);

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
