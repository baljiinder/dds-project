
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict-risk', methods=['POST'])
def predict_risk():
    return jsonify({"score": 73})

@app.route('/classify-incident', methods=['POST'])
def classify_incident():
    return jsonify({"tag": "Data Breach"})

@app.route('/check-compliance', methods=['POST'])
def check_compliance():
    return jsonify({"tags": ["ISO/IEC 27001", "ISO 22301", "NIST CSF"]})

@app.route('/suggest-resolution', methods=['POST'])
def suggest_resolution():
    return jsonify({"resolution": "Notify affected users, isolate compromised systems, and conduct a root cause analysis."})

@app.route('/chatbot-reply', methods=['POST'])
def chatbot_reply():
    query = request.json.get("query", "").lower()
    if "data" in query:
        response = "Ensure regular backups and restrict data access based on roles."
    elif "risk" in query:
        response = "Risk levels are calculated based on incident severity, frequency, and category."
    else:
        response = "Please clarify your query. I can help with incidents, risks, or compliance questions."
    return jsonify({"reply": response})

if __name__ == '__main__':
    app.run(port=8000, debug=True)
