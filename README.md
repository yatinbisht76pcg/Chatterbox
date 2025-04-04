# 💬 Chatterbox

A real-time 2-person chat app built using **React**, **Tailwind CSS**, and **Supabase**. This project demonstrates Supabase Auth, Database, and Realtime features — all working seamlessly on the frontend.

![screenshot](https://chatterbox-vert.vercel.app/screenshot.png)

---

## ✨ Features

- 🔐 Supabase Auth with email/password login (2 hardcoded users)
- 💬 Real-time messaging between 2 users using WebSockets
- 🗃️ Messages stored in Supabase with RLS security
- 📱 Responsive, clean chat UI with Tailwind CSS
- ⚡ Auto-scroll to latest messages

---

## 🛠️ Tech Stack

- React (with Hooks)
- Supabase (Auth, Database, Realtime)
- Tailwind CSS
- UUID for message IDs

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/chatterbox.git
cd chatterbox
npm install
```

---

### 2. Set Up Supabase

- Go to [https://app.supabase.com](https://app.supabase.com) and create a new project.
- Enable **email/password auth**
- Create a `messages` table with:

```sql
create table messages (
  id uuid default uuid_generate_v4() primary key,
  sender_id uuid not null,
  receiver_id uuid not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

- Enable **RLS** and add policies:

```sql
-- Read policy
create policy "Users can read their messages"
on messages
for select
using (
  auth.uid() = sender_id or auth.uid() = receiver_id
);

-- Insert policy
create policy "Users can send messages"
on messages
for insert
with check (
  auth.uid() = sender_id
);
```

- (Optional) Create a `profiles` table to store display names.

---

### 3. Configure Environment

Create a `.env` file:

```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

---

### 4. Add Two Users

From Supabase Auth > Users, create two test users manually.

```plaintext
user1@example.com / 876543210
user2@example.com / 876543210
```

Update your frontend logic to hardcode only these two users.

---

### 5. Run Locally

```bash
npm start
```

---

## 🧪 Testing

- Login as `user1@example.com` in one browser
- Login as `user2@example.com` in another
- Start chatting — messages appear in real-time!

---

## ✅ TODO / Bonus Features

- [ ] Typing indicators
- [ ] File uploads
- [ ] Emoji picker
- [ ] Read/delivered message status
- [ ] Push notifications

---

## 📄 License

MIT — feel free to use, fork, and contribute!

---

## 🙌 Acknowledgements

- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://reactjs.org/)

---

## 🗄️ Supabase SQL Setup

Below are all the SQL commands used to set up the database, security, indexes, and profile management in Supabase.

### 📥 Messages Table

```sql
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

create policy "Users can read their own messages"
on messages for select
using (
  auth.uid() = sender_id or 
  auth.uid() = receiver_id
);
```

### 🔍 Query Function

```sql
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
```

### ⚡ Indexes

```sql
create index messages_sender_receiver_idx 
on messages(sender_id, receiver_id);

create index messages_created_at_idx 
on messages(created_at desc);
```

---

### 👤 Profiles Table (User Metadata)

```sql
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table profiles enable row level security;

create policy "Users can view all profiles"
  on profiles for select
  to authenticated
  using (true);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);
```

### 🔁 Profile Auto-Creation Trigger

```sql
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

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user_profile();
```

### ⚡ Profile Index

```sql
create index profiles_display_name_idx on profiles(display_name);
```
