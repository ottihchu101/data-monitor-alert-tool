# API Data Monitor Tool

A Node.js tool that monitors API data for anomalies, stores results in Supabase (PostgreSQL), generates plain English explanations via Gemini AI, and sends real-time email alerts. Includes a React dashboard to view and track alerts over time.

## Features

- Fetches product data from FakeStoreAPI and validates for missing fields, invalid prices, and duplicates
- Stores alerts in **Supabase (PostgreSQL)**
- Uses **Gemini AI** to generate plain English explanations for each flagged alert
- **React dashboard** with stats overview, trend chart, and full alert table
- **Run Monitor Now** button to trigger a check directly from the UI
- Dashboard auto-refreshes every 30 seconds
- **10 Jest unit tests** covering all validator edge cases
- Deployable to **Google Cloud Run**

## Tech Stack

- **Backend:** Node.js, Express, Axios
- **Database:** Supabase (PostgreSQL)
- **AI:** Google Gemini API (`gemini-1.5-flash`)
- **Email:** Nodemailer (Gmail SMTP)
- **Frontend:** React, Vite, Recharts
- **Testing:** Jest

## Setup

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

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ALERT_TO=recipient@example.com

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

## Deploy to Google Cloud Run

### Prerequisites

- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) installed and authenticated
- A Google Cloud project with Cloud Run and Artifact Registry enabled

### Steps

```bash
# Set your project
gcloud config set project YOUR_PROJECT_ID

# Build and push the Docker image
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/data-monitor-alert-tool

# Deploy to Cloud Run
gcloud run deploy data-monitor-alert-tool \
  --image gcr.io/YOUR_PROJECT_ID/data-monitor-alert-tool \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars SUPABASE_URL=your_url,SUPABASE_ANON_KEY=your_key,GEMINI_API_KEY=your_key,EMAIL_USER=your_email,EMAIL_PASS=your_pass,ALERT_TO=recipient@example.com
```

Cloud Run will give you a live public URL.
