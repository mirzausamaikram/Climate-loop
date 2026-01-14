"""
Test suite for the scheduling algorithm
Run with: pytest test_scheduler.py
"""

import pytest
from scheduler import (
    SchedulingAlgorithm, 
    Apartment, 
    WeatherData, 
    ElectricityRates,
    Orientation,
    optimize_building_schedule
)


def test_thermal_disadvantage_calculation():
    """Test thermal disadvantage scoring"""
    algo = SchedulingAlgorithm()
    
    # High thermal disadvantage: top floor, south-facing, large
    high_disadvantage = Apartment(
        id="A1",
        floor=45,
        orientation=Orientation.SOUTH,
        size=900,
        residents=4
    )
    score_high = algo.calculate_thermal_disadvantage(high_disadvantage)
    
    # Low thermal disadvantage: low floor, north-facing, small
    low_disadvantage = Apartment(
        id="A2",
        floor=5,
        orientation=Orientation.NORTH,
        size=400,
        residents=1
    )
    score_low = algo.calculate_thermal_disadvantage(low_disadvantage)
    
    assert score_high > score_low
    assert 0 <= score_low <= 100
    assert 0 <= score_high <= 100


def test_credits_calculation():
    """Test credit calculation logic"""
    algo = SchedulingAlgorithm()
    
    apartment = Apartment(
        id="A1",
        floor=30,
        orientation=Orientation.SOUTH,
        size=600,
        residents=3,
        preferred_start_time=19
    )
    
    # Test delayed time (should earn credits)
    credits_delayed = algo.calculate_credits(
        apartment=apartment,
        assigned_hour=21,  # 2 hours later
        preferred_hour=19,
        thermal_disadvantage=70,
        is_peak_hour=False
    )
    
    # Test preferred time
    credits_preferred = algo.calculate_credits(
        apartment=apartment,
        assigned_hour=19,
        preferred_hour=19,
        thermal_disadvantage=70,
        is_peak_hour=False
    )
    
    assert credits_delayed > credits_preferred


def test_schedule_optimization():
    """Test full schedule optimization"""
    apartments = [
        Apartment("A1", floor=40, orientation=Orientation.SOUTH, size=700, residents=3, preferred_start_time=19),
        Apartment("A2", floor=20, orientation=Orientation.NORTH, size=500, residents=2, preferred_start_time=19),
        Apartment("A3", floor=35, orientation=Orientation.WEST, size=650, residents=4, preferred_start_time=20),
        Apartment("A4", floor=10, orientation=Orientation.EAST, size=550, residents=2, preferred_start_time=19),
    ]
    
    weather = WeatherData(temperature=31.0, humidity=80, forecast_high=33)
    electricity = ElectricityRates(
        peak_hours=[19, 20, 21, 22],
        peak_rate=2.9,
        off_peak_rate=1.5
    )
    
    algo = SchedulingAlgorithm()
    schedules = algo.optimize_schedule(apartments, weather, electricity)
    
    # All apartments should get a schedule
    assert len(schedules) == len(apartments)
    
    # Schedules should have valid hours
    for schedule in schedules:
        assert 17 <= schedule.start_hour <= 23
        assert schedule.end_hour == schedule.start_hour + 2
        assert schedule.credits_earned >= 0


def test_api_integration():
    """Test the API wrapper function"""
    request_data = {
        'apartments': [
            {'id': 'A101', 'floor': 10, 'orientation': 'south', 'size': 600, 'residents': 3, 'preferred_start_time': 19},
            {'id': 'A201', 'floor': 20, 'orientation': 'north', 'size': 500, 'residents': 2, 'preferred_start_time': 19},
        ],
        'weather': {'temperature': 30, 'humidity': 75, 'forecast_high': 32},
        'electricity': {
            'peak_hours': [19, 20, 21, 22],
            'peak_rate': 2.9,
            'off_peak_rate': 1.5
        }
    }
    
    result = optimize_building_schedule(request_data)
    
    assert result['success'] is True
    assert 'schedules' in result
    assert 'metrics' in result
    assert len(result['schedules']) == 2


def test_peak_reduction():
    """Test that algorithm reduces peak hour load"""
    apartments = [
        Apartment(f"A{i}", floor=10+i*5, orientation=Orientation.SOUTH, 
                 size=600, residents=3, preferred_start_time=19)
        for i in range(10)
    ]
    
    weather = WeatherData(temperature=31.0, humidity=80, forecast_high=33)
    electricity = ElectricityRates(
        peak_hours=[19, 20, 21],
        peak_rate=2.9,
        off_peak_rate=1.5
    )
    
    algo = SchedulingAlgorithm()
    schedules = algo.optimize_schedule(apartments, weather, electricity)
    
    # Count how many schedules are in peak hours
    peak_count = sum(1 for s in schedules if s.start_hour in electricity.peak_hours)
    
    # Should distribute load, not all in peak hours
    assert peak_count < len(apartments)


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
