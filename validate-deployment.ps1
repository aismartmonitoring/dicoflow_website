# Pre-Deployment Validation Script
# Run this script before deploying to Azure

Write-Host "🔍 Medical Imaging Website - Pre-Deployment Validation" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# Check if we're in the correct directory
$currentDir = Get-Location
Write-Host "📂 Current Directory: $currentDir" -ForegroundColor Yellow

# Validation results
$validationResults = @()

# Function to add validation result
function Add-ValidationResult {
    param($Test, $Status, $Message)
    $validationResults += [PSCustomObject]@{
        Test = $Test
        Status = $Status
        Message = $Message
    }
}

Write-Host "`n🔧 Phase 1: Project Structure Validation" -ForegroundColor Green

# Check essential files
$essentialFiles = @(
    "package.json",
    "next.config.ts",
    "tsconfig.json",
    "tailwind.config.ts",
    "postcss.config.mjs",
    "web.config",
    "azure-pipelines.yml",
    ".github\workflows\azure-deploy.yml"
)

foreach ($file in $essentialFiles) {
    if (Test-Path $file) {
        Add-ValidationResult "File Check: $file" "✅ PASS" "File exists"
        Write-Host "  ✅ $file exists" -ForegroundColor Green
    } else {
        Add-ValidationResult "File Check: $file" "❌ FAIL" "File missing"
        Write-Host "  ❌ $file is missing!" -ForegroundColor Red
    }
}

# Check source directories
$sourceDirs = @(
    "src\app",
    "src\components",
    "src\lib",
    "public"
)

foreach ($dir in $sourceDirs) {
    if (Test-Path $dir) {
        Add-ValidationResult "Directory Check: $dir" "✅ PASS" "Directory exists"
        Write-Host "  ✅ $dir directory exists" -ForegroundColor Green
    } else {
        Add-ValidationResult "Directory Check: $dir" "❌ FAIL" "Directory missing"
        Write-Host "  ❌ $dir directory is missing!" -ForegroundColor Red
    }
}

Write-Host "`n🔧 Phase 2: Dependencies & Build Validation" -ForegroundColor Green

# Check if node_modules exists
if (Test-Path "node_modules") {
    Add-ValidationResult "Dependencies" "✅ PASS" "node_modules exists"
    Write-Host "  ✅ Dependencies installed" -ForegroundColor Green
} else {
    Add-ValidationResult "Dependencies" "⚠️ WARNING" "Run 'npm install' first"
    Write-Host "  ⚠️ Dependencies not installed. Run 'npm install'" -ForegroundColor Yellow
}

# Test build process
Write-Host "  🔨 Testing build process..." -ForegroundColor Yellow
try {
    $buildOutput = npm run build 2>&1
    if ($LASTEXITCODE -eq 0) {
        Add-ValidationResult "Build Process" "✅ PASS" "Build successful"
        Write-Host "  ✅ Build process successful" -ForegroundColor Green
    } else {
        Add-ValidationResult "Build Process" "❌ FAIL" "Build failed"
        Write-Host "  ❌ Build process failed!" -ForegroundColor Red
        Write-Host "  Build output: $buildOutput" -ForegroundColor Red
    }
} catch {
    Add-ValidationResult "Build Process" "❌ FAIL" "Build error: $_"
    Write-Host "  ❌ Build error: $_" -ForegroundColor Red
}

Write-Host "`n🔧 Phase 3: Azure Configuration Validation" -ForegroundColor Green

# Check Azure CLI
try {
    $azVersion = az --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Add-ValidationResult "Azure CLI" "✅ PASS" "Azure CLI installed"
        Write-Host "  ✅ Azure CLI is installed" -ForegroundColor Green
    } else {
        Add-ValidationResult "Azure CLI" "❌ FAIL" "Azure CLI not found"
        Write-Host "  ❌ Azure CLI not found!" -ForegroundColor Red
    }
} catch {
    Add-ValidationResult "Azure CLI" "❌ FAIL" "Azure CLI error"
    Write-Host "  ❌ Azure CLI error" -ForegroundColor Red
}

# Check Azure login status
try {
    $azAccount = az account show 2>&1
    if ($LASTEXITCODE -eq 0) {
        Add-ValidationResult "Azure Authentication" "✅ PASS" "Logged into Azure"
        Write-Host "  ✅ Logged into Azure" -ForegroundColor Green
    } else {
        Add-ValidationResult "Azure Authentication" "⚠️ WARNING" "Not logged into Azure"
        Write-Host "  ⚠️ Not logged into Azure. Run 'az login'" -ForegroundColor Yellow
    }
} catch {
    Add-ValidationResult "Azure Authentication" "⚠️ WARNING" "Run 'az login'"
    Write-Host "  ⚠️ Please run 'az login' to authenticate" -ForegroundColor Yellow
}

