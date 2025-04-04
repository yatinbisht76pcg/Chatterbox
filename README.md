## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`


### `npm run eject`


## Run This Supabase commands

Create your supabase account 

Add two user -
Email: user1@gmail.com
Password: 876543210
Email: user2@gmail.com
Password: 876543210

create table messages (
  id uuid default uuid_generate_v4() primary key,
  sender_id uuid not null,
  receiver_id uuid not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table messages enable row level security;

create policy "Users can insert their own messages"
on messages for insert
with check (auth.uid() = sender_id);

-- Policy for reading messages (both sender and receiver can read)
create policy "Users can read their own messages"
on messages for select
using (
  auth.uid() = sender_id or 
  auth.uid() = receiver_id
);

-- Policy for inserting messages (users can only send messages as themselves)
create policy "Users can insert their own messages"
on messages for insert
with check (
  auth.uid() = sender_id
);


----------------
create or replace function get_chat_messages(p_user1_id uuid, p_user2_id uuid)
returns table (
  id uuid,
  sender_id uuid,
  receiver_id uuid,
  message text,
  created_at timestamptz
)
language sql
security definer
as $$
  select id, sender_id, receiver_id, message, created_at
  from messages
  where 
    (sender_id = p_user1_id and receiver_id = p_user2_id) or
    (sender_id = p_user2_id and receiver_id = p_user1_id)
  order by created_at asc;
$$;

--------------------
create index messages_sender_receiver_idx 
on messages(sender_id, receiver_id);

--------------
create index messages_created_at_idx 
on messages(created_at desc);




-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Create policies
create policy "Users can view all profiles"
  on profiles for select
  to authenticated
  using (true);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- Create a function to handle new user signup
create or replace function public.handle_new_user_profile()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', new.email)
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create a trigger to automatically create a profile when a user signs up
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user_profile();

-- Create an index for faster lookups
create index profiles_display_name_idx on profiles(display_name);