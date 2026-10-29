from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_gpu_worker_health():
    res = client.get("/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "healthy"
    assert data["service"] == "ai-lmc-gpu-worker"
    assert data["zero_data_egress"] is True

def test_gpu_worker_render_scene():
    payload = {
        "scene_id": "scene-01",
        "narration_text": "Prosedur tanggap darurat siber.",
        "target_duration_seconds": 35
    }
    res = client.post("/api/v1/gpu/render-scene", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "completed"
    assert data["output_video_url"].endswith(".mp4")

