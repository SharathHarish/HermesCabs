# 🚀 Quick Deployment Guide - Render + Vercel

## Step 1: Deploy Backend on Render (5 minutes)

1. **Go to Render**: https://render.com
2. **Sign up/Login** with GitHub
3. Click **"New +"** → **"Web Service"**
4. **Connect your GitHub** and select the **Rydeon** repository
5. Render will auto-detect the `render.yaml` file
6. Click **"Apply"** or configure manually:
   - **Name**: `rydeon-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

7. **Environment Variables** (auto-set from render.yaml):
   - `DATABASE_URL`: `sqlite:///./rydeon.db`
   - `SECRET_KEY`: (auto-generated)
   - `PYTHON_VERSION`: `3.11.0`

8. Click **"Create Web Service"**
9. Wait 3-5 minutes for deployment
10. **Copy your backend URL**: `https://rydeon-backend.onrender.com`

---

## Step 2: Deploy Frontend on Vercel (3 minutes)

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Login** with GitHub
3. Click **"Add New"** → **"Project"**
4. **Import** your **Rydeon** repository
5. Configure:
   - **Project Name**: `rydeon` (or any name you like)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

6. **Add Environment Variable**:
   - Click **"Environment Variables"**
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://rydeon-backend.onrender.com` (your Render URL from Step 1)

7. Click **"Deploy"**
8. Wait 2-3 minutes
9. Your app will be live at: `https://rydeon.vercel.app` (or custom URL)

---

## Step 3: Update Backend CORS (Important!)

After both are deployed, update the backend to allow your frontend domain:

1. Go to your Render dashboard
2. Click on **rydeon-backend**
3. Go to **Environment** tab
4. Add new environment variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://rydeon.vercel.app` (your Vercel URL)

5. Update `backend/app/main.py` CORS settings (I'll help with this)

---

## ✅ Deployment Checklist

### Backend (Render)
- [ ] Render account created
- [ ] Repository connected
- [ ] Web service created
- [ ] Environment variables set
- [ ] Backend deployed successfully
- [ ] Backend URL copied

### Frontend (Vercel)
- [ ] Vercel account created
- [ ] Repository connected
- [ ] Project created
- [ ] `NEXT_PUBLIC_API_URL` environment variable set
- [ ] Frontend deployed successfully
- [ ] Frontend URL copied

### Testing
- [ ] Visit your frontend URL
- [ ] Test user registration
- [ ] Test user login
- [ ] Test booking a ride
- [ ] All features working

---

## 🔧 Troubleshooting

### Backend Issues
- **Build fails**: Check Python version and requirements.txt
- **App crashes**: Check logs in Render dashboard
- **Database errors**: Verify DATABASE_URL is set correctly

### Frontend Issues
- **Build fails**: Check Node.js version in package.json
- **API errors**: Verify NEXT_PUBLIC_API_URL is correct
- **CORS errors**: Update backend CORS settings

### Common Issues
- **500 errors**: Check backend logs
- **404 errors**: Verify API endpoints
- **CORS errors**: Update allowed origins in backend

---

## 📝 Important Notes

1. **Free Tier Limitations**:
   - Render: Backend may sleep after 15 min of inactivity (takes 30s to wake up)
   - Vercel: 100GB bandwidth/month

2. **Database**:
   - SQLite works on Render (persistent storage)
   - Data persists between deployments

3. **Updates**:
   - Push to GitHub → Auto-deploys on both platforms
   - Or manually trigger deployment in dashboard

---

## 🎉 You're Done!

Your Rydeon app is now live:
- **Frontend**: https://rydeon.vercel.app
- **Backend**: https://rydeon-backend.onrender.com

Share your app with the world! 🚗✨
