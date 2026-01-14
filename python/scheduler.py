"""
Climate Loop - Cooling Schedule Optimization Algorithm
Python microservice for calculating optimal cooling schedules
"""

from datetime import datetime, timedelta
from typing import List, Dict, Tuple
import json
from dataclasses import dataclass
from enum import Enum


class Orientation(Enum):
    NORTH = "north"
    SOUTH = "south"
    EAST = "east"
    WEST = "west"


@dataclass
class Apartment:
    id: str
    floor: int
    orientation: Orientation
    size: int  # square feet
    residents: int
    preferred_start_time: int  # 24h format (e.g., 19 for 7pm)


@dataclass
class WeatherData:
    temperature: float
    humidity: float
    forecast_high: float


@dataclass
class ElectricityRates:
    peak_hours: List[int]
    peak_rate: float
    off_peak_rate: float


@dataclass
class CoolingSchedule:
    apartment_id: str
    start_hour: int
    end_hour: int
    priority: int
    credits_earned: float
    estimated_cost: float


class SchedulingAlgorithm:
    """
    Core algorithm for optimizing building-wide cooling schedules
    Goal: Minimize peak load while maintaining resident comfort
    """
    
    def __init__(self):
        self.base_cooling_duration = 2  # hours
        self.max_delay_tolerance = 3  # max hours to delay from preference
        
    def calculate_thermal_disadvantage(self, apartment: Apartment) -> float:
        """
        Calculate thermal disadvantage score (0-100)
        Higher score = more disadvantaged = needs priority
        """
        score = 0.0
        
        # Floor factor (heat rises - upper floors are hotter)
        floor_factor = min(apartment.floor / 50.0, 1.0) * 40
        score += floor_factor
        
        # Orientation factor (south = hottest in Hong Kong)
        orientation_scores = {
            Orientation.SOUTH: 30,
            Orientation.WEST: 20,
            Orientation.EAST: 10,
            Orientation.NORTH: 0,
        }
        score += orientation_scores[apartment.orientation]
        
        # Size factor (larger = more cooling needed)
        size_factor = min((apartment.size - 300) / 1200, 1.0) * 15
        score += size_factor
        
        # Residents factor (more people = more heat generated)
        residents_factor = min(apartment.residents / 6.0, 1.0) * 15
        score += residents_factor
        
        return min(score, 100.0)
    
    def calculate_credits(
        self,
        apartment: Apartment,
        assigned_hour: int,
        preferred_hour: int,
        thermal_disadvantage: float,
        is_peak_hour: bool
    ) -> float:
        """
        Calculate energy credits earned for taking sub-optimal cooling slot
        """
        credits = 0.0
        
        # Credit for delaying from preference
        delay = abs(assigned_hour - preferred_hour)
        if delay > 0:
            credits += delay * 5.0  # HK$5 per hour delayed
        
        # Credit for high thermal disadvantage (reward those who need it most)
        if thermal_disadvantage > 60:
            credits += (thermal_disadvantage - 60) * 2.0
        
        # Penalty credit for cooling during peak hours
        if is_peak_hour:
            credits -= 10.0  # Cost more during peak
        else:
            credits += 15.0  # Reward for off-peak cooling
        
        return max(credits, 0.0)
    
    def optimize_schedule(
        self,
        apartments: List[Apartment],
        weather: WeatherData,
        electricity: ElectricityRates,
        optimization_window: Tuple[int, int] = (17, 23)  # 5pm-11pm
    ) -> List[CoolingSchedule]:
        """
        Main optimization algorithm
        Uses greedy approach with priority queue
        """
        schedules = []
        
        # Calculate thermal disadvantage for all apartments
        apartment_scores = [
            (apt, self.calculate_thermal_disadvantage(apt))
            for apt in apartments
        ]
        
        # Sort by thermal disadvantage (highest priority first)
        apartment_scores.sort(key=lambda x: x[1], reverse=True)
        
        # Track hourly load
        start_hour, end_hour = optimization_window
        hourly_capacity = {h: 0 for h in range(start_hour, end_hour + 1)}
        max_capacity_per_hour = len(apartments) // (end_hour - start_hour + 1) + 1
        
        # Assign cooling slots
        for apartment, thermal_score in apartment_scores:
            assigned_hour = self._find_best_slot(
                apartment,
                hourly_capacity,
                max_capacity_per_hour,
                optimization_window,
                electricity.peak_hours
            )
            
            if assigned_hour is not None:
                # Calculate credits
                is_peak = assigned_hour in electricity.peak_hours
                credits = self.calculate_credits(
                    apartment,
                    assigned_hour,
                    apartment.preferred_start_time,
                    thermal_score,
                    is_peak
                )
                
                # Calculate cost
                rate = electricity.peak_rate if is_peak else electricity.off_peak_rate
                estimated_cost = self._estimate_cooling_cost(apartment, rate, weather)
                
                schedule = CoolingSchedule(
                    apartment_id=apartment.id,
                    start_hour=assigned_hour,
                    end_hour=assigned_hour + self.base_cooling_duration,
                    priority=int(thermal_score),
                    credits_earned=round(credits, 2),
                    estimated_cost=round(estimated_cost, 2)
                )
                
                schedules.append(schedule)
                hourly_capacity[assigned_hour] += 1
        
        return schedules
    
    def _find_best_slot(
        self,
        apartment: Apartment,
        hourly_capacity: Dict[int, int],
        max_capacity: int,
        window: Tuple[int, int],
        peak_hours: List[int]
    ) -> int:
        """
        Find the best available cooling slot for apartment
        """
        preferred = apartment.preferred_start_time
        start_hour, end_hour = window
        
        # Try preferred time first
        if (start_hour <= preferred <= end_hour and 
            hourly_capacity[preferred] < max_capacity):
            return preferred
        
        # Try nearby times (within delay tolerance)
        for offset in range(1, self.max_delay_tolerance + 1):
            for candidate in [preferred - offset, preferred + offset]:
                if (start_hour <= candidate <= end_hour and
                    hourly_capacity[candidate] < max_capacity):
                    # Prefer off-peak if available
                    if candidate not in peak_hours:
                        return candidate
        
        # Find any available slot (prefer off-peak)
        available_slots = [
            h for h in range(start_hour, end_hour + 1)
            if hourly_capacity[h] < max_capacity
        ]
        
        # Sort by peak status (off-peak first)
        available_slots.sort(key=lambda h: (h in peak_hours, abs(h - preferred)))
        
        return available_slots[0] if available_slots else None
    
    def _estimate_cooling_cost(
        self,
        apartment: Apartment,
        rate: float,
        weather: WeatherData
    ) -> float:
        """
        Estimate cooling cost based on apartment characteristics and weather
        """
        # Base consumption (kWh) for 2 hours of cooling
        base_kwh = apartment.size / 100.0  # Rough estimate: 1 kWh per 100 sq ft per hour
        
        # Adjust for weather
        if weather.temperature > 32:
            base_kwh *= 1.3
        elif weather.temperature > 28:
            base_kwh *= 1.15
        
        # Adjust for humidity
        if weather.humidity > 85:
            base_kwh *= 1.1
        
        total_cost = base_kwh * self.base_cooling_duration * rate
        return total_cost


