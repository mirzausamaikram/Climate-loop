"""
Flask API wrapper for the scheduling algorithm
Exposes the Python algorithm as a REST API for Next.js to call
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from scheduler import optimize_building_schedule
import os

app = Flask(__name__)
CORS(app)  # Allow Next.js to call this API


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'Climate Loop Scheduler',
        'version': '1.0.0'
    })


@app.route('/api/schedule/optimize', methods=['POST'])
def optimize():
    """
    Optimize cooling schedule for a building
    
    Request body:
    {
        "apartments": [...],
        "weather": {...},
        "electricity": {...}
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': 'No data provided'
            }), 400
        
        # Validate required fields
        required_fields = ['apartments', 'weather', 'electricity']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400
        
        # Run optimization
        result = optimize_building_schedule(data)
        
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/schedule/estimate', methods=['POST'])
def estimate_savings():
    """
    Quick estimate of potential savings without full optimization
    """
    try:
        data = request.get_json()
        
        floor = data.get('floor', 20)
        orientation = data.get('orientation', 'south')
        size = data.get('size', 600)
        
        # Simple estimation formula
        base_savings = 200
        
        floor_factor = min(floor / 50.0, 1.0) * 100
        
        orientation_multiplier = {
            'south': 1.4,
            'west': 1.2,
            'east': 1.0,
            'north': 0.8
        }.get(orientation, 1.0)
        
        size_factor = size / 600
        
        monthly_savings = int(base_savings * (1 + floor_factor / 100) * orientation_multiplier * size_factor)
        credits = int(monthly_savings * 0.3)
        
        return jsonify({
            'success': True,
            'estimate': {
                'monthly_savings': monthly_savings,
                'credits_earned': credits,
                'total_benefit': monthly_savings + credits,
                'yearly_benefit': (monthly_savings + credits) * 12
            }
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
