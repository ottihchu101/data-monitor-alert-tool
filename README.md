# API Data Monitor Tool

A full-stack data quality monitoring tool that detects anomalies in a product API feed, explains them in plain English using AI, and displays everything on a React dashboard.

## What it does

1. Fetches product data from a REST API
2. Scans for data quality issues — missing fields, invalid prices, duplicate records
3. Uses **Gemini AI** to generate a plain English explanation for each issue
4. Saves all alerts to a **PostgreSQL database** (Supabase)
5. Displays everything on a **React dashboard** with live stats and a trend chart
6. Includes a **"Run Monitor Now"** button to trigger a check from the browser

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express |
| Database | Supabase (PostgreSQL) |
| AI | Google Gemini API |
| Frontend | React, Vite, Recharts |
| Testing | Jest (10 unit tests) |

## Running Locally

### Prerequisites
- Node.js 18+
- A free [Supabase](https://supabase.com) account
- A [Gemini API key](https://aistudio.google.com)

### 1. Clone the repo

```bash
git clone https://github.com/ottihchu101/data-monitor-alert-tool.git
cd data-monitor-alert-tool
npm install
```

### 2. Create the database table

In your Supabase project, go to the **SQL Editor** and run:

```sql
create table alerts (
  id uuid default gen_random_uuid() primary key,
  timestamp timestamptz default now(),
  product_id integer,
  message text,
  explanation text
);
```

### 3. Add environment variables

Create a `.env` file in the root:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
GEMINI_API_KEY=your_gemini_api_key
PORT=3000
```

### 4. Build and start

> This is a Node.js backend project — do **not** use Live Server. Run it with the commands below.

```bash
npm run build
npm start
```

Then open your browser and go to → `http://localhost:3000`

### 5. Run tests

```bash
npm test
```
