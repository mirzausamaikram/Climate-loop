import { NextResponse } from 'next/server'
import type { HKOWeatherData } from '@/types'

// Hong Kong Observatory API simulation
// In production, replace with actual HKO API: https://data.weather.gov.hk/weatherAPI/doc/

export async function GET() {
  try {
    // Simulate HK Observatory data
    // Real API would be: https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread
    
    const mockWeatherData: HKOWeatherData = {
      temperature: 28 + Math.random() * 4, // 28-32°C (typical HK summer)
      humidity: 70 + Math.random() * 20, // 70-90%
      forecast: generateForecast(7),
    }

    return NextResponse.json({
      success: true,
      data: mockWeatherData,
      source: 'HK Observatory',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}

function generateForecast(days: number) {
  const forecast = []
  const today = new Date()

  for (let i = 0; i < days; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)

    // Hong Kong typical summer temperatures
    const baseTempHigh = 30 + Math.random() * 4
    const baseTempLow = 26 + Math.random() * 2

    forecast.push({
      date: date.toISOString().split('T')[0],
      temp_high: Math.round(baseTempHigh * 10) / 10,
      temp_low: Math.round(baseTempLow * 10) / 10,
      humidity_high: 85 + Math.random() * 10,
      humidity_low: 65 + Math.random() * 10,
    })
  }

  return forecast
}

// Alternative: Real HKO API integration (uncomment when ready)
/*
export async function GET() {
  try {
    const response = await fetch(
      'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread',
      { next: { revalidate: 300 } } // Cache for 5 minutes
    )
    
    if (!response.ok) throw new Error('HKO API failed')
    
    const data = await response.json()
    
    // Transform HKO data to our format
    const weatherData: HKOWeatherData = {
      temperature: data.temperature?.data?.[0]?.value || 28,
      humidity: data.humidity?.data?.[0]?.value || 80,
      forecast: [], // Parse forecast data
    }
    
    return NextResponse.json({
      success: true,
      data: weatherData,
      source: 'HK Observatory (Live)',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}
*/
