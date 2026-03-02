# MSC Spec Manager - Netlify Deployment

## Quick Deploy (5 minutes)

### Step 1: Install dependencies locally (optional, for testing)
```bash
npm install
npm run dev
```

### Step 2: Push to GitHub
1. Create a new repo on GitHub (e.g. `msc-spec-manager`)
2. Push this folder:
```bash
git init
git add .
git commit -m "MSC Spec Manager"
git branch -M main
git remote add origin https://github.com/YOUR_USER/msc-spec-manager.git
git push -u origin main
```

### Step 3: Deploy on Netlify
1. Go to **app.netlify.com**
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub repo
4. Netlify auto-detects the settings (build command: `npm run build`, publish: `dist`)
5. Click **Deploy**

### Step 4: Add API Key (for AI Import)
1. In Netlify dashboard → **Site settings** → **Environment variables**
2. Add: `ANTHROPIC_API_KEY` = `sk-ant-your-key-here`
3. Redeploy (Deploys → Trigger deploy)

### Step 5: Install Netlify Blobs (shared database)
Netlify Blobs is included automatically. No extra setup needed.
The shared database stores specs, users, and audit logs server-side.

## Architecture
- **Frontend**: React + Vite (builds to static files)
- **Backend**: Netlify Functions (serverless)
  - `ai-import.js` - Proxies AI requests to Anthropic API (keeps key secure)
  - `db.js` - Shared database via Netlify Blobs
- **Database**: Netlify Blobs (key-value, included free)
- **Fallback**: localStorage (works offline, per-browser)

## Features
- Dashboard with stats
- Create/edit specifications (all 12 sections)
- AI Import (PDF → structured data via Claude)
- File attachments (images, PDFs, docs)
- CSV/HTML export
- Multi-user auth with admin approval
- Audit log (admin only)
- Shared database (all users see same data)
- Reports with filters

## Files
```
├── index.html              # Entry point
├── netlify.toml            # Netlify config
├── package.json            # Dependencies
├── vite.config.js          # Build config
├── src/
│   ├── main.jsx            # React mount
│   └── App.jsx             # Full application
└── netlify/functions/
    ├── ai-import.js        # AI proxy function
    └── db.js               # Shared database function
```

## Cost
- Netlify Free tier: 100GB bandwidth, 125K function calls/month
- Anthropic API: ~$0.003 per AI import (Claude Sonnet)
- Total for small team: essentially free
