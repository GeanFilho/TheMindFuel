-- Create the videos table for community-curated content
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'geral',
  description TEXT,
  thumbnail_url TEXT,
  submitted_by TEXT DEFAULT 'Anonimo',
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Anyone can view videos" ON public.videos;
DROP POLICY IF EXISTS "Anyone can submit videos" ON public.videos;
DROP POLICY IF EXISTS "Anyone can update likes" ON public.videos;

-- Allow anyone to read videos (public community content)
CREATE POLICY "Anyone can view videos" ON public.videos
  FOR SELECT USING (true);

-- Allow anyone to insert videos (anonymous community submissions)
CREATE POLICY "Anyone can submit videos" ON public.videos
  FOR INSERT WITH CHECK (true);

-- Allow anyone to update like counts
CREATE POLICY "Anyone can update likes" ON public.videos
  FOR UPDATE USING (true);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_videos_category ON public.videos(category);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_videos_created_at ON public.videos(created_at DESC);
