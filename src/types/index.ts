// Hong Kong Observatory Weather Data Types
export interface HKOWeatherData {
  temperature: number
  humidity: number
  forecast: {
    date: string
    temp_high: number
    temp_low: number
    humidity_high: number
    humidity_low: number
  }[]
}

// CLP Power Electricity Pricing Types
export interface CLPPowerData {
  current_rate: number // HK$/kWh
  peak_hours: string[]
  off_peak_rate: number
  peak_rate: number
  time_of_use: {
    hour: number
    rate: number
  }[]
}

// Building Data Types
export interface ApartmentProfile {
  id: string
  floor: number
  orientation: 'north' | 'south' | 'east' | 'west'
  size: number // sq ft
  residents: number
  thermal_disadvantage: number // percentage
}

export interface CoolingSchedule {
  apartment_id: string
  start_time: string // 24h format "19:00"
  end_time: string
  priority: number
  credits_earned: number
}

export interface BuildingData {
  id: string
  name: string
  total_floors: number
  apartments: ApartmentProfile[]
  energy_savings: {
    monthly_kwh_saved: number
    monthly_cost_saved: number
    peak_reduction_percentage: number
  }
}

// Scheduling Algorithm Types
export interface SchedulingRequest {
  building_id: string
  date: string
  weather_forecast: HKOWeatherData
  electricity_rates: CLPPowerData
  opt_in_apartments: string[]
}

export interface SchedulingResponse {
  schedules: CoolingSchedule[]
  estimated_savings: number
  peak_reduction: number
  credits_distribution: {
    apartment_id: string
    credits: number
  }[]
}
