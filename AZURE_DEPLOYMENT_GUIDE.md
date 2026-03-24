# Azure Deployment Guide - Medical Imaging Website

## Complete Step-by-Step Guide to Deploy Next.js App on Azure

### Prerequisites ✅

Before starting, ensure you have:
- [x] **Azure Account** - Free tier available at [azure.microsoft.com](https://azure.microsoft.com)
- [x] **Node.js 18+** - Download from [nodejs.org](https://nodejs.org)
- [x] **Git** - Download from [git-scm.com](https://git-scm.com)
- [x] **Azure CLI** - Download from [docs.microsoft.com/cli/azure](https://docs.microsoft.com/cli/azure)
- [x] **VS Code** (Optional) - With Azure extensions

---

## Phase 1: Project Preparation 🔧

### Step 1.1: Verify Project Structure
```bash
# Navigate to your project directory
cd "C:\Users\7000035834\OneDrive - Sony\Agentic_AI\web\medical-imaging-website"

# Verify all files are present
dir
```

**Expected files:**
```
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── web.config (created for Azure)
├── azure-pipelines.yml (created for Azure)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── api/
│   │       └── health/
│   │           └── route.ts
│   ├── components/
│   │   ├── ui/
│   │   └── DicomQualityComparison.tsx
│   └── lib/
├── public/
│   └── images/
├── .github/
│   └── workflows/
│       └── azure-deploy.yml
└── README.md
```

### Step 1.2: Update package.json for Production
Your current `package.json` scripts should look like this:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "next lint"
  }
}
```

**Required Updates:**
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start", 
    "lint": "next lint",
    "build:production": "NODE_ENV=production next build"
  }
}
```
```

### Step 1.3: Create Azure-specific Configuration Files

Create `azure-pipelines.yml`:
```yaml
# azure-pipelines.yml
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

variables:
  nodeVersion: '18.x'

steps:
- task: NodeTool@0
  inputs:
    versionSpec: $(nodeVersion)
  displayName: 'Install Node.js'

- script: |
    npm ci
    npm run build
  displayName: 'Install dependencies and build'

- task: ArchiveFiles@2
  inputs:
    rootFolderOrFile: '.'
    includeRootFolder: false
    archiveType: 'zip'
    archiveFile: '$(Build.ArtifactStagingDirectory)/$(Build.BuildId).zip'
    replaceExistingArchive: true

- task: PublishBuildArtifacts@1
  inputs:
    PathtoPublish: '$(Build.ArtifactStagingDirectory)'
    ArtifactName: 'drop'
    publishLocation: 'Container'
```

Create `web.config` for IIS:
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="server.js" verb="*" modules="iisnode"/>
    </handlers>
    <rewrite>
      <rules>
        <rule name="StaticContent">
          <action type="Rewrite" url="public{REQUEST_URI}"/>
        </rule>
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
          </conditions>
          <action type="Rewrite" url="server.js"/>
        </rule>
      </rules>
    </rewrite>
    <security>
      <requestFiltering removeServerHeader="true"/>
    </security>
  </system.webServer>
</configuration>
```

---

## Phase 2: Azure Setup 🌐

### Step 2.1: Install Azure CLI
```powershell
# Download and install Azure CLI
# Visit: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows

# Verify installation
az --version
```

### Step 2.2: Login to Azure
```powershell
# Login to your Azure account
az login

# Verify your subscription
az account show
```

### Step 2.3: Create Resource Group
```powershell
# Create a resource group
az group create --name "medical-imaging-rg" --location "East US"
```

### Step 2.4: Create App Service Plan
```powershell
# Create App Service Plan (Free tier for testing)
az appservice plan create --name "medical-imaging-plan" --resource-group "medical-imaging-rg" --sku FREE --is-linux

# For production, use Standard tier:
# az appservice plan create --name "medical-imaging-plan" --resource-group "medical-imaging-rg" --sku S1 --is-linux
```

---

## Phase 3: Deployment Methods 🚀

### Method A: Azure App Service (Recommended)

#### Step 3A.1: Create Web App
```powershell
# Create the web app
az webapp create --resource-group "medical-imaging-rg" --plan "medical-imaging-plan" --name "medical-imaging-webapp" --runtime "NODE:18-lts"
```

#### Step 3A.2: Configure App Settings
```powershell
# Set Node.js version
az webapp config appsettings set --resource-group "medical-imaging-rg" --name "medical-imaging-webapp" --settings WEBSITE_NODE_DEFAULT_VERSION="18.17.0"

# Enable build during deployment
az webapp config appsettings set --resource-group "medical-imaging-rg" --name "medical-imaging-webapp" --settings SCM_DO_BUILD_DURING_DEPLOYMENT="true"

# Set startup command for Next.js
az webapp config set --resource-group "medical-imaging-rg" --name "medical-imaging-webapp" --startup-file "npm start"

# Set production environment
az webapp config appsettings set --resource-group "medical-imaging-rg" --name "medical-imaging-webapp" --settings NODE_ENV="production"

# Disable Next.js telemetry (optional)
az webapp config appsettings set --resource-group "medical-imaging-rg" --name "medical-imaging-webapp" --settings NEXT_TELEMETRY_DISABLED="1"
```

#### Step 3A.3: Deploy via Git
```powershell
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit for Azure deployment"

# Get deployment credentials
az webapp deployment user set --user-name "medical-imaging-user" --password "SecurePassword123!"

# Add Azure remote
$azureGitUrl = az webapp deployment source config-local-git --resource-group "medical-imaging-rg" --name "medical-imaging-webapp" --query url --output tsv
git remote add azure $azureGitUrl

# Deploy
git push azure main
```

### Method B: Azure Static Web Apps (Alternative)

#### Step 3B.1: Build for Static Export (Next.js 13+ App Router)
Update `next.config.ts`:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
};

export default nextConfig;
```

#### Step 3B.2: Build and Export
```powershell
# Build the application
npm run build

# The static files will be in the 'out' directory
```

#### Step 3B.3: Create Static Web App
```powershell
# Install Static Web Apps CLI
npm install -g @azure/static-web-apps-cli

# Create static web app
az staticwebapp create --name "medical-imaging-static" --resource-group "medical-imaging-rg" --location "East US2"
```

---

## Phase 4: Domain & SSL Configuration 🔒

### Step 4.1: Custom Domain (Optional)
```powershell
# Add custom domain
az webapp config hostname add --webapp-name "medical-imaging-webapp" --resource-group "medical-imaging-rg" --hostname "yourdomain.com"

# Enable SSL
az webapp config ssl bind --certificate-thumbprint <certificate-thumbprint> --ssl-type SNI --name "medical-imaging-webapp" --resource-group "medical-imaging-rg"
```

### Step 4.2: Enable HTTPS Redirect
```powershell
# Force HTTPS
az webapp update --resource-group "medical-imaging-rg" --name "medical-imaging-webapp" --https-only true
```

---

## Phase 5: Monitoring & Performance 📊

### Step 5.1: Enable Application Insights
```powershell
# Create Application Insights
az monitor app-insights component create --app "medical-imaging-insights" --location "East US" --resource-group "medical-imaging-rg"

# Connect to web app
$instrumentationKey = az monitor app-insights component show --app "medical-imaging-insights" --resource-group "medical-imaging-rg" --query instrumentationKey --output tsv
az webapp config appsettings set --resource-group "medical-imaging-rg" --name "medical-imaging-webapp" --settings APPINSIGHTS_INSTRUMENTATIONKEY="$instrumentationKey"
```

### Step 5.2: Configure Scaling (Production)
```powershell
# Enable autoscaling
az monitor autoscale create --resource-group "medical-imaging-rg" --resource "/subscriptions/{subscription-id}/resourceGroups/medical-imaging-rg/providers/Microsoft.Web/serverfarms/medical-imaging-plan" --name "medical-imaging-autoscale" --min-count 1 --max-count 3 --count 1
```

---

## Phase 6: Database Setup (If Needed) 🗄️

### Step 6.1: Azure Cosmos DB (Optional)
```powershell
# Create Cosmos DB account
az cosmosdb create --resource-group "medical-imaging-rg" --name "medical-imaging-cosmos" --kind GlobalDocumentDB --locations regionName="East US" failoverPriority=0 --default-consistency-level "Session"

# Create database
az cosmosdb sql database create --account-name "medical-imaging-cosmos" --resource-group "medical-imaging-rg" --name "MedicalImagingDB"
```

---

## Phase 7: CI/CD Pipeline 🔄

### Step 7.1: GitHub Actions (Recommended)
Create `.github/workflows/azure-deploy.yml`:

```yaml
name: Deploy to Azure Web App

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build application
      run: npm run build

    - name: Deploy to Azure Web App
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'medical-imaging-webapp'
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: .
```

### Step 7.2: Get Publish Profile
```powershell
# Download publish profile
az webapp deployment list-publishing-profiles --resource-group "medical-imaging-rg" --name "medical-imaging-webapp" --xml
```

---

## Phase 8: Security & Optimization 🛡️

### Step 8.1: Environment Variables
```powershell
# Set production environment variables
az webapp config appsettings set --resource-group "medical-imaging-rg" --name "medical-imaging-webapp" --settings NODE_ENV="production"
az webapp config appsettings set --resource-group "medical-imaging-rg" --name "medical-imaging-webapp" --settings NEXT_TELEMETRY_DISABLED="1"
```

### Step 8.2: Enable Compression
```powershell
# Enable gzip compression
az webapp config set --resource-group "medical-imaging-rg" --name "medical-imaging-webapp" --use-32bit-worker-process false
```

---

## Phase 9: Testing & Validation ✅

### Step 9.1: Health Checks
Create `pages/api/health.ts`:
```typescript
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
}
```

### Step 9.2: Performance Testing
```powershell
# Test the deployed application
curl https://medical-imaging-webapp.azurewebsites.net/api/health
```

---

## Phase 10: Backup & Disaster Recovery 💾

### Step 10.1: Enable Backups
```powershell
# Create storage account for backups
az storage account create --name "medicalimaginbackup" --resource-group "medical-imaging-rg" --location "East US" --sku Standard_LRS

