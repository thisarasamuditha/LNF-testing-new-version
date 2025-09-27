# 🚀 Vercel Deployment Guide for Lost & Found Frontend

## 📋 Prerequisites

1. ✅ Push your code to GitHub
2. ✅ Have a Vercel account (sign up at [vercel.com](https://vercel.com))
3. ✅ Your Railway backend is running at: `https://lostfound-production-ef57.up.railway.app`

## 🔧 Step-by-Step Deployment

### Step 1: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub
2. **Click "New Project"**
3. **Import your repository** - select your `LNF_frontend` repository
4. **Configure Project Settings:**
   - Framework Preset: **Vite** (should auto-detect)
   - Root Directory: **/** (leave default)
   - Build Command: `npm run build:client`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Step 2: Set Environment Variables

In the Vercel dashboard, add these environment variables:

#### Required Environment Variables:

```
VITE_API_URL = https://lostfound-production-ef57.up.railway.app
```

#### Optional Environment Variables:

```
VITE_PUBLIC_BUILDER_KEY = __BUILDER_PUBLIC_KEY__
PING_MESSAGE = ping pong
```

### Step 3: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 1-2 minutes)
3. Get your live URL (e.g., `https://your-app-name.vercel.app`)

## ⚙️ Environment Variables Setup in Vercel Dashboard

### Method 1: During Initial Deployment

1. On the "Configure Project" page
2. Click "Environment Variables"
3. Add each variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://lostfound-production-ef57.up.railway.app`
   - **Environment:** Production (and Preview if needed)

### Method 2: After Deployment

1. Go to your project dashboard
2. Click **"Settings"** tab
3. Click **"Environment Variables"** in sidebar
4. Click **"Add New"**
5. Add the variables listed above

## 🔍 Verification Steps

After deployment, verify everything works:

### 1. Check API Connection

- Open browser dev tools (F12)
- Go to Console tab
- Look for API URL logs: `API_ENDPOINTS.ITEMS: https://lostfound-production-ef57.up.railway.app/api/items`

### 2. Test Features

- ✅ Home page loads
- ✅ Sign up/Sign in works
- ✅ Report lost/found items works
- ✅ Items display correctly

### 3. Check Network Tab

- Open dev tools > Network tab
- Look for API calls to your Railway backend
- Verify no CORS errors

## 🛠️ Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify build command: `npm run build:client`

### API Not Working

- Verify `VITE_API_URL` environment variable is set correctly
- Check Railway backend is running
- Look for CORS errors in browser console

### Environment Variables Not Loading

- Ensure variables have `VITE_` prefix
- Redeploy after adding environment variables
- Check case sensitivity

### CORS Issues

Your Railway backend needs to allow requests from your Vercel domain. If you get CORS errors, update your backend CORS configuration to include your Vercel URL.

## 📱 Custom Domain (Optional)

After successful deployment:

1. Go to project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## 🔄 Automatic Deployments

Vercel automatically redeploys when you push to your main branch. To disable:

1. Project Settings > Git
2. Configure deployment branches

## 🎉 You're Live!

Your Lost & Found application is now live at:
`https://your-project-name.vercel.app`

Share the URL and start helping people find their lost items! 🔍✨
