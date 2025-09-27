# 🚨 Vercel Deployment Troubleshooting

## 🔧 **Fixed Issues:**

### ✅ **Output Directory Issue - FIXED**

- **Problem**: Build outputs to `dist/spa/` but Vercel was looking in `dist/`
- **Solution**: Updated `vercel.json` to use `"outputDirectory": "dist/spa"`

## 📋 **Common Vercel Errors & Solutions:**

### 1. **BUILD FAILED (Most Common)**

```
DEPLOYMENT_BLOCKED (403) or BUILD_FAILED
```

**Solutions:**

- ✅ **Build Command**: Use `npm run build:client` (not `npm run build`)
- ✅ **Output Directory**: `dist/spa` (not `dist`)
- ✅ **Node Version**: Ensure compatibility (Vercel uses Node 18+ by default)

### 2. **FUNCTION_INVOCATION_FAILED (500)**

```
FUNCTION_INVOCATION_FAILED or NO_RESPONSE_FROM_FUNCTION
```

**Solutions:**

- This is a frontend-only app, no serverless functions needed
- Remove any server-side code from deployment

### 3. **NOT_FOUND (404)**

```
DEPLOYMENT_NOT_FOUND or RESOURCE_NOT_FOUND
```

**Solutions:**

- ✅ **SPA Routing**: Added `rewrites` in `vercel.json` for React Router
- ✅ **File Paths**: Check all asset paths are relative

### 4. **Environment Variables Not Working**

```
API calls failing, undefined variables
```

**Solutions:**

- ✅ **Prefix**: Use `VITE_API_URL` (not `REACT_APP_`)
- ✅ **Set in Vercel**: Add to project settings → Environment Variables
- ✅ **Redeploy**: After adding env vars, trigger new deployment

## 🚀 **Step-by-Step Deployment (Updated):**

### 1. **Prepare Files**

```bash
# Make sure these files are correct:
# - vercel.json (updated with correct outputDirectory)
# - .env (using VITE_API_URL)
# - package.json (has build:client script)
```

### 2. **Push to GitHub**

```bash
git add .
git commit -m "Fix Vercel deployment configuration"
git push origin main
```

### 3. **Deploy to Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. **Configure Project:**
   - Framework: **Vite**
   - Build Command: `npm run build:client`
   - Output Directory: `dist/spa`
   - Install Command: `npm install`

### 4. **Set Environment Variables**

In Vercel dashboard:

```
VITE_API_URL = https://lostfound-production-ef57.up.railway.app
```

### 5. **Deploy & Test**

- Click "Deploy"
- Wait for build completion
- Test the live URL

## 🔍 **Debugging Steps:**

### Check Build Logs

1. Go to Vercel dashboard
2. Click on your deployment
3. Check "Function Logs" or "Build Logs"
4. Look for specific error messages

### Test Locally First

```bash
# Test the exact build command Vercel uses
npm run build:client

# Check the output
ls -la dist/spa/

# Serve locally to test
npx serve dist/spa
```

### Verify Environment Variables

```bash
# In browser console after deployment:
console.log(import.meta.env.VITE_API_URL)
```

## 🆘 **If Still Failing:**

### Check These Common Issues:

1. **Node Version**: Add `.nvmrc` file with `18` or `20`
2. **Dependencies**: Run `npm install` locally to check for errors
3. **Import Paths**: Ensure all imports use correct case-sensitive paths
4. **Asset Paths**: Check images/fonts use relative paths

### Create `.nvmrc` (if needed):

```bash
echo "18" > .nvmrc
```

### Alternative Deployment Method:

If still having issues, try deploying via Vercel CLI:

```bash
npm i -g vercel
vercel --prod
```

## 📞 **Get Help:**

1. Check Vercel dashboard deployment logs
2. Copy exact error message
3. Check this troubleshooting guide
4. Contact Vercel support if platform error

Your deployment should now work! 🎉
