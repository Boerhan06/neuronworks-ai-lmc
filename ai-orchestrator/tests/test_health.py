from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "ai-lmc-worker"
    assert data["zero_data_egress"] is True

def test_generate_pipeline():
    payload = {
        "document_id": "doc-001",
        "document_title": "SOP_Keamanan_Data.pdf",
        "division": "IT Security",
        "target_duration_seconds": 180
    }
    response = client.post("/api/v1/pipeline/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["total_scenes"] == 5
    assert data["total_duration_seconds"] == 180
    assert data["sme_approval_required"] is True
    # Verify all scenes have citations
    for scene in data["scenes"]:
        assert scene["citation"].startswith("[SOP_Keamanan_Data.pdf")

def test_tutor_ask():
    payload = {"question": "Berapa lama batas waktu eskalasi?"}
    response = client.post("/api/v1/tutor/ask", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "SOP" in data["answer"]
    assert "Hal" in data["citation"]

