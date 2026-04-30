# API Data Monitor Tool

A Node.js tool that monitors API data for anomalies, stores results in Supabase (PostgreSQL), and generates plain English explanations via Gemini AI. Includes a React dashboard to view and track alerts over time.

> **Note:** Hosted on Render free tier — may take ~30 seconds to load on first visit.

## Features

- Fetches product data from FakeStoreAPI and validates for missing fields, invalid prices, and duplicates
- Stores alerts in **Supabase (PostgreSQL)**
- Uses **Gemini AI** to generate plain English explanations for each flagged alert
- **React dashboard** with stats overview, trend chart, and full alert table
- **Run Monitor Now** button to trigger a check directly from the UI
- Dashboard auto-refreshes every 30 seconds
- **10 Jest unit tests** covering all validator edge cases

## Tech Stack

- **Backend:** Node.js, Express, Axios
- **Database:** Supabase (PostgreSQL)
- **AI:** Google Gemini API (`gemini-1.5-flash`)
- **Frontend:** React, Vite, Recharts
- **Testing:** Jest
- **Deployed on:** Render

## Local Setup

### 1. Clone and install

```bash
git clone https://github.com/ottihchu101/data-monitor-alert-tool.git
cd data-monitor-alert-tool
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. In the SQL editor, run:

```sql
create table alerts (
  id uuid default gen_random_uuid() primary key,
  timestamp timestamptz default now(),
  product_id integer,
  message text,
  explanation text
);
```

3. Copy your **Project URL** and **anon public key** from Project Settings → API.

### 3. Environment variables

Create a `.env` file (use `.env.example` as a template):

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key

GEMINI_API_KEY=your_gemini_api_key

PORT=3000
```

### 4. Build the frontend

```bash
npm run build
```

### 5. Start the server

```bash
npm start
```

Visit → `http://localhost:3000`

### Run tests

```bash
npm test
```

## Deploy to Render

1. Create a free account at [render.com](https://render.com)
2. Click **New → Web Service** and connect your GitHub repo
3. Set the following:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node server.js`
4. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY`
5. Click **Deploy**
