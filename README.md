# Climate Loop

**Vertical Energy Coordination Platform for Hong Kong High-Rises**

Turn wasted thermal energy into 25-40% savings by coordinating cooling schedules across buildings.

## 🚀 The Problem

Hong Kong buildings waste **HK$4.2 billion** annually because:
- Everyone turns on AC at 7pm → massive peak loads → 3x higher electricity costs
- Heat rises from lower floors, making upper floors hotter
- South-facing units pay 40% more than north-facing units
- No coordination, no optimization

## 💡 The Solution

Climate Loop coordinates cooling schedules within buildings to:
- **Reduce peak demand by 25-40%**
- **Save residents HK$200-400/month**
- Create fair energy distribution through staggered cooling
- Provide property managers with automated energy reporting

## 🛠 Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript** (Strict mode)
- **Tailwind CSS** (Custom thermal color palette)
- **Three.js** (3D thermal visualization)
- **Framer Motion** (Animations)

### Backend
- **Next.js API Routes**
- **Python** (ML models for prediction)
- **PostgreSQL** with Prisma ORM
- **WebSockets** (Real-time updates)

### AI/ML
- Time series forecasting for temperature prediction
- Graph neural networks for thermal flow modeling
- Energy matching algorithm (modified stock exchange algorithm)

## 📦 Installation

```bash
# Install frontend dependencies
npm install

# Install Python backend dependencies
cd python
pip install -r requirements.txt
cd ..
```

## 🚀 Running the Project

### Frontend (Next.js)
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

### Backend (Python Scheduler)
```bash
cd python
python api.py
```
API runs on [http://localhost:5000](http://localhost:5000)

### Run Tests
```bash
cd python
pytest test_scheduler.py -v
```

## 🎨 Key Features

### 1. Interactive Savings Calculator
- Real-time calculations based on floor, orientation, apartment size
- Shows monthly savings + energy credits earned
- Hong Kong-specific electricity rates

### 2. Thermal Flow Visualization
- 3D building model showing heat distribution
- Animated thermal gradients
- Floor-by-floor waste percentage

### 3. Technical Showcase
- Real-time matching engine architecture
- WebGL thermal simulation
- Production-ready system design

### 4. Business Case Study
- City-wide impact metrics
- Monetization strategy (SaaS + transaction fees + carbon credits)
- ROI calculations

## 🎯 Portfolio Highlights

This project demonstrates:
- ✅ Full-stack development (Next.js + TypeScript)
- ✅ Complex UI/UX (interactive calculators, 3D visualizations)
- ✅ Real-world problem solving (Hong Kong energy crisis)
- ✅ Business acumen (multiple revenue streams)
- ✅ System design (real-time coordination algorithms)
- ✅ Market insight (Hong Kong-specific physics and economics)

## 📊 Impact Metrics

If adopted across all Hong Kong high-rises:
- **15%** city electricity demand reduction
- **HK$4.2B** annual savings for residents
- **1.8M tons** CO₂ reduction per year

## 🏗 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles + Tailwind
├── components/
│   ├── Hero.tsx            # Hero section with value prop
│   ├── Problem.tsx         # Hong Kong energy problems
│   ├── Solution.tsx        # Climate Loop solution
│   ├── ThermalVisualization.tsx  # 3D thermal model
│   ├── SavingsCalculator.tsx     # Interactive calculator
│   ├── TechStack.tsx       # Technical architecture
│   ├── CaseStudy.tsx       # Business impact & monetization
│   └── Contact.tsx         # Contact section
```

## 🌐 Deployment

Deploy to Vercel with one click:

```bash
vercel deploy
```

Or deploy to any platform supporting Next.js 14.

## 📝 License

MIT License - Built as a portfolio project

## 👨‍💻 Author

Built to showcase full-stack development skills and Hong Kong market insight.

---

**Note**: This is a portfolio demonstration project. The savings calculations and impact metrics are based on research and reasonable estimates for Hong Kong's building energy consumption patterns.
