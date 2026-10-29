package handler

import (
	"encoding/json"
	"net/http"
)

// RegisterRoutes configures all HTTP routes for the API service.
func RegisterRoutes() http.Handler {
	mux := http.NewServeMux()

	// Health check endpoints
	mux.HandleFunc("GET /health", HealthHandler)
	mux.HandleFunc("GET /api/v1/health", HealthHandler)

	// Sample courses endpoint
	mux.HandleFunc("GET /api/v1/courses", func(w http.ResponseWriter, r *http.Request) {
		courses := []map[string]interface{}{
			{
				"id":          "crs-001",
				"title":       "SOP Tanggap Insiden Keamanan Siber",
				"description": "Panduan langkah cepat isolasi dan eskalasi insiden keamanan sesuai SOP v2.",
				"duration":    180,
				"scenesCount": 5,
				"status":      "published",
			},
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_ = json.NewEncoder(w).Encode(courses)
	})

	// Wrap with basic CORS middleware
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		mux.ServeHTTP(w, r)
	})
}

