
from flask import Blueprint, request, jsonify
import random

risk_bp = Blueprint('risk', __name__)

@risk_bp.route('/predict-risk', methods=['POST'])
def predict_risk():
    data = request.get_json()
    risk_score = round(random.uniform(0.1, 0.95), 2)
    return jsonify({"risk_score": risk_score})
