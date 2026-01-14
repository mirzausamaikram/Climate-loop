# Python Scheduling Algorithm Microservice

Backend service for Climate Loop's cooling schedule optimization.

## Setup

```bash
cd python
pip install -r requirements.txt
```

## Run Locally

```bash
python api.py
```

Server will start on http://localhost:5000

## API Endpoints

### POST /api/schedule/optimize
Optimize building-wide cooling schedule

**Request:**
```json
{
  "apartments": [
    {
      "id": "A101",
      "floor": 10,
      "orientation": "south",
      "size": 600,
      "residents": 3,
      "preferred_start_time": 19
    }
  ],
  "weather": {
    "temperature": 31.5,
    "humidity": 82
  },
  "electricity": {
    "peak_hours": [15, 16, 17, 18, 19, 20, 21, 22, 23],
    "peak_rate": 2.919,
    "off_peak_rate": 1.557
  }
}
```

**Response:**
```json
{
  "success": true,
  "schedules": [...],
  "metrics": {
    "peak_reduction_percentage": 32.5,
    "average_savings_per_apartment": 287
  }
}
```

### POST /api/schedule/estimate
Quick savings estimate

**Request:**
```json
{
  "floor": 20,
  "orientation": "south",
  "size": 600
}
```

## Deploy

Deploy to Railway, Heroku, or any Python hosting platform:

```bash
# Railway
railway up

# Heroku
heroku create climate-loop-scheduler
git push heroku main
```

## Algorithm Details

The scheduling algorithm uses:
- **Thermal disadvantage scoring** (floor + orientation + size)
- **Greedy optimization** with priority queue
- **Peak load distribution** to minimize grid strain
- **Fair credit allocation** based on cooling slot quality
