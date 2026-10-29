package handler

import (
	"encoding/json"
	"net/http"
	"time"
)

// HealthResponse represents the health check response payload.
type HealthResponse struct {
	Status    string    `json:"status"`
	Service   string    `json:"service"`
	Version   string    `json:"version"`
	Layer     string    `json:"layer"`
	Timestamp time.Time `json:"timestamp"`
}

// HealthHandler returns system health status and metadata.
func HealthHandler(w http.ResponseWriter, r *http.Request) {
	resp := HealthResponse{
		Status:    "healthy",
		Service:   "ai-lmc-api",
		Version:   "0.1.0",
		Layer:     "Layer 2 - LMS Core & Gateway",
		Timestamp: time.Now().UTC(),
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(resp)
}

