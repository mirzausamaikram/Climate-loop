import { NextRequest, NextResponse } from 'next/server'

// Building energy data API
// This would typically connect to a database, but we'll simulate it

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const buildingId = searchParams.get('buildingId')

  if (!buildingId) {
    return NextResponse.json(
      { success: false, error: 'Building ID required' },
      { status: 400 }
    )
  }

  try {
    // Simulate building data from database
    const buildingData = {
      id: buildingId,
      name: `Hong Kong Tower ${buildingId}`,
      total_floors: 45,
      total_apartments: 180,
      opt_in_count: 142,
      energy_savings: {
        monthly_kwh_saved: 45600,
        monthly_cost_saved: 88752, // HK$
        peak_reduction_percentage: 32,
        co2_reduction_kg: 22800,
      },
      average_apartment_savings: {
        monthly_cost: 312, // HK$
        monthly_credits: 87, // HK$
        total_benefit: 399, // HK$
      },
      top_performers: [
        { floor: 42, orientation: 'south', savings: 587 },
        { floor: 38, orientation: 'west', savings: 524 },
        { floor: 44, orientation: 'south', savings: 498 },
      ],
      last_updated: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: buildingData,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch building data' },
      { status: 500 }
    )
  }
}

// POST endpoint for updating building preferences
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { buildingId, optIn, preferredTimes } = body

    // Simulate saving to database
    // In production: await db.buildings.update({ ... })

    return NextResponse.json({
      success: true,
      message: 'Building preferences updated',
      data: {
        buildingId,
        optIn,
        preferredTimes,
        updated_at: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update building data' },
      { status: 500 }
    )
  }
}
