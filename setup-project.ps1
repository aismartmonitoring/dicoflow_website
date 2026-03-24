# 📦 Project Export & Portability Guide

## ✅ **Can You Export and Run Directly? YES!**

Your medical imaging website project is **fully portable** and can be exported to run on any system that meets the basic requirements.

---

## 🎯 **Quick Answer:**
- ✅ **Export entire folder** - All files are included
- ✅ **Run directly** - After installing dependencies
- ✅ **Cross-platform** - Works on Windows, Mac, Linux
- ✅ **Self-contained** - No external database dependencies

---

## 📋 **What Gets Exported (Complete Project):**

### **Core Project Files:**
```
medical-imaging-website/
├── 📦 package.json & package-lock.json (Dependencies)
├── ⚙️ next.config.ts (Next.js configuration)
├── 🎨 tailwind.config.ts (Styling configuration)  
├── 📝 tsconfig.json (TypeScript configuration)
├── 🔧 eslint.config.mjs (Code quality)
├── 🎯 postcss.config.mjs (CSS processing)
├── 🌐 web.config (Azure deployment)
├── 🔄 azure-pipelines.yml (CI/CD)
├── 📖 README.md & Documentation
└── 🔍 validate-deployment.ps1
```

### **Source Code:**
```
src/
├── app/ (Next.js 13+ App Router)
│   ├── layout.tsx (Root layout)
│   ├── page.tsx (Home page)
│   ├── globals.css (Global styles)
│   └── api/health/route.ts (Health endpoint)
├── components/ (React components)
│   ├── ui/ (Reusable UI library)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── index.ts
│   ├── DicomQualityComparison.tsx (Main component)
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── [other components]
└── lib/ (Utilities & configurations)
    ├── utils.ts (Helper functions)
    ├── constants.ts (App constants)
    ├── types.ts (TypeScript types)
    ├── hooks.ts (Custom React hooks)
    ├── animations.ts (Framer Motion configs)
    ├── context.tsx (React Context)
    ├── services.ts (API services)
    └── index.ts (Exports)
```

### **Assets & Configuration:**
```
public/ (Static assets)
├── images/ (Medical imaging assets)
├── icons/
└── [other static files]

.github/workflows/ (GitHub Actions)
└── azure-deploy.yml (Auto-deployment)
```

---

## 🚀 **How to Export & Run on Another System:**

### **Method 1: ZIP/Copy Entire Folder** ⭐ **Recommended**

#### **Step 1: Export the Project**
```powershell
# Option A: Copy entire folder
Copy-Item -Path "C:\Users\7000035834\OneDrive - Sony\Agentic_AI\web\medical-imaging-website" -Destination "D:\exported-project" -Recurse

# Option B: Create ZIP archive
Compress-Archive -Path "C:\Users\7000035834\OneDrive - Sony\Agentic_AI\web\medical-imaging-website\*" -DestinationPath "D:\medical-imaging-website.zip"
```

#### **Step 2: On Target System**
```bash
# 1. Extract (if zipped) and navigate to folder
cd medical-imaging-website

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Build for production
npm run build

# 5. Start production server
npm start
```

### **Method 2: Git Clone** 🔄

#### **If project is in Git repository:**
```bash
# Clone the repository
git clone <your-repo-url>
cd medical-imaging-website

# Install and run
npm install
npm run dev
```

---

## 💻 **Target System Requirements:**

### **Minimum Requirements:**
- ✅ **Node.js 18+** ([nodejs.org](https://nodejs.org))
- ✅ **npm** (comes with Node.js)
- ✅ **4GB RAM** minimum
- ✅ **1GB free disk space**

### **Operating System Support:**
- ✅ **Windows 10/11**
- ✅ **macOS 10.15+**
- ✅ **Linux** (Ubuntu 18+, CentOS 7+)

### **Optional (for development):**
- 🔧 **VS Code** (recommended editor)
- 🎯 **Git** (for version control)

---

## ⚡ **Quick Setup Script for Target System:**

<function_calls>
<invoke name="create_file">
<parameter name="content"># Quick Setup Script for New System
# Save as: setup-project.ps1

Write-Host "🚀 Medical Imaging Website - Quick Setup" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan

# Check Node.js
Write-Host "`n🔍 Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found! Please install from nodejs.org" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host "`n🔍 Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found!" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "`n📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
    exit 1
}

# Test build
Write-Host "`n🔨 Testing build process..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "`n🎉 Setup Complete!" -ForegroundColor Green
Write-Host "🌐 Run 'npm run dev' to start development server" -ForegroundColor Cyan
Write-Host "🚀 Run 'npm start' to start production server" -ForegroundColor Cyan
Write-Host "📖 Open http://localhost:3000 in your browser" -ForegroundColor Cyan