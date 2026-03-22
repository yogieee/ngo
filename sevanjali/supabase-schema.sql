-- Sevanjali Admin Panel — Supabase Database Schema
-- Run this in Supabase SQL Editor to set up your tables

-- ============================================
-- Table: members (volunteers, donors, trustees)
-- ============================================
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'volunteer',
  notes TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Table: activities
-- ============================================
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL DEFAULT 'healthcare',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  detail_description TEXT,
  icon_name TEXT DEFAULT 'Heart',
  image_url TEXT,
  stats JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Table: events
-- ============================================
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  event_date DATE,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Healthcare',
  image_url TEXT,
  is_upcoming BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Public read access for active activities
CREATE POLICY "Public can view active activities"
  ON activities FOR SELECT
  USING (is_active = true);

-- Public read access for upcoming events
CREATE POLICY "Public can view upcoming events"
  ON events FOR SELECT
  USING (true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Admin full access to activities"
  ON activities FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access to events"
  ON events FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admin full access to members"
  ON members FOR ALL
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================
-- Seed Data: Existing Activities
-- ============================================
INSERT INTO activities (slug, type, title, description, detail_description, icon_name, stats, sort_order) VALUES
(
  'free-medical-camps',
  'healthcare',
  'Free Medical Camps',
  'Quality healthcare twice monthly for underprivileged families in Farangipete.',
  'Twice every month, Sevanjali organises free medical camps in Farangipete, providing quality healthcare to families who cannot afford regular medical consultations. Our camps include general check-ups, specialist consultations, and distribution of free medicines.',
  'Heart',
  '[{"label": "Camps Held", "value": "344+"}, {"label": "Frequency", "value": "Bi-monthly"}, {"label": "Patients Served", "value": "10,000+"}]'::jsonb,
  1
),
(
  'educational-scholarships',
  'education',
  'Educational Scholarships',
  'Merit and need-based support for engineering and higher education students.',
  'We provide merit-based and need-based scholarships to deserving students from economically weaker sections. Our scholarship programme has helped dozens of students pursue engineering, medical, and other higher education courses they otherwise could not afford.',
  'GraduationCap',
  '[{"label": "Students Supported", "value": "100+"}, {"label": "Fields Covered", "value": "Engineering, Medical & more"}, {"label": "Success Rate", "value": "95%"}]'::jsonb,
  2
),
(
  'blood-donation-camps',
  'healthcare',
  'Blood Donation Camps',
  'Regular drives replenishing blood banks across Dakshina Kannada.',
  'Regular blood donation camps are organised in collaboration with local hospitals and blood banks. These drives help maintain critical blood supplies across Dakshina Kannada district, saving countless lives in emergency situations.',
  'Droplets',
  '[{"label": "Drives Organised", "value": "50+"}, {"label": "Units Collected", "value": "5,000+"}, {"label": "Partner Hospitals", "value": "Multiple"}]'::jsonb,
  3
),
(
  'patient-assistance',
  'healthcare',
  'Patient Assistance',
  'Financial and emotional support for hospitalised patients who cannot afford care.',
  'For patients who are hospitalised and cannot afford treatment, Sevanjali steps in with financial and emotional support. We work with hospitals to negotiate costs and provide direct financial assistance to ensure no one is denied care due to poverty.',
  'HandHeart',
  '[{"label": "Patients Helped", "value": "500+"}, {"label": "Support Type", "value": "Financial & Emotional"}, {"label": "Response Time", "value": "Immediate"}]'::jsonb,
  4
),
(
  'free-health-cards',
  'healthcare',
  'Free Health Cards',
  'Green Cards giving underprivileged families access at partner hospitals.',
  'The Green Card programme provides underprivileged families with health cards that grant them access to subsidised or free treatment at partner hospitals. This ensures continuous healthcare access beyond our bi-monthly camp schedule.',
  'CreditCard',
  '[{"label": "Cards Issued", "value": "1,000+"}, {"label": "Partner Hospitals", "value": "Multiple"}, {"label": "Coverage", "value": "Comprehensive"}]'::jsonb,
  5
),
(
  'eye-dental-surgical',
  'healthcare',
  'Eye, Dental & Surgical',
  'Free specialist care for those who cannot afford eye, dental, or surgical treatment.',
  'Specialist camps for eye care, dental treatment, and minor surgical procedures are organised periodically. These camps bring specialist doctors to Farangipete, making expert medical care accessible to rural communities.',
  'Eye',
  '[{"label": "Specialist Camps", "value": "50+"}, {"label": "Surgeries Funded", "value": "200+"}, {"label": "Specialists Involved", "value": "Various"}]'::jsonb,
  6
);

-- ============================================
-- Seed Data: Existing Upcoming Events
-- ============================================
INSERT INTO events (title, date, location, description, type) VALUES
(
  'Free Medical Camp',
  '1st & 3rd Sunday of Every Month',
  'Farangipete Community Hall',
  'Regular bi-monthly free medical camp featuring general health check-ups, specialist consultations, and free medicine distribution for the community.',
  'Healthcare'
),
(
  'Blood Donation Drive',
  'To be announced',
  'Farangipete',
  'Upcoming blood donation drive in collaboration with local hospitals. Help save lives by donating blood.',
  'Healthcare'
),
(
  'Educational Felicitation',
  'To be announced',
  'Farangipete Community Hall',
  'Annual felicitation ceremony recognising academic achievements of scholarship recipients and honour students.',
  'Education'
),
(
  'Community Outreach Programme',
  'To be announced',
  'Various locations, Bantwal Taluk',
  'Ration distribution and welfare assistance for underprivileged families across the taluk.',
  'Community'
);
