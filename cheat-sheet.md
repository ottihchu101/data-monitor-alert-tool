# API Data Monitor Tool Cheat Sheet

## Elevator Pitch
**One-liner:** Built an API Data Monitor Tool that validates incoming product feeds, logs quality issues to MongoDB, and surfaces real-time alerts on a lightweight dashboard so teams can find and fix bad data fast.

## Refined Resume Bullets
- **Built:** Full-stack data monitoring system using Node.js, Express, and MongoDB to ingest and validate product feeds from e-commerce sources.
- **Automated validation:** Implemented rule-based checks to flag missing fields, invalid prices, and duplicate entries, reducing manual data-cleaning effort.
- **Real-time visibility:** Designed a dashboard that surfaces API alerts and failed records for faster debugging and resolution.
- **Extensible design:** Modular `validator.js` and `alerter.js` allow adding new rules or alert channels with minimal changes.

## 30-Second Script
"It's a full-stack Node.js/Express app that consumes product data, runs automated validation rules (missing fields, bad prices, duplicates), stores records and incidents in MongoDB, and shows alerts on a dashboard for immediate triage. It cuts manual review by surfacing only problematic records."

## 2-Minute Explanation
**Architecture:** Small modular backend with `validator.js` (validation rules), `alerter.js` (sends alerts), `logger.js` (event storage), and `server.js` (serves the dashboard + API). Data and alerts persist to MongoDB and the UI under `public/` shows current issues.

**Validation logic:** Checks required fields, price formats/ranges, and duplicates (by key fields or hashes). Rules are easy to extend so new product fields or thresholds can be added quickly.

**Alerting & UI:** Alerts are generated when a record fails validation and shown on the dashboard in near-real-time so engineers or data stewards can inspect the raw payload and the failed rules. The `alerter` supports configurable channels (console/webhook/others).

**Impact:** Automates repetitive checks, prevents bad product listings or pricing errors from reaching production, and provides an auditable trail of issues in MongoDB.

## Step-by-Step Process
1. **Data Ingestion:** `index.js` fetches product data from an external API (e.g., fakestoreapi.com/products).
2. **Inject Test Data:** For demo purposes, artificially adds bad data (e.g., zero price, missing title, duplicates).
3. **Validation:** `validator.js` checks each product for missing fields (title, price, image), invalid prices (≤0), and duplicates by ID.
4. **Issue Collection:** If issues found, collects them as an array of error messages.
5. **Logging:** `logger.js` connects to MongoDB and saves each issue as a document with timestamp, productId, and message.
6. **Alerting:** `alerter.js` sends an email notification with the list of issues using nodemailer.
7. **Dashboard Display:** `server.js` serves the static HTML/CSS dashboard and provides an API endpoint (/api/alerts) to fetch and display recent alerts from MongoDB.

## Tech Stack
- **Backend:** Node.js (runtime), Express.js (web framework for API)
- **Database:** MongoDB (NoSQL for flexible data storage)
- **Frontend:** HTML/CSS (simple static dashboard)
- **Other:** JavaScript (ES6+ for all logic), no additional libraries for core functionality

## Interview Q&A

### High-Level / Recruiter
- **Q: What problem does this solve?**  
  A: Automates data-quality checks on product feeds and surfaces actionable alerts so teams catch bad listings and pricing before they reach production.
- **Q: Who used it / what stakeholders benefited?**  
  A: Data engineers and product/content teams — they used the dashboard to prioritize fixes and reduce manual review.

### Architecture & Design
- **Q: What's the overall architecture?**  
  A: Node/Express API + validator/alerter/logger modules, MongoDB for persistence, small static dashboard under `public/` served by `server.js`.
- **Q: Why modularize into `validator.js`, `alerter.js`, `logger.js`?**  
  A: Separation of concerns for testability, easier extension (new rules or channels), and clearer ownership of responsibilities.
- **Q: How are validation rules defined and extended?**  
  A: Rule functions check required fields, types, ranges, duplicates; new rules can be added as functions or a JSON schema and plugged into `validator.js`.

