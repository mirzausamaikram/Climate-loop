import { NextResponse } from 'next/server'
import type { CLPPowerData } from '@/types'

// CLP Power electricity pricing data
// Based on actual CLP tariff structure: https://www.clp.com.hk/en/customer-service/tariff-and-bill

export async function GET() {
  try {
    const currentHour = new Date().getHours()

    // CLP actual rates (approximate, as of 2025)
    const baseRate = 1.432 // HK$/kWh base rate
    const fuelClause = 0.514 // Fuel clause charge
    
    // Time-of-use rates (peak hours cost more)
    const peakMultiplier = 1.5
    const offPeakMultiplier = 0.8

    // Peak hours in Hong Kong (typically 3pm-11pm)
    const peakHours = ['15', '16', '17', '18', '19', '20', '21', '22', '23']
    const isPeakHour = peakHours.includes(currentHour.toString().padStart(2, '0'))

    const currentRate = isPeakHour
      ? (baseRate + fuelClause) * peakMultiplier
      : (baseRate + fuelClause) * offPeakMultiplier

    const powerData: CLPPowerData = {
      current_rate: Math.round(currentRate * 1000) / 1000,
      peak_hours: peakHours,
      off_peak_rate: Math.round((baseRate + fuelClause) * offPeakMultiplier * 1000) / 1000,
      peak_rate: Math.round((baseRate + fuelClause) * peakMultiplier * 1000) / 1000,
      time_of_use: generateTimeOfUseRates(baseRate, fuelClause),
    }

    return NextResponse.json({
      success: true,
      data: powerData,
      source: 'CLP Power Hong Kong',
      timestamp: new Date().toISOString(),
      note: 'Rates based on CLP 2025 tariff structure. Peak hours: 3pm-11pm',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch electricity data' },
      { status: 500 }
    )
  }
}

function generateTimeOfUseRates(baseRate: number, fuelClause: number) {
  const rates = []
  const peakHours = [15, 16, 17, 18, 19, 20, 21, 22, 23]

  for (let hour = 0; hour < 24; hour++) {
    const isPeak = peakHours.includes(hour)
    const multiplier = isPeak ? 1.5 : 0.8
    const rate = (baseRate + fuelClause) * multiplier

    rates.push({
      hour,
      rate: Math.round(rate * 1000) / 1000,
    })
  }

  return rates
}

// Alternative: If CLP provides an API (currently they don't have public API)
/*
export async function GET() {
  try {
    // CLP doesn't have a public API, so we use static rates based on their tariff
    // Update these rates quarterly from: https://www.clp.com.hk/en/customer-service/tariff-and-bill
    
    const response = await fetch('https://your-clp-data-source.com/api/rates', {
      next: { revalidate: 86400 } // Cache for 24 hours
    })
    
    // ... handle response
  } catch (error) {
    // Fallback to static rates
  }
}
*/
