# Deployment Guide

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure your company
# Edit src/config/site-config.ts with your company details

# 3. Run locally
npm run dev
# Open http://localhost:3000

# 4. Build for production
npm run build
npm start
```

---

## Platform Deployment Guides

### Azure App Service

1. **Create a Web App** in Azure Portal (Node 20 LTS, Linux)
2. **Set environment variables** in Configuration → Application Settings:
   ```
   ADMIN_API_KEY=your-secret-key
   NEXT_PUBLIC_COMPANY_NAME=Your Company
   NEXT_PUBLIC_SITE_URL=https://your-app.azurewebsites.net
   ```
3. **Deploy via GitHub Actions:**
   - In Azure Portal → Deployment Center → Get Publish Profile
   - Add `AZURE_WEBAPP_NAME` and `AZURE_WEBAPP_PUBLISH_PROFILE` as GitHub secrets
   - Push to `main` branch

Or using Azure CLI:
```bash
az webapp up --name dicoflow-web --runtime "NODE:20-lts" --sku B1
```

---

### AWS Elastic Beanstalk

1. **Install EB CLI:** `pip install awsebcli`
2. **Initialize:**
   ```bash
   eb init dicoflow-web --platform node.js --region ap-south-1
   eb create production --single --instance-type t3.small
   ```
3. **Set env vars:**
   ```bash
   eb setenv ADMIN_API_KEY=your-secret-key NODE_ENV=production
   ```
4. **Deploy:**
   ```bash
   eb deploy
   ```

Or using Docker on ECS:
```bash
docker build -t dicoflow-web .
aws ecr get-login-password | docker login --username AWS --password-stdin <account>.dkr.ecr.<region>.amazonaws.com
docker tag dicoflow-web:latest <account>.dkr.ecr.<region>.amazonaws.com/dicoflow-web:latest
docker push <account>.dkr.ecr.<region>.amazonaws.com/dicoflow-web:latest
```

---

### Google Cloud Run

```bash
# Build and push
gcloud builds submit --tag gcr.io/PROJECT_ID/dicoflow-web

# Deploy
gcloud run deploy dicoflow-web \
  --image gcr.io/PROJECT_ID/dicoflow-web \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars="ADMIN_API_KEY=your-secret-key"
```

---

### Heroku

```bash
# Login and create app
heroku login
heroku create dicoflow-web

# Set config
heroku config:set ADMIN_API_KEY=your-secret-key
heroku config:set NEXT_PUBLIC_COMPANY_NAME="Your Company"

# Deploy with Docker
heroku stack:set container
git push heroku main
```

---

### Docker (Self-Hosted)

```bash
# Using docker-compose
ADMIN_API_KEY=your-secret-key docker-compose up -d

# Or manually
docker build -t dicoflow-web .
docker run -d -p 3000:3000 \
  -e ADMIN_API_KEY=your-secret-key \
  -v dicoflow_data:/app/.data \
  dicoflow-web
```

---

### Vercel

```bash
npm i -g vercel
vercel
# Follow prompts, set env vars in Vercel dashboard
```

---

### DigitalOcean App Platform

1. Connect your GitHub repo in the DigitalOcean dashboard
2. Select "Web Service" → Dockerfile
3. Set environment variables in the app settings
4. Deploy

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ADMIN_API_KEY` | Yes | API key for admin dashboard access |
| `ADMIN_PASSWORD` | No | Additional admin password |
| `NEXT_PUBLIC_COMPANY_NAME` | No | Override company name |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Override contact email |
| `NEXT_PUBLIC_CONTACT_PHONE` | No | Override contact phone |

## Admin Dashboard

Access the admin panel at `/admin` with your `ADMIN_API_KEY`.

Features:
- View all enquiry submissions
- Search and filter enquiries
- Export to CSV
- API access: `GET /api/admin/enquiries` with `x-api-key` header

## Health Check

`GET /api/health` returns `200` with status info.
