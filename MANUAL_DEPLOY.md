# 📋 Manual Deployment - Quick Reference

## RENDER (Backend) - Exact Settings

### Basic Settings
```
Service Name: rydeon-backend
Region: Oregon (US West)
Branch: main
Root Directory: backend
```

### Build Settings
```
Runtime: Python 3
Build Command: pip install -r requirements.txt
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### Environment Variables
```
DATABASE_URL = sqlite:///./rydeon.db
SECRET_KEY = rydeon-secret-key-change-this-12345
PYTHON_VERSION = 3.11.0
```

### Instance Type
```
Free
```

---

## VERCEL (Frontend) - Exact Settings

### Basic Settings
```
Project Name: rydeon
Framework Preset: Next.js
Root Directory: frontend
Branch: main
```

### Build Settings
```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

### Environment Variables
```
NEXT_PUBLIC_API_URL = https://rydeon-backend.onrender.com
(Replace with your actual Render URL after backend deployment)
```

### Node.js Version
```
18.x (default)
```

---

## 🎯 Deployment Order

1. **Deploy Backend First** (Render)
   - Get the backend URL
   - Example: `https://rydeon-backend.onrender.com`

2. **Deploy Frontend Second** (Vercel)
   - Use backend URL in `NEXT_PUBLIC_API_URL`

3. **Test Your App**
   - Visit your Vercel URL
   - Try registering a user
   - Try booking a ride

---

## 🔍 Verification Steps

### Backend (Render)
1. Go to your backend URL: `https://rydeon-backend.onrender.com`
2. You should see: `{"message": "Cab Booking API is running 🚀"}`
3. Test API endpoint: `https://rydeon-backend.onrender.com/docs`

### Frontend (Vercel)
1. Go to your frontend URL: `https://rydeon.vercel.app`
2. You should see the Rydeon homepage
3. Try clicking "Login" or "Register"

---

## ⚠️ Common Issues

### Render Issues
- **Build fails**: Check if `requirements.txt` exists in backend folder
- **App crashes**: Check logs in Render dashboard
- **Port error**: Make sure start command uses `$PORT` variable

### Vercel Issues
- **Build fails**: Check if `package.json` exists in frontend folder
- **API not working**: Verify `NEXT_PUBLIC_API_URL` is set correctly
- **404 errors**: Make sure Root Directory is set to `frontend`

### CORS Issues
- If you get CORS errors, the backend CORS is already configured to allow all origins
- For production, update `backend/app/main.py` with your specific Vercel URL

---

## 📝 After Deployment Checklist

- [ ] Backend deployed on Render
- [ ] Backend URL copied
- [ ] Frontend deployed on Vercel
- [ ] `NEXT_PUBLIC_API_URL` set in Vercel
- [ ] Backend health check works
- [ ] Frontend loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Ride booking works

---

## 🚀 Your URLs

After deployment, save these:

```
Backend (Render): https://rydeon-backend.onrender.com
Frontend (Vercel): https://rydeon.vercel.app
API Docs: https://rydeon-backend.onrender.com/docs
```

---

## 🔄 Redeployment

To redeploy after making changes:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

2. **Auto-deploys**:
   - Render: Auto-deploys on push
   - Vercel: Auto-deploys on push

3. **Manual redeploy**:
   - Render: Click "Manual Deploy" → "Deploy latest commit"
   - Vercel: Click "Deployments" → "Redeploy"

---

## 💡 Tips

1. **First deployment takes longer** (5-10 minutes)
2. **Subsequent deployments are faster** (2-3 minutes)
3. **Free tier limitations**:
   - Render: Backend sleeps after 15 min inactivity
   - Vercel: 100GB bandwidth/month
4. **Check logs** if something doesn't work
5. **Use the `/docs` endpoint** to test backend API

---

Good luck with your deployment! 🎉
