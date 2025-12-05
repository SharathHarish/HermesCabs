# 🚀 Rydeon Deployment Guide

## Deploying to Netlify (Frontend)

### Prerequisites
- GitHub account
- Netlify account (free tier works)
- Your code pushed to GitHub

### Step 1: Prepare Frontend for Deployment

1. **Update API URLs for production**
   
   Create a `.env.local` file in the `frontend` folder:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```

2. **Build the frontend locally to test**
   ```bash
   cd frontend
   npm run build
   ```

### Step 2: Deploy to Netlify

#### Option A: Deploy via Netlify Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/rydeon.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and authorize Netlify
   - Select your repository

3. **Configure Build Settings**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/.next`
   - **Framework**: Next.js

4. **Add Environment Variables**
   - Go to Site settings → Environment variables
   - Add: `NEXT_PUBLIC_API_URL` = your backend URL

5. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete (2-5 minutes)
   - Your site will be live at `https://random-name.netlify.app`

#### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize and Deploy**
   ```bash
   cd frontend
   netlify init
   netlify deploy --prod
   ```

### Step 3: Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions

---

## Deploying Backend (Python FastAPI)

### Option 1: Deploy to Render (Recommended - Free Tier)

1. **Create `requirements.txt` in backend folder** (already exists)

2. **Create `render.yaml` in project root**
   ```yaml
   services:
     - type: web
       name: rydeon-backend
       env: python
       buildCommand: "cd backend && pip install -r requirements.txt"
       startCommand: "cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT"
       envVars:
         - key: DATABASE_URL
           sync: false
         - key: SECRET_KEY
           generateValue: true
   ```

3. **Push to GitHub**

4. **Deploy on Render**
   - Go to https://render.com
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the repository
   - Render will auto-detect settings from `render.yaml`
   - Add environment variables:
     - `DATABASE_URL`: Your database URL
     - `SECRET_KEY`: Auto-generated
   - Click "Create Web Service"

5. **Get your backend URL**
   - Copy the URL (e.g., `https://rydeon-backend.onrender.com`)
   - Update frontend environment variable

### Option 2: Deploy to Railway

1. **Go to https://railway.app**
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure:
   - Root directory: `backend`
   - Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables
6. Deploy

### Option 3: Deploy to Heroku

1. **Create `Procfile` in backend folder**
   ```
   web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```

2. **Create `runtime.txt` in backend folder**
   ```
   python-3.11.0
   ```

3. **Deploy**
   ```bash
   heroku login
   heroku create rydeon-backend
   git subtree push --prefix backend heroku main
   ```

---

## Database Setup for Production

### Option 1: Supabase (PostgreSQL - Free Tier)

1. Go to https://supabase.com
2. Create new project
3. Get connection string from Settings → Database
4. Update `DATABASE_URL` in backend environment variables

### Option 2: Keep SQLite (Simple)

- SQLite works fine for small projects
- Already configured in your app
- No additional setup needed

---

## Complete Deployment Checklist

### Frontend (Netlify)
- [ ] Code pushed to GitHub
- [ ] Netlify site created
- [ ] Build settings configured
- [ ] Environment variables added
- [ ] Site deployed successfully
- [ ] Custom domain configured (optional)

### Backend (Render/Railway/Heroku)
- [ ] Code pushed to GitHub
- [ ] Service created
- [ ] Environment variables configured
- [ ] Database connected
- [ ] Backend deployed successfully
- [ ] API accessible via HTTPS

### Final Steps
- [ ] Update frontend `NEXT_PUBLIC_API_URL` with backend URL
- [ ] Redeploy frontend with new API URL
- [ ] Test registration and login
- [ ] Test booking a ride
- [ ] Test all features

---

## Quick Deploy Commands

### Frontend to Netlify
```bash
cd frontend
npm run build
netlify deploy --prod
```

### Backend to Render
```bash
# Just push to GitHub, Render auto-deploys
git add .
git commit -m "Deploy to production"
git push origin main
```

---

## Environment Variables Summary

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Backend
```env
DATABASE_URL=sqlite:///./rydeon.db
# OR for PostgreSQL:
# DATABASE_URL=postgresql://user:password@host:5432/database
SECRET_KEY=your-secret-key-here
```

---

## Troubleshooting

### Build Fails on Netlify
- Check Node.js version in `package.json`
- Ensure all dependencies are in `package.json`
- Check build logs for specific errors

### Backend Not Responding
- Check environment variables are set
- Verify database connection
- Check backend logs
- Ensure CORS is configured for your frontend domain

### Database Connection Issues
- Verify DATABASE_URL format
- Check database is accessible from backend host
- Ensure database credentials are correct

---

## Cost Estimate

### Free Tier (Recommended for Testing)
- **Netlify**: Free (100GB bandwidth/month)
- **Render**: Free (750 hours/month)
- **Supabase**: Free (500MB database)
- **Total**: $0/month

### Paid Tier (For Production)
- **Netlify Pro**: $19/month
- **Render Starter**: $7/month
- **Supabase Pro**: $25/month
- **Total**: ~$51/month

---

## Support

If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints directly
4. Check CORS configuration

---

**Your Rydeon app is ready for the world! 🚗✨**
