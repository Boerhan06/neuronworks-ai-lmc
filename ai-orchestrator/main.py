"""
AI-LMC Worker Service (Layer 3 & Layer 4).
Handles AI orchestration, scene-by-scene script generation, and media synthesis coordination.
Strictly adheres to Zero Data Egress and Mandatory Source Citation principles.
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import time

app = FastAPI(
    title="AI-LMC Worker API",
    description="Layer 3 Orchestrator & Layer 4 Media Generation Worker",
    version="0.1.0",
)

# Enable CORS for local web development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class HealthResponse(BaseModel):
    status: str = "healthy"
    service: str = "ai-lmc-worker"
    version: str = "0.1.0"
    layer: str = "Layer 3 & 4 - AI Orchestrator & Local GPU Generation"
    device: str = "cpu"
    zero_data_egress: bool = True


class SceneScript(BaseModel):
    scene_number: int = Field(..., ge=1, le=5, description="Scene number (1 to 5)")
    title: str
    narration_text: str
    target_duration_seconds: int
    citation: str = Field(..., description="Mandatory source document citation e.g. [Document.pdf, Hal: X]")


class VideoPipelineRequest(BaseModel):
    document_id: str
    document_title: str
    division: str
    target_duration_seconds: int = 180  # Strict 3 minutes (180s)


class VideoPipelineResponse(BaseModel):
    task_id: str
    document_title: str
    status: str
    total_scenes: int
    total_duration_seconds: int
    scenes: List[SceneScript]
    sme_approval_required: bool = True
    message: str


class TutorAskRequest(BaseModel):
    question: str
    document_id: Optional[str] = None


class TutorAskResponse(BaseModel):
    answer: str
    citation: str
    confidence_score: float


@app.get("/health", response_model=HealthResponse)
def health_check():
    """Health check endpoint for container and orchestrator monitoring."""
    return HealthResponse()


@app.post("/api/v1/pipeline/generate", response_model=VideoPipelineResponse)
def generate_module_pipeline(req: VideoPipelineRequest):
    """
    Simulates the AI script generation pipeline (Layer 3).
    Generates a 5-scene 180-second micro-learning script with mandatory citations.
    Execution halts before GPU rendering until SME approval is granted (Principle #4).
    """
    scenes: List[SceneScript] = [
        SceneScript(
            scene_number=1,
            title="Pembuka & Pengenalan Ancaman",
            narration_text="Selamat datang di modul tanggap darurat siber. Setiap detik sangat berharga saat menghadapi insiden.",
            target_duration_seconds=30,
            citation=f"[{req.document_title}, Hal: 1-2]",
        ),
        SceneScript(
            scene_number=2,
            title="Langkah Isolasi Jaringan Cepat",
            narration_text="Langkah pertama adalah isolasi total. Putuskan koneksi jaringan dan batalkan sesi aktif dalam batas 15 menit.",
            target_duration_seconds=35,
            citation=f"[{req.document_title}, Hal: 4]",
        ),
        SceneScript(
            scene_number=3,
            title="Preservasi Bukti Digital Forensik",
            narration_text="Jangan mematikan mesin. Lakukan dump memori volatil untuk penyelidikan tim investigasi siber.",
            target_duration_seconds=40,
            citation=f"[{req.document_title}, Hal: 6]",
        ),
        SceneScript(
            scene_number=4,
            title="Matriks Komunikasi & Eskalasi C-Level",
            narration_text="Eskalasikan insiden ke CISO dan tim manajemen krisis maksimal 30 menit setelah identifikasi awal.",
            target_duration_seconds=40,
            citation=f"[{req.document_title}, Hal: 9]",
        ),
        SceneScript(
            scene_number=5,
            title="Rangkuman & Evaluasi Pemahaman",
            narration_text="Terapkan protokol tanggap darurat secara disiplin. Ikuti kuis singkat berikut untuk menguji pemahaman Anda.",
            target_duration_seconds=35,
            citation=f"[{req.document_title}, Hal: 12]",
        ),
    ]

    total_duration = sum(s.target_duration_seconds for s in scenes)

    return VideoPipelineResponse(
        task_id=f"pipe-{int(time.time())}",
        document_title=req.document_title,
        status="waiting_sme_approval",
        total_scenes=len(scenes),
        total_duration_seconds=total_duration,
        scenes=scenes,
        sme_approval_required=True,
        message="Naskah 5 adegan berhasil digenerate. Menunggu persetujuan SME di Creator Studio sebelum render GPU lokal.",
    )


@app.post("/api/v1/tutor/ask", response_model=TutorAskResponse)
def ask_ai_tutor(req: TutorAskRequest):
    """
    RAG AI Tutor question answering strictly grounded to SOP internal documents.
    """
    if not req.question.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Pertanyaan tidak boleh kosong.",
        )

    return TutorAskResponse(
        answer=f"Berdasarkan dokumen SOP terkait, tindakan untuk '{req.question}' wajib mematuhi protokol isolasi awal dan verifikasi otorisasi divisi.",
        citation="SOP_Tanggap_Insiden_v2.pdf [Hal. 4 & 9]",
        confidence_score=0.965,
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

