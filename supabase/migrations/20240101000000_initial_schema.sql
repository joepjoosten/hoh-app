-- Enable required extensions
create extension if not exists "pgcrypto";

-- Create enum types
create type event_type as enum ('rehearsal', 'concert', 'meeting', 'social', 'board');
create type user_role as enum ('admin', 'board', 'member', 'student');

-- Users table (extends auth.users)
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Formations (Muziekmaatjes, Opmaatjes, Jeugdorkest, Slagwerkgroep, Orkest)
create table public.formations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Positions/Instruments
create table public.positions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  instrument_family text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User positions in formations (many-to-many)
create table public.user_positions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users on delete cascade not null,
  position_id uuid references public.positions on delete cascade not null,
  formation_id uuid references public.formations on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, position_id, formation_id)
);

-- User roles
create table public.user_roles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users on delete cascade not null,
  role user_role not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, role)
);

-- Rehearsals
create table public.rehearsals (
  id uuid default gen_random_uuid() primary key,
  formation_id uuid references public.formations on delete cascade not null,
  title text not null,
  description text,
  rehearsal_date timestamp with time zone not null,
  location text,
  notes text,
  created_by uuid references public.users on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Rehearsal absences
create table public.rehearsal_absences (
  id uuid default gen_random_uuid() primary key,
  rehearsal_id uuid references public.rehearsals on delete cascade not null,
  user_id uuid references public.users on delete cascade not null,
  reason text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(rehearsal_id, user_id)
);

-- Events (general calendar)
create table public.events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  event_date timestamp with time zone not null,
  event_type event_type not null,
  formation_id uuid references public.formations on delete cascade,
  location text,
  created_by uuid references public.users on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Sheet music library
create table public.sheet_music (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  composer text,
  formation_id uuid references public.formations on delete set null,
  file_url text not null,
  thumbnail_url text,
  uploaded_by uuid references public.users on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.formations enable row level security;
alter table public.positions enable row level security;
alter table public.user_positions enable row level security;
alter table public.user_roles enable row level security;
alter table public.rehearsals enable row level security;
alter table public.rehearsal_absences enable row level security;
alter table public.events enable row level security;
alter table public.sheet_music enable row level security;

-- RLS Policies

-- Users: Can read all, but only update own profile
create policy "Users can view all profiles"
  on public.users for select
  using (true);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

-- Formations: Everyone can read
create policy "Anyone can view formations"
  on public.formations for select
  using (true);

-- Positions: Everyone can read
create policy "Anyone can view positions"
  on public.positions for select
  using (true);

-- User positions: Everyone can read, users can manage their own
create policy "Anyone can view user positions"
  on public.user_positions for select
  using (true);

create policy "Users can manage their own positions"
  on public.user_positions for all
  using (auth.uid() = user_id);

-- User roles: Everyone can read
create policy "Anyone can view user roles"
  on public.user_roles for select
  using (true);

-- Rehearsals: Everyone can read, admins/board can create/update
create policy "Anyone can view rehearsals"
  on public.rehearsals for select
  using (true);

create policy "Admins and board can manage rehearsals"
  on public.rehearsals for all
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid()
      and role in ('admin', 'board')
    )
  );

-- Rehearsal absences: Users can manage their own absences
create policy "Anyone can view absences"
  on public.rehearsal_absences for select
  using (true);

create policy "Users can manage their own absences"
  on public.rehearsal_absences for all
  using (auth.uid() = user_id);

-- Events: Everyone can read, admins/board can create/update
create policy "Anyone can view events"
  on public.events for select
  using (true);

create policy "Admins and board can manage events"
  on public.events for all
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid()
      and role in ('admin', 'board')
    )
  );

-- Sheet music: Everyone can read, admins can upload
create policy "Anyone can view sheet music"
  on public.sheet_music for select
  using (true);

create policy "Admins can manage sheet music"
  on public.sheet_music for all
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid()
      and role = 'admin'
    )
  );

-- Functions

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create user profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger handle_updated_at before update on public.users
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.rehearsals
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.events
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.sheet_music
  for each row execute procedure public.handle_updated_at();

-- Insert default formations
insert into public.formations (name, description) values
  ('Muziekmaatjes', 'Beginnende muzikanten'),
  ('Opmaatjes', 'Gevorderde jonge muzikanten'),
  ('Jeugdorkest', 'Jeugdorkest Harmonie van Horst'),
  ('Slagwerkgroep', 'Slagwerk sectie'),
  ('Orkest', 'Hoofdorkest Harmonie van Horst');

-- Insert common positions/instruments
insert into public.positions (name, instrument_family) values
  ('Piccolo', 'Hout'),
  ('Dwarsfluit', 'Hout'),
  ('Hobo', 'Hout'),
  ('Fagot', 'Hout'),
  ('Es Klarinet', 'Hout'),
  ('Bb Klarinet', 'Hout'),
  ('Basklarinet', 'Hout'),
  ('Altsaxofoon', 'Hout'),
  ('Tenorsaxofoon', 'Hout'),
  ('Bariton saxofoon', 'Hout'),
  ('Cornet', 'Koper'),
  ('Trompet', 'Koper'),
  ('Bugel', 'Koper'),
  ('Hoorn', 'Koper'),
  ('Bariton', 'Koper'),
  ('Euphonium', 'Koper'),
  ('Trombone', 'Koper'),
  ('Bastrombone', 'Koper'),
  ('Tuba', 'Koper'),
  ('Slagwerk', 'Slagwerk'),
  ('Drum', 'Slagwerk'),
  ('Xylofoon', 'Slagwerk'),
  ('Pauken', 'Slagwerk');
