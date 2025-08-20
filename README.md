# API Data Monitor Tool

A Node.js tool that monitors API data for anomalies and missing values, stores results in MongoDB, and sends real-time alerts via email.  
Includes a simple web dashboard to view and track alerts.

## 🚀 Features
- Fetches product data from an API (tested with FakeStoreAPI, extendable to Best Buy API or others)
- Injects test anomalies for pipeline verification
- Validates fields (title, price, image), detects duplicates and invalid values
- Logs alerts in MongoDB for persistence
- Sends real-time email notifications via Nodemailer
- Dashboard (HTML/CSS) served with Express to view alerts in real-time
- Auto-refreshing dashboard every 30 seconds

## 🛠 Tech Stack
- **Backend:** Node.js, Express, Axios  
- **Database:** MongoDB (via Mongoose)  
- **Email:** Nodemailer (Gmail SMTP)  
- **Frontend:** HTML, CSS (served from `/public`)  

## ⚙️ Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/YOUR-USERNAME/data-monitor-alert-tool.git
   cd data-monitor-alert-tool

   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env` file (use `.env.example` as a template):
   ```env
   MONGO_URI=your_mongo_connection
   EMAIL_USER=your_email
   EMAIL_PASS=your_app_password
   ALERT_TO=recipient@example.com
   PORT=3000
   ```

4. **Start the dashboard**
   ```bash
   npm run start
   ```
   Visit → `http://localhost:3000`

5. **Run the monitoring job**
   ```bash
   npm run monitor
   ```

## 📊 Dashboard
The dashboard displays all alerts stored in MongoDB:  
- **Timestamp** of detection  
- **Product ID** (if available)  
- **Alert message** describing the anomaly  

![Dashboard Screenshot](./screenshot.png)

## 🔮 Future Improvements
- Integrate additional APIs beyond e-commerce (financial, social, IoT, etc.)
- Add a manual “Refresh” button and configurable auto-refresh interval
- Slack/Discord alert integration
- Advanced anomaly detection (e.g., statistical outliers, trend analysis)
- Deploy live for continuous monitoring
