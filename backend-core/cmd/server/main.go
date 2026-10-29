package main

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"os"

	"github.com/Boerhan06/neuronworks-ai-lmc/backend-core/internal/handler"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = os.Getenv("API_PORT")
	}
	if port == "" {
		port = "8081"
	}

	routes := handler.RegisterRoutes()

	// Try binding to the configured port, or fallback to next available if occupied
	listener, err := net.Listen("tcp", ":"+port)
	if err != nil {
		log.Printf("Port %s is occupied (%v), trying fallback port 8081...", port, err)
		port = "8081"
		listener, err = net.Listen("tcp", ":"+port)
		if err != nil {
			log.Fatalf("Server startup failed: %v", fmt.Errorf("listen error: %w", err))
		}
	}

	server := &http.Server{
		Handler: routes,
	}

	log.Printf("[Layer 2: LMS Core API] Server listening on http://localhost:%s", port)
	if err := server.Serve(listener); err != nil && err != http.ErrServerClosed {
		log.Fatalf("Server startup failed: %v", fmt.Errorf("serve error: %w", err))
	}
}
