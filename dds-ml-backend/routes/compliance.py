
from flask import Blueprint, request, jsonify

compliance_bp = Blueprint('compliance', __name__)

@compliance_bp.route('/check-compliance', methods=['POST'])
def check_compliance():
    sample = request.get_json()
    matches = ["ISO 27001 - Access Control", "ISO 45001 - Emergency Response"]
    return jsonify({"iso_matches": matches})