# Enable backup
az webapp config backup create --resource-group "medical-imaging-rg" --webapp-name "medical-imaging-webapp" --backup-name "daily-backup" --storage-account-url "https://medicalimaginbackup.blob.core.windows.net/" --frequency 24 --retain-one true
```

---

## Troubleshooting Guide 🔧

### Common Issues & Solutions

1. **Build Failures**
   ```powershell
   # Check logs
   az webapp log tail --resource-group "medical-imaging-rg" --name "medical-imaging-webapp"
   ```

2. **Memory Issues**
   ```powershell
   # Increase memory limit
   az webapp config appsettings set --resource-group "medical-imaging-rg" --name "medical-imaging-webapp" --settings WEBSITE_MEMORY_LIMIT_MB="1024"
   ```

3. **Startup Timeout**
   ```powershell
   # Increase startup timeout
   az webapp config appsettings set --resource-group "medical-imaging-rg" --name "medical-imaging-webapp" --settings WEBSITES_CONTAINER_START_TIME_LIMIT="1800"
   ```

---

## Cost Optimization 💰

### Resource Recommendations by Usage:

**Development/Testing:**
- App Service Plan: F1 (Free)
- Storage: Standard LRS
- Application Insights: Basic

**Production:**
- App Service Plan: S1 or P1V2
- Storage: Standard GRS
- Application Insights: Standard
- CDN: Standard Microsoft

**Estimated Monthly Costs:**
- Development: $0-10
- Production: $50-150 (depending on traffic)

---

## Maintenance Checklist 📋

### Weekly Tasks:
- [ ] Check Application Insights for errors
- [ ] Review performance metrics
- [ ] Verify backups are running
- [ ] Check resource usage

### Monthly Tasks:
- [ ] Review and optimize costs
- [ ] Update dependencies
- [ ] Security scan
- [ ] Performance optimization

---

## Support & Resources 📚

### Official Documentation:
- [Azure App Service](https://docs.microsoft.com/azure/app-service/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/)

### Useful Commands:
```powershell
# Quick deployment status
az webapp show --resource-group "medical-imaging-rg" --name "medical-imaging-webapp" --query "state"

# View application logs
az webapp log download --resource-group "medical-imaging-rg" --name "medical-imaging-webapp"

# Restart application
az webapp restart --resource-group "medical-imaging-rg" --name "medical-imaging-webapp"
```

---

## Final Checklist Before Going Live ✅

- [ ] Domain configured and SSL enabled
- [ ] Environment variables set
- [ ] Health checks working
- [ ] Monitoring enabled
- [ ] Backups configured
- [ ] Performance tested
- [ ] Security review completed
- [ ] Documentation updated
- [ ] Team trained on monitoring

---

**Deployment URL:** `https://medical-imaging-webapp.azurewebsites.net`

**Admin Portal:** [Azure Portal](https://portal.azure.com)

**Support:** Azure Support Plan recommended for production workloads