Write-Host "`n🔧 Phase 4: Content Validation" -ForegroundColor Green

# Check for medical images in public directory
$imageExtensions = @("*.jpg", "*.jpeg", "*.png", "*.svg", "*.webp")
$imageCount = 0
foreach ($ext in $imageExtensions) {
    $imageCount += (Get-ChildItem -Path "public" -Filter $ext -Recurse -ErrorAction SilentlyContinue).Count
}

if ($imageCount -gt 0) {
    Add-ValidationResult "Medical Images" "✅ PASS" "$imageCount images found"
    Write-Host "  ✅ Found $imageCount medical images" -ForegroundColor Green
} else {
    Add-ValidationResult "Medical Images" "⚠️ WARNING" "No images found in public directory"
    Write-Host "  ⚠️ No images found in public directory" -ForegroundColor Yellow
}

# Check API health endpoint
if (Test-Path "src\app\api\health\route.ts") {
    Add-ValidationResult "Health Endpoint" "✅ PASS" "Health API endpoint exists"
    Write-Host "  ✅ Health API endpoint configured" -ForegroundColor Green
} else {
    Add-ValidationResult "Health Endpoint" "❌ FAIL" "Health API endpoint missing"
    Write-Host "  ❌ Health API endpoint missing!" -ForegroundColor Red
}

Write-Host "`n🔧 Phase 5: Security & Performance Validation" -ForegroundColor Green

# Check for environment variables template
if (Test-Path ".env.example" -or Test-Path ".env.local" -or Test-Path ".env") {
    Add-ValidationResult "Environment Variables" "✅ PASS" "Environment configuration found"
    Write-Host "  ✅ Environment configuration found" -ForegroundColor Green
} else {
    Add-ValidationResult "Environment Variables" "⚠️ WARNING" "No environment file found"
    Write-Host "  ⚠️ Consider creating .env.example for environment variables" -ForegroundColor Yellow
}

# Check web.config for IIS optimization
if (Test-Path "web.config") {
    $webConfigContent = Get-Content "web.config" -Raw
    if ($webConfigContent -match "compression") {
        Add-ValidationResult "IIS Optimization" "✅ PASS" "Compression configured"
        Write-Host "  ✅ IIS compression configured" -ForegroundColor Green
    } else {
        Add-ValidationResult "IIS Optimization" "⚠️ WARNING" "Consider adding compression settings"
        Write-Host "  ⚠️ Consider adding compression settings to web.config" -ForegroundColor Yellow
    }
}

Write-Host "`n📊 Validation Summary" -ForegroundColor Cyan
Write-Host "===================" -ForegroundColor Cyan

$passCount = ($validationResults | Where-Object { $_.Status -like "*PASS*" }).Count
$warningCount = ($validationResults | Where-Object { $_.Status -like "*WARNING*" }).Count
$failCount = ($validationResults | Where-Object { $_.Status -like "*FAIL*" }).Count

Write-Host "✅ Passed: $passCount" -ForegroundColor Green
Write-Host "⚠️ Warnings: $warningCount" -ForegroundColor Yellow
Write-Host "❌ Failed: $failCount" -ForegroundColor Red

Write-Host "`n📋 Detailed Results:" -ForegroundColor White
$validationResults | Format-Table -AutoSize

if ($failCount -eq 0) {
    Write-Host "`n🎉 Ready for Azure Deployment!" -ForegroundColor Green
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Run the Azure deployment commands from the guide" -ForegroundColor White
    Write-Host "2. Monitor the deployment process" -ForegroundColor White
    Write-Host "3. Test the deployed application" -ForegroundColor White
} else {
    Write-Host "`n⚠️ Please fix the failed validations before deploying!" -ForegroundColor Red
}

Write-Host "`n🔗 Quick Links:" -ForegroundColor Cyan
Write-Host "- Deployment Guide: .\AZURE_DEPLOYMENT_GUIDE.md" -ForegroundColor White
Write-Host "- Azure Portal: https://portal.azure.com" -ForegroundColor White
Write-Host "- GitHub Actions: https://github.com/yourusername/yourrepo/actions" -ForegroundColor White