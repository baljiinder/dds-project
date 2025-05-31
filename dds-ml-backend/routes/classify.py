
from flask import Blueprint, request, jsonify
import random

classify_bp = Blueprint('classify', __name__)

TAGS = ["Cyber", "Physical Threat", "Harassment", "Medical", "Equipment Failure"]

@classify_bp.route('/classify-incident', methods=['POST'])
def classify_incident():
    description = request.json.get("description", "")
    tag = random.choice(TAGS)
    return jsonify({"predicted_tag": tag})
