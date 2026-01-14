# 🚀 Quick Start Guide - Climate Loop

## Prerequisites
- Node.js 18+ installed
- Python 3.9+ installed (optional, for backend)
- Git installed

## 1. Clone & Install (5 minutes)

```bash
# Clone the repository
git clone https://github.com/yourusername/climate-loop.git
cd climate-loop

# Install dependencies
npm install
```

## 2. Run Development Server (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

## 3. Optional: Python Backend (5 minutes)

```bash
cd python
pip install -r requirements.txt
python api.py
```

Backend runs on [http://localhost:5000](http://localhost:5000)

## What You'll See

### ✨ Main Features

1. **Hero Section** - Animated gradient background with value proposition
2. **Live Data Banner** - Real-time HK weather & electricity rates
3. **Problem Section** - Hong Kong's energy waste visualized
4. **Solution Section** - Climate Loop's approach explained
5. **3D Thermal Visualization** - Interactive building model with Three.js
   - Drag to rotate
   - Scroll to zoom
   - Watch heat particles rise
6. **Savings Calculator** - Try it yourself!
   - Adjust floor number
   - Select orientation
   - Set apartment size
   - See instant savings
7. **Live API Demo** - Click buttons to test APIs
8. **Tech Stack** - Full technical breakdown
9. **Business Case** - Impact metrics & monetization

## Making Changes

### Update Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  'hk-red': '#DC143C',
  'thermal-hot': '#FF6B6B',  // ← Change here
  'thermal-cool': '#4ECDC4', // ← And here
}
```

### Add New Section
1. Create component in `src/components/NewSection.tsx`
2. Import in `src/app/page.tsx`
3. Add to main layout

### Modify Algorithm
Edit `python/scheduler.py` - The `calculate_thermal_disadvantage()` function

## Testing

```bash
# Frontend (Next.js)
npm run build
npm start

# Backend (Python)
cd python
pytest test_scheduler.py -v
```

## Deploy

### Vercel (Frontend)
```bash
npm install -g vercel
vercel
```

### Railway (Backend)
1. Go to [railway.app](https://railway.app)
2. Connect GitHub
3. Select `python` directory
4. Deploy!

## Common Issues

### Three.js not loading?
- Clear browser cache
- Check browser console for errors
- Try a different browser (Chrome recommended)

### APIs returning errors?
- They're using mock data by default
- To use real APIs, add API keys in `.env.local`

### Python dependencies failing?
```bash
# Try upgrading pip first
pip install --upgrade pip
pip install -r requirements.txt
```

## Next Steps

1. ✅ Check out [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for full details
2. ✅ Read [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
3. ✅ Customize for your portfolio needs
4. ✅ Deploy and share!

## Need Help?

- 📖 Check the [README.md](README.md)
- 💻 Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- 🚀 See [DEPLOYMENT.md](DEPLOYMENT.md)

---

**You're all set!** Now customize and make it yours 🎨