def optimize_building_schedule(request_data: Dict) -> Dict:
    """
    Main entry point for schedule optimization
    Input: JSON with apartments, weather, electricity data
    Output: Optimized cooling schedules
    """
    algorithm = SchedulingAlgorithm()
    
    # Parse input
    apartments = [
        Apartment(
            id=apt['id'],
            floor=apt['floor'],
            orientation=Orientation(apt['orientation']),
            size=apt['size'],
            residents=apt['residents'],
            preferred_start_time=apt.get('preferred_start_time', 19)
        )
        for apt in request_data['apartments']
    ]
    
    weather = WeatherData(
        temperature=request_data['weather']['temperature'],
        humidity=request_data['weather']['humidity'],
        forecast_high=request_data['weather'].get('forecast_high', 32)
    )
    
    electricity = ElectricityRates(
        peak_hours=request_data['electricity']['peak_hours'],
        peak_rate=request_data['electricity']['peak_rate'],
        off_peak_rate=request_data['electricity']['off_peak_rate']
    )
    
    # Optimize
    schedules = algorithm.optimize_schedule(apartments, weather, electricity)
    
    # Calculate aggregate metrics
    total_credits = sum(s.credits_earned for s in schedules)
    total_cost = sum(s.estimated_cost for s in schedules)
    avg_savings = total_credits / len(schedules) if schedules else 0
    
    # Calculate peak reduction
    peak_load_before = len([s for s in schedules if s.start_hour in electricity.peak_hours])
    peak_reduction_pct = (1 - peak_load_before / len(schedules)) * 100 if schedules else 0
    
    return {
        'success': True,
        'schedules': [
            {
                'apartment_id': s.apartment_id,
                'start_hour': s.start_hour,
                'end_hour': s.end_hour,
                'priority': s.priority,
                'credits_earned': s.credits_earned,
                'estimated_cost': s.estimated_cost
            }
            for s in schedules
        ],
        'metrics': {
            'total_apartments': len(apartments),
            'scheduled_apartments': len(schedules),
            'total_credits_distributed': round(total_credits, 2),
            'average_savings_per_apartment': round(avg_savings, 2),
            'estimated_total_cost': round(total_cost, 2),
            'peak_reduction_percentage': round(peak_reduction_pct, 2)
        }
    }


# Example usage
if __name__ == "__main__":
    # Sample data for testing
    sample_request = {
        'apartments': [
            {'id': 'A101', 'floor': 10, 'orientation': 'south', 'size': 600, 'residents': 3, 'preferred_start_time': 19},
            {'id': 'A201', 'floor': 20, 'orientation': 'north', 'size': 500, 'residents': 2, 'preferred_start_time': 19},
            {'id': 'A301', 'floor': 30, 'orientation': 'west', 'size': 700, 'residents': 4, 'preferred_start_time': 20},
            {'id': 'A401', 'floor': 40, 'orientation': 'south', 'size': 650, 'residents': 3, 'preferred_start_time': 19},
        ],
        'weather': {
            'temperature': 31.5,
            'humidity': 82,
            'forecast_high': 33
        },
        'electricity': {
            'peak_hours': [15, 16, 17, 18, 19, 20, 21, 22, 23],
            'peak_rate': 2.919,
            'off_peak_rate': 1.557
        }
    }
    
    result = optimize_building_schedule(sample_request)
    print(json.dumps(result, indent=2))
