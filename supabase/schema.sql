-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS identities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sinner_id VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  grade VARCHAR(10) NOT NULL,
  affiliation VARCHAR(100),
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS egos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  grade VARCHAR(20) NOT NULL,
  skill_description TEXT,
  passive_usage TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tierdecks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  tier VARCHAR(10) NOT NULL,
  version VARCHAR(10) NOT NULL,
  deck_composition TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: identity_selections (인격선택)
-- 수감자, 인격이름, 인격초상화(URL), 등급(2 또는 3)
CREATE TABLE IF NOT EXISTS identity_selections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prisoner VARCHAR(100) NOT NULL,
  identity_name VARCHAR(255) NOT NULL,
  portrait_url TEXT,
  grade SMALLINT NOT NULL CHECK (grade IN (2, 3)),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_identities_sinner_id ON identities(sinner_id);
CREATE INDEX IF NOT EXISTS idx_identities_grade ON identities(grade);
CREATE INDEX IF NOT EXISTS idx_identities_affiliation ON identities(affiliation);
CREATE INDEX IF NOT EXISTS idx_egos_grade ON egos(grade);
CREATE INDEX IF NOT EXISTS idx_tierdecks_tier ON tierdecks(tier);
CREATE INDEX IF NOT EXISTS idx_tierdecks_version ON tierdecks(version);
CREATE INDEX IF NOT EXISTS idx_identity_selections_prisoner ON identity_selections(prisoner);
CREATE INDEX IF NOT EXISTS idx_identity_selections_grade ON identity_selections(grade);

-- Enable Row Level Security
ALTER TABLE identities ENABLE ROW LEVEL SECURITY;
ALTER TABLE egos ENABLE ROW LEVEL SECURITY;
ALTER TABLE tierdecks ENABLE ROW LEVEL SECURITY;
ALTER TABLE identity_selections ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Read access for everyone, write access only for admin
-- Identities
CREATE POLICY "Allow public read access to identities" ON identities
  FOR SELECT USING (true);

CREATE POLICY "Allow admin write access to identities" ON identities
  FOR ALL USING (auth.role() = 'service_role');

-- EGOs
CREATE POLICY "Allow public read access to egos" ON egos
  FOR SELECT USING (true);

CREATE POLICY "Allow admin write access to egos" ON egos
  FOR ALL USING (auth.role() = 'service_role');

-- Tierdecks
CREATE POLICY "Allow public read access to tierdecks" ON tierdecks
  FOR SELECT USING (true);

CREATE POLICY "Allow admin write access to tierdecks" ON tierdecks
  FOR ALL USING (auth.role() = 'service_role');

-- Identity Selections
CREATE POLICY "Allow public read access to identity_selections" ON identity_selections
  FOR SELECT USING (true);

CREATE POLICY "Allow admin write access to identity_selections" ON identity_selections
  FOR ALL USING (auth.role() = 'service_role');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_identities_updated_at BEFORE UPDATE ON identities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_egos_updated_at BEFORE UPDATE ON egos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tierdecks_updated_at BEFORE UPDATE ON tierdecks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_identity_selections_updated_at BEFORE UPDATE ON identity_selections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