### Data Model & Duplicates
- **Q: How do you detect duplicates?**  
  A: Compare key fields (title+sku+vendor), compute a stable hash, or rely on a unique index in MongoDB depending on performance/consistency needs.
- **Q: How do you represent alerts in MongoDB?**  
  A: Store alert document with recordId, failedRules[], timestamp, originalPayload, status (open/resolved), and optional assignee/notes.

### Validation Specifics
- **Q: What exact checks are implemented?**  
  A: Missing required fields, price format/range checks, negative/zero prices, malformed URLs, and duplicate detection.
- **Q: How do you handle borderline cases (e.g., price=0)?**  
  A: Configurable thresholds — treat price=0 as invalid by default but allow overrides per feed.

### Alerting & UI
- **Q: How are alerts delivered?**  
  A: `alerter.js` logs to console and can call webhooks; it's pluggable for Slack/email/other channels.
- **Q: How real-time is the dashboard?**  
  A: Near real-time—server pushes updates when alerts are created (polling or websockets could be added).

### Scaling & Performance
- **Q: Could this handle high throughput?**  
  A: For high volume, add a message queue (Kafka/RabbitMQ), worker pool for validation, and batch writes to MongoDB. Also shard or index DB for scale.
- **Q: Any bottlenecks in current design?**  
  A: Synchronous validation in the main process; single-threaded Node process; depends on I/O to DB/alert channels.

### Reliability & Error Handling
- **Q: How do you avoid alert floods?**  
  A: Rate-limiting, aggregation (group similar alerts), and deduplication within a time window.
- **Q: How do you ensure data isn't lost?**  
  A: Persistent storage in MongoDB and retry/backoff for webhook deliveries; for stronger guarantees, queue messages before processing.

### Security & Privacy
- **Q: Any authentication or data protection?**  
  A: For a production setup, add API auth (JWT/API keys), TLS, sanitize logged payloads, and limit sensitive fields persisted in MongoDB.
- **Q: How do you sanitize inputs?**  
  A: Validation rules check types/formats and strip/escape dangerous content; reject malformed JSON.

### Testing & Quality
- **Q: What tests do you have?**  
  A: Unit tests for validation rules, integration tests for ingestion→alert flow, and manual QA via dashboard. (If not implemented, say you'd add them.)
- **Q: How to test new validation rules?**  
  A: Add unit cases exercising edge values and integrate into end-to-end feed tests.

### Metrics & Impact
- **Q: How do you measure success?**  
  A: Reduced manual review time, number of bad records caught, mean time to detect/fix, and alert volume trends.
- **Q: Any quantitative results?**  
  A: Share concrete numbers if available (e.g., "reduced data-quality errors by X%"); if not, explain how you'd measure before/after.

### Implementation Details & Tradeoffs
- **Q: What tech stack was used?**  
  A: Node.js for the backend server, Express.js for building the API endpoints, MongoDB for storing data and alerts, and plain HTML/CSS for the lightweight dashboard UI.
- **Q: Why Node.js + MongoDB?**  
  A: Fast to prototype I/O-bound services, JSON native data model fits product payloads, and MongoDB flexible schema is ideal for varied feeds.
- **Q: What would you change for production?**  
  A: Add queuing, auth, structured logging, monitoring (Prometheus), CI/CD, and containerization with autoscaling.

### Follow-ups / Deep Dives
- **Q: Show me the validation code.**  
  A: Open `validator.js` and walk through a representative rule, show unit tests.
- **Q: How would you integrate with existing pipelines?**  
  A: Expose an authenticated POST endpoint, or add a connector to the ETL to publish events to a message bus consumed by the monitor.

### Behavioral / Ownership
- **Q: What part did you build end-to-end?**  
  A: Be specific — e.g., "I implemented the rule engine and dashboard and wired MongoDB persistence; I also created the initial README and basic tests."
- **Q: What was hardest and what did you learn?**  
  A: The hardest part was stopping too many alerts—small issues like tiny price changes flooded the dashboard. I learned to add settings for what counts as a problem and group similar alerts together, making it less noisy. This taught me to listen to users to make tools better